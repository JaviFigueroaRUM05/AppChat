angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope',
    function($http, $log, $scope) {
        var thisMessageCtrl = this;

        this.messageList = [];
        this.counter  = 2;
        this.newText = "";
        this.reply = "";

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
            thisMessageCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
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

      //  this.loadMessages();
}]);
