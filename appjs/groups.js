angular.module('AppChat').controller('GroupController', ['$http', '$log', '$scope',
    function($http, $log, $scope) {
        var thisGroupCtrl = this;

        this.groupList = [];
        this.counter  = 2;
        this.newText = "";

        this.loadMessages = function(){
            // Get the messages from the server through the rest api
            thisGroupCtrl.groupList.push({"id": 1, "gName" : "The Cuchifrits", "gPhoto" : "media/group_pics/corgi.jpg"});
            thisGroupCtrl.groupList.push({"id": 2, "gName": "Hello World", "gPhoto": "media/group_pics/succulenticon.jpg"});

            $log.error("Message Loaded: ", JSON.stringify(thisGroupCtrl.groupList));
        };

        this.postMsg = function(){
            var msg = thisGroupCtrl.newText;
            // Need to figure out who I am
            var author = "Me";
            var nextId = thisGroupCtrl.counter++;
            thisGroupCtrl.groupList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
            thisGroupCtrl.newText = "";
        };

        this.loadMessages();
}]);