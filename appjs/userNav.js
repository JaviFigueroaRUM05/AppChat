angular.module('AppChat').controller('UserNavController', ['$http', '$log', '$scope', '$window', "$cookies",
    function($http, $log, $scope, $window, $cookies) {
        var thisCtrl = this;

        this.isNewContactModalToggled = false;
        this.isUserModalToggled = false;
        this.selected_u_email="";
        this.selected_u_fname="";
        this.selected_u_lname="";
        this.selected_u_phone="";
        this.selected_u_uname="";

        this.contactList = [];

        this.createUserModal = function(email, fname, lname, phone, uname){
          thisCtrl.selected_u_email = email;
          thisCtrl.selected_u_lname = lname;
          thisCtrl.selected_u_fname = fname;
          thisCtrl.selected_u_phone = phone;
          thisCtrl.selected_u_uname = uname;
        };

      this.showUserModalInfo = function(email, fname, lname, phone, uname){
        if(thisCtrl.isUserModalToggled == false){
          console.log(thisCtrl.isUserModalToggled);
          thisCtrl.isUserModalToggled = !thisCtrl.isUserModalToggled;
          thisCtrl.createUserModal(email, fname, lname, phone, uname);
        } else {
            thisCtrl.isUserModalToggled = !thisCtrl.isUserModalToggled;
        }
      };
//       $scope.toggleUserNav = buildToggler('right');

//    this.buildToggler = function(componentId) {
//      return function() {
//        $mdSidenav(componentId).toggle();
//      };



     /* this.toggleUserNavBar = function(){
            thisCtrl.userNavBarToggled = !thisCtrl.userNavBarToggled;
            console.log(thisCtrl.userNavBarToggled);
          //  groupCtrl.showGroupInfo(group.gName, group.GID)
          };*/

//       this.getUserInfo = function(){
//            $http({
//            method: 'GET',
//            url: 'http://127.0.0.1:5000/user/uid='+ $cookies.get('uid')
//          }).then(
//                function(success_response){
//                var response_data = success_response.data;
//                thisCtrl.fullName = response_data.first_name + " " + response_data.last_name;
//                thisCtrl.username = response_data.uname;
//                thisCtrl.email = response_data.email;
//                thisCtrl.phone = response_data.phone;
//                }
//          )
//       };

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

       //TODO: modify backend and coordinate this method with html to properly add
       // new contact.
        this.addContactByPhone = function(){
            $http({
            method: 'GET',
            url: 'http://127.0.0.1:5000/user/contacts',
            headers: { "Authorization": $cookies.get('uid')},
            data: JSON.stringify({  "first_name": $scope.contact_first_name,
                                    "last_name": $scope.contact_last_name,
                                    "phone": $scope.contact_phone_email })
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





//    this.getUserInfo();
    this.getUserContacts();
}]);
