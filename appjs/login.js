angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$window',
    function($http, $log, $scope, $window) {
        var thisCtrl = this;
        this.Error = "";
        this.uid= null;





//TODO Look into catch, why if we get the error it wont go through the thens.

       this.login = function(){
        $http({
          method: 'POST',
          url: 'http://127.0.0.1:5000/user/login',
          data: JSON.stringify({ "email": $scope.username,
                                 "password": $scope.password})
        }).then(
            function(response){
                var response_json = response.data
                if (response_json.hasOwnProperty('Error')){
                    thisCtrl.Error = response_json.Error;}

                else{thisCtrl.uid = response_json.uid;}
        }).then (
            function(){
                if(thisCtrl.uid != null){
                    $scope.error='';
                    $scope.username='';
                    $scope.password='';
                    $window.location.href = '/AppChat/index.html#!/chat';
                } else{$scope.error = 'Incorrect username/password!';
        }}).catch(angular.noop);
       }

}]);
