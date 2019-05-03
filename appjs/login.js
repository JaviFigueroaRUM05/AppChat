angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$window', '$cookies', '$location',
    function($http, $log, $scope, $window, $cookies, $location) {
        var thisCtrl = this;
        this.Error = "";
        this.usernameExistsError = false;
        this.phoneExistsError = false;
        this.emailExistsError = false;
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

        this.register = function(){
        $http({
          method: 'POST',
          url: 'http://127.0.0.1:5000/user/login',
          data: JSON.stringify({ "email": $scope.email,
                                 "password": $scope.password,
                                 "first_name": $scope.first_name,
                                 "last_name": $scope.last_name,
                                 "uname": $scope.uname,
                                 "phone": $scope.phone })

        }).then( // On success.
            function(success_response){
                thisCtrl.uid = success_response.data.uid;

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
