angular.module('AppChat').controller('UserNavController', ['$http', '$log', '$scope', '$window', "$cookies",
    function($http, $log, $scope, $window, $cookies, $mdSidenav) {
        var thisCtrl = this;
        this.contactList = [];

        this.getUserContacts = function(){
            $http({
            method: 'GET',
            url: 'http://127.0.0.1:5000/user/contacts',
            headers: { "Authorization": $cookies.get('uid')}
          }).then(
                function(success_response){
                var contacts = success_response.data.contacts;
                for(contact in contacts){
                    thisCtrl.contactList.push(contacts[contact]);
                    }
                console.log(thisCtrl.contactList);
                }, function(error_response){
                console.log(error_response);}
          )
       };

    this.getUserContacts();
}]);
