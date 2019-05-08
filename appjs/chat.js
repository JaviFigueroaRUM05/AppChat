angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$cookies',
    function($http, $log, $scope, $cookies) {
        var thisMessageCtrl = this;

        this.messageList = [];
        this.counter  = 2;
        this.newText = "";
        this.reply = "";
        this.isPostModalToggled = false;
        this.activeGroup = "";
        this.activeGroupName="";
        this.activeGroupPhoto= "media/group_pics/succulenticon.jpg";
        this.postInformation = [];
        this.postUserReaction = [];
        this.test = false;

        this.userNavBarToggled = false;
        this.fullName="";
        this.username="";
        this.email="";
        this.phone="";

        // Used to display reply tab and send replies.
        this.OPID=-1;
        this.OPuname="";
        this.OPmessage="";
        this.isReplyTabToggled=false;



        this.updateReplyTab = function(OPID,OPuname, OPmessage){
            thisMessageCtrl.isReplyTabToggled=true;
            thisMessageCtrl.OPID=OPID;
            thisMessageCtrl.OPuname=OPuname;
            thisMessageCtrl.OPmessage=OPmessage;
            console.log("clicked reply");
        };

        this.closeReplyTab = function(){
            thisMessageCtrl.isReplyTabToggled=false;
            thisMessageCtrl.OPID=-1;
            thisMessageCtrl.OPuname="";
            thisMessageCtrl.OPmessage="";
        };

        this.isReply = function(op){
          if(op){
            return true;
          }
        };

        this.showTest = function(pic){
          thisMessageCtrl.test = !thisMessageCtrl.test;
        };
        this.showPic = function(pic){
          console.log(pic);
        };

        this.lookUpOriginalPost = function(op){
          for(m in thisMessageCtrl.messageList){
            var post = thisMessageCtrl.messageList[m];
            if(post.postid == op) {
              return  ""+ post.uname + " : " + post.message +"";
            }
          }
        };

        this.togglePostModal = function(postid){
          if(thisMessageCtrl.isPostModalToggled == false){
            thisMessageCtrl.isPostModalToggled = !thisMessageCtrl.isPostModalToggled;
            thisMessageCtrl.createPostModal(postid);
          }
          else {
            thisMessageCtrl.isPostModalToggled = !thisMessageCtrl.isPostModalToggled;
          }
        };

        this.createPostModal = function(postid){
          $http({
            method: 'GET',
            url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + postid
          }).then(function(response){
            thisMessageCtrl.postInformation.length = 0;
            thisMessageCtrl.postUserReaction.length = 0;
            thisMessageCtrl.postInformation.push(response.data.Post);
            var postReactions = response.data.Reactions_Users;
            for(user in postReactions){
              thisMessageCtrl.postUserReaction.push(postReactions[user]);
            }
          });
        };

        this.loadMessages = function(){
            // Get the messages from the server through the rest api
            thisMessageCtrl.messageList.push({"id": 1, "text": "Hola Mi Amigo", "author" : "Bob",
            "like" : 4, "nolike" : 1});
            thisMessageCtrl.messageList.push({"id": 2, "text": "Hello World", "author": "Joe",
                "like" : 11, "nolike" : 12});

            $log.error("Message Loaded: ", JSON.stringify(thisMessageCtrl.messageList));
        };

        this.showPostsInGroup = function(gid, gname, gphoto){
          thisMessageCtrl.activeGroup = gid;
          thisMessageCtrl.activeGroupName = gname;

          console.log(thisMessageCtrl.activeGroup)
          console.log(thisMessageCtrl.activeGroupPhoto)

          if(gid >=0){ // Added this if because when I delete a chat, I pass this method a -1 as gid. -Brian
              $http({
                method: 'GET',
                url: 'http://127.0.0.1:5000/groups/' + gid + '/posts'
              }).then(function(response){
                thisMessageCtrl.messageList.length = 0
                var posts = response.data.Posts
                for (item in posts){
                  thisMessageCtrl.messageList.push(posts[item])
                }
              });
          }
        };

        this.postMsg = function(media){
            var pic="";
            console.log(media);
            if (media){
                pic = "media/group_pics/" + media.name;
            }
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            var msg = thisMessageCtrl.newText;
            // Need to figure out who I am
            var author = thisMessageCtrl.username;
            var nextId = thisMessageCtrl.counter++;
            thisMessageCtrl.messageList.push({"message" : msg, "uname" : author, "pdate":  dateTime, "media": pic, "like" : 2, "dislike" : 3});
            thisMessageCtrl.newText = "";
        };

	this.isLiked = function(message) {
	    $http({
                method: 'GET',
                url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/reaction',
	        headers: {'Authorization': $cookies.get('uid')}  
            }).then((response) => {
	        if(response.data.Reaction == 'L') { 
		    document.getElementById("like_btn"+message.postid).className = "btn btn-info mr-1 ml-2";
		} else {
		    document.getElementById("like_btn"+message.postid).className = "btn btn-success mr-1 ml-2";
		}
	    });
	};

	this.isDisliked = function(message) {
	    $http({
                method: 'GET',
                url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/reaction',
	        headers: {'Authorization': $cookies.get('uid')}  
            }).then((response) => {
	        if(response.data.Reaction == 'D') { 
		    document.getElementById("dislike_btn"+message.postid).className = "btn btn-info mr-2 ml-2";
		} else {
		    document.getElementById("dislike_btn"+message.postid).className = "btn btn-success mr-2 ml-2";
		}
	    });
	};

	this.pressLike = function(message) {
	    $http({
                method: 'GET',
                url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/reaction',
	        headers: {'Authorization': $cookies.get('uid')}  
            }).then(function(response){

		var today = new Date();
            	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            	var dateTime = date+' '+time;

  	        if(response.data.Reaction == "none") { 
	            $http({
                        method: 'POST',
                	url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/post-reaction',
	        	headers: {'Authorization': $cookies.get('uid')},  
			data: JSON.stringify({'rDate': dateTime, 'rType': 'like'})
            	    }).then((responce) => {
			console.log(responce.data);
		        message.likes += 1;
			document.getElementById("like_btn"+message.postid).className = "btn btn-info mr-1 ml-2";
		    });
		}
	        else if(response.data.Reaction == "D") { 
	            $http({
                        method: 'PUT',
                	url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/update-reaction',
	        	headers: {'Authorization': $cookies.get('uid')},  
			data: JSON.stringify({'rDate': dateTime, 'rType': 'like'})
            	    }).then((responce) => {
			console.log(responce.data);
		        message.likes += 1;
			message.dislikes -= 1;
			document.getElementById("like_btn"+message.postid).className = "btn btn-info mr-1 ml-2";
		        document.getElementById("dislike_btn"+message.postid).className = "btn btn-success mr-2 ml-2";
});
		}
	        else if(response.data.Reaction == "L") { 
		    $http({
                        method: 'DELETE',
                	url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/delete-reaction',
	        	headers: {'Authorization': $cookies.get('uid')}  
            	    }).then((responce) => {
			console.log(responce.data);
		        message.likes -= 1;
		        document.getElementById("like_btn"+message.postid).className = "btn btn-success mr-1 ml-2";
 		    });
	        }
            });
	};

	this.pressDislike = function(message) {
	    $http({
                method: 'GET',
                url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/reaction',
	        headers: {'Authorization': $cookies.get('uid')}  
            }).then(function(response){
		
		var today = new Date();
            	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            	var dateTime = date+' '+time;

	        if(response.data.Reaction == "none") { 
		    $http({
                        method: 'POST',
                	url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/post-reaction',
	        	headers: {'Authorization': $cookies.get('uid')},  
			data: JSON.stringify({'rDate': dateTime, 'rType': 'dislike'})
            	    }).then((responce) => {
			console.log(responce.data);
		        message.dislikes += 1;
		        document.getElementById("dislike_btn"+message.postid).className = "btn btn-info mr-2 ml-2";
		    });
	        }
	        else if(response.data.Reaction == "L") { 
		    $http({
                        method: 'PUT',
                	url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/update-reaction',
	        	headers: {'Authorization': $cookies.get('uid')},  
			data: JSON.stringify({'rDate': dateTime, 'rType': 'dislike'})
            	    }).then((responce) => {
			console.log(responce.data);
		        message.dislikes += 1;
			message.likes -= 1;
		        document.getElementById("like_btn"+message.postid).className = "btn btn-success mr-1 ml-2";
		        document.getElementById("dislike_btn"+message.postid).className = "btn btn-info mr-2 ml-2";
		    }); 
	        }
	        else if(response.data.Reaction == "D") { 
		    $http({
                        method: 'DELETE',
                	url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.activeGroup + '/posts/' + message.postid + '/delete-reaction',
	        	headers: {'Authorization': $cookies.get('uid')}  
            	    }).then((responce) => {
			console.log(responce.data);
		        message.dislikes -= 1;
		        document.getElementById("dislike_btn"+message.postid).className = "btn btn-success mr-2 ml-2";
                    });
	        }
            });
	};
///-------------------------------- User Nav Bar -----------------------
        this.getUserInfo = function(){
            $http({
            method: 'GET',
            url: 'http://127.0.0.1:5000/user/uid='+ $cookies.get('uid')
          }).then(
                function(success_response){
                    var response_data = success_response.data;
                    console.log(response_data);
                    thisMessageCtrl.fullName = response_data.first_name + " " + response_data.last_name;
                    thisMessageCtrl.username = response_data.uname;
                    thisMessageCtrl.email = response_data.email;
                    thisMessageCtrl.phone = response_data.phone;
                }, function(error_response){
                  console.error(error_response);
                }
          )
       };

       this.toggleUserNavBar = function(){
            thisMessageCtrl.userNavBarToggled = !thisMessageCtrl.userNavBarToggled;
            console.log(thisMessageCtrl.userNavBarToggled);
          //  groupCtrl.showGroupInfo(group.gName, group.GID)
          };

       this.getUserInfo();

}]);
