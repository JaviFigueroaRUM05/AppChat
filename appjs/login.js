angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$window', "$cookies",
    function($http, $log, $scope, $window, $cookies) {
        var thisCtrl = this;
        this.Error = "";
        this.uid= null;

       this.login = function(){
        $http({
          method: 'POST',
          url: 'http://127.0.0.1:5000/user/login',
          data: JSON.stringify({ "email": $scope.username,
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
                    $window.location.href = '/AppChat/index.html#!/chat';
        }}).catch(angular.noop);
       };
}]);
