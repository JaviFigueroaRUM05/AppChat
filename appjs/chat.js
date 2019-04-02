angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$cookies',
    function($http, $log, $scope, $cookies) {
        var thisMessageCtrl = this;

        this.messageList = [];
        this.counter  = 2;
        this.newText = "";
        this.reply = "";
        this.isToggled = false;
        this.userNavBarToggled = false;

         this.fullName = "";
        this.username = "";
        this.email='';
        this.phone='';

        this.toggleModal = function(){
          thisMessageCtrl.isToggled = !thisMessageCtrl.isToggled;
        };

        this.isReply = function(op){
          if(op){
            return true;
          }
        };


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
                }
          )
       };

         this.toggleUserNavBar = function(){
            thisMessageCtrl.userNavBarToggled = !thisMessageCtrl.userNavBarToggled;
            console.log(thisMessageCtrl.userNavBarToggled);
          //  groupCtrl.showGroupInfo(group.gName, group.GID)
          };

        this.lookUpOriginalPost = function(op){
          for(m in thisMessageCtrl.messageList){
            var post = thisMessageCtrl.messageList[m];
            if(post.postid == op) {
              return  ""+ post.uname + " : " + post.message +"";
            }
          }
        };

        this.loadMessages = function(){
            // Get the messages from the server through the rest api
            thisMessageCtrl.messageList.push({"id": 1, "text": "Hola Mi Amigo", "author" : "Bob",
            "like" : 4, "nolike" : 1});
            thisMessageCtrl.messageList.push({"id": 2, "text": "Hello World", "author": "Joe",
                "like" : 11, "nolike" : 12});

            $log.error("Message Loaded: ", JSON.stringify(thisMessageCtrl.messageList));
        };

        this.showPostsInGroup = function(gid){
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

       this.see_console = function(){
          console.log(thisMessageCtrl.messageList);
        };

        this.see_console();
        this.getUserInfo();

      //  this.loadMessages();
}]);
