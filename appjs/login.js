angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$window', '$cookies', '$location',
    function($http, $log, $scope, $window, $cookies, $location) {
        var thisCtrl = this;
        this.Error = "";
        this.usernameExistsError = false;
        this.phoneExistsError = false;
        this.badPhoneError = false;
        this.emailExistsError = false;
        this.passwordsDontMatchError = false;
        this.uid= null;
        this.registerPageVisible = false;

       this.login = function(){
        $http({
          method: 'POST',
          url: 'http://127.0.0.1:5000/user/login',
          data: JSON.stringify({ "email": $scope.email,
                                 "password": $scope.password})

        }).then( // On success.
            function(success_response){
                thisCtrl.uid = success_response.data.uid;

        }, function (error_response){ //On Error
                console.log(error_response);
                if (error_response.data.hasOwnProperty('Error')){
                    thisCtrl.Error = error_response.data.Error;
                    console.log(thisCtrl.Error);}
                else{
                    console.log(error_response);}
        }).then (
            function(){
                if(thisCtrl.uid != null){
                    $scope.error='';
                    $scope.username='';
                    $scope.password='';
                    $cookies.put('uid', thisCtrl.uid);
                    //console.log($cookies.get('uid'));
                    $location.path('/chat');
        }}).catch(angular.noop);
       };

        this.goToRegisterPage = function(){
            thisCtrl.registerPageVisible = !thisCtrl.registerPageVisible;
        }


        this.verifyRegistration = function(){
            thisCtrl.badPhoneError = isNaN($scope.phone);
            thisCtrl.passwordsDontMatchError = ($scope.password !== $scope.verify_password);
            if(!thisCtrl.badPhoneError && !thisCtrl.passwordsDontMatchError){ thisCtrl.register(); }
        }

        this.register = function(){
        $http({
          method: 'POST',
          url: 'http://127.0.0.1:5000/user/register',
          data: JSON.stringify({ "email": $scope.email,
                                 "password": $scope.password,
                                 "first_name": $scope.first_name,
                                 "last_name": $scope.last_name,
                                 "uname": $scope.uname,
                                 "phone": $scope.phone })

        }).then( // On success.
            function(success_response){
                console.log(success_response);
                if(success_response.data.hasOwnProperty('Error')){

                    errorMessage = success_response.data.Error;

                    if(errorMessage.includes("users_email_key")){
                        thisCtrl.emailExistsError = true;
                    }
                    else if(errorMessage.includes("users_uname_key")){
                        thisCtrl.usernameExistsError = true;
                    }
                    else if(errorMessage.includes("users_phone_key")){
                        thisCtrl.phoneExistsError = true;
                    }
                }
                else{thisCtrl.uid = success_response.data.uid;}
        }, function (error_response){ //On Error
            //TODO: modify this error to properly toggle messages.

                console.log(error_response);
                if (error_response.data.hasOwnProperty('Error')){
                    thisCtrl.Error = error_response.data.Error;
                    console.log(thisCtrl.Error);}
                else{
                    console.log(error_response);}
        }).then (
            function(){
                if(thisCtrl.uid != null){
                    $scope.error='';
                    $scope.username='';
                    $scope.password='';
                    $scope.first_name = '';
                    $scope.last_name = '';
                    $scope.phone = '';
                    $scope.email = '';
                    $cookies.put('uid', thisCtrl.uid);
                    //console.log($cookies.get('uid'));
                    $location.path('/chat');
        }}).catch(angular.noop);
       };


       this.logout = function(){
      //   $window.alert("You are about to logout");
         $location.path('/login');
         $cookies.remove('uid');

       };
}]);
