angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope',
    function($http, $log, $scope) {
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

        this.isReply = function(op){
          if(op){
            return true;
          }
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
        };

        this.postMsg = function(){
            var msg = thisMessageCtrl.newText;
            // Need to figure out who I am
            var author = "Me";
            var nextId = thisMessageCtrl.counter++;
            thisMessageCtrl.messageList.unshift({"postid": nextId, "message" : msg, "uname" : author, "like" : 0, "dislike" : 0});
            thisMessageCtrl.newText = "";
        };

        this.group = 2;

        $http({
          method: 'GET',
          url: 'http://127.0.0.1:5000/groups/' + thisMessageCtrl.group + '/posts'
        }).then(function(response){
          var posts = response.data.Posts
          for (item in posts){
            thisMessageCtrl.messageList.push(posts[item])
          }
        });


}]);
