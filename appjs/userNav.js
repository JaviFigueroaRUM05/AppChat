angular.module('AppChat').controller('UserNavController', ['$http', '$log', '$scope', '$window', "$cookies",
    function($http, $log, $scope, $window, $cookies) {
        var thisCtrl = this;

        this.isNewContactModalToggled = false;
        this.isUserModalToggled = false;
        this.isDeleteUserModalToggled = false;
        this.contactSuccessfullyAdded = false;
        this.contactSuccessfullyDeleted = false;
        this.contactNotFoundError = false;
        this.alreadyContactWarning = false;
        this.selected_u_email="";
        this.selected_u_fname="";
        this.selected_u_lname="";
        this.selected_u_phone="";
        this.selected_u_uname="";
        this.selected_u_uid="";

        this.contactList = [];

        this.createUserModal = function(email, fname, lname, phone, uname, uid){
          thisCtrl.selected_u_email = email;
          thisCtrl.selected_u_lname = lname;
          thisCtrl.selected_u_fname = fname;
          thisCtrl.selected_u_phone = phone;
          thisCtrl.selected_u_uname = uname;
          thisCtrl.selected_u_uid = uid;
        };

      this.showUserModalInfo = function(email, fname, lname, phone, uname, uid){
        if(thisCtrl.isUserModalToggled == false){
          console.log(thisCtrl.isUserModalToggled);
          thisCtrl.isUserModalToggled = !thisCtrl.isUserModalToggled;
          thisCtrl.createUserModal(email, fname, lname, phone, uname, uid);
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
            thisCtrl.contactList.length = 0;
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


        this.addContact = function(contact_first_name, contact_last_name, phone_email){
            console.log(phone_email);
            console.log(contact_first_name);
            console.log(contact_last_name);
            if(isNaN(phone_email)){ thisCtrl.addContactByEmail(contact_first_name, contact_last_name, phone_email); }
            else{ thisCtrl.addContactByPhone(contact_first_name, contact_last_name, phone_email); }
        };

        this.deleteContact = function(cid){
            console.log("Test for deleting user: " + cid);

            $http({
            method: 'DELETE',
            url: 'http://127.0.0.1:5000/user/delete-contact/' + cid,
            headers: { "Authorization": $cookies.get('uid')},
             }).then(
                function(success_response){
                     if(success_response.data.hasOwnProperty('Error')){
                        errorMessage = success_response.data.Error;
                        console.log(errorMessage);
                      }
                    else { console.log(success_response);
                            thisCtrl.contactSuccessfullyDeleted = true;
                            thisCtrl.getUserContacts();} },
                function(error_response){ console.log(error_response);}
          )
        };


       // new contact.
        this.addContactByPhone = function(contact_first_name, contact_last_name, contact_phone_email){
            $http({
            method: 'POST',
            url: 'http://127.0.0.1:5000/user/add-contact',
            headers: { "Authorization": $cookies.get('uid')},
            data: JSON.stringify({  "first_name": contact_first_name,
                                    "last_name": contact_last_name,
                                    "phone": contact_phone_email })
          }).then(
                function(success_response){
                     if(success_response.data.hasOwnProperty('Error')){
                        errorMessage = success_response.data.Error;
                        console.log(errorMessage);
                        if(errorMessage.includes("null value in column \"cid\" violates not-null constraint")){
                            thisCtrl.contactNotFoundError = true;
                        }
                        else if(errorMessage.includes("duplicate key value violates unique constraint")){
                            thisCtrl.alreadyContactWarning = true;
                        }
                      }
                    else { console.log(success_response);
                            thisCtrl.contactSuccessfullyAdded = true;
                            thisCtrl.getUserContacts();} },
                function(error_response){ console.log(error_response);}
          )
       };


        this.addContactByEmail = function(contact_first_name, contact_last_name, contact_phone_email){
            $http({
            method: 'POST',
            url: 'http://127.0.0.1:5000/user/add-contact',
            headers: { "Authorization": $cookies.get('uid')},
            data: JSON.stringify({  "first_name": contact_first_name,
                                    "last_name": contact_last_name,
                                    "email": contact_phone_email })
          }).then(
              function(success_response){
                     if(success_response.data.hasOwnProperty('Error')){
                        errorMessage = success_response.data.Error;
                        console.log(errorMessage);
                        if(errorMessage.includes("null value in column \"cid\" violates not-null constraint")){
                            thisCtrl.contactNotFoundError = true;
                        }
                        else if(errorMessage.includes("duplicate key value violates unique constraint")){
                            thisCtrl.alreadyContactWarning = true;
                        }
                      }
                    else { console.log(success_response);
                            thisCtrl.contactSuccessfullyAdded = true;
                            thisCtrl.getUserContacts();} },
                function(error_response){ console.log(error_response);}
          )
       };


//    this.getUserInfo();
    this.getUserContacts();
}]);
