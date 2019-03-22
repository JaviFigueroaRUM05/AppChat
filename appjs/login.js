angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope',
    function($http, $log, $scope) {
        var thisCtrl = this;

       this.formSubmit = function(){
        if(this.login()){
                $scope.error='';
                $scope.username='';
                $scope.password='';
                $http('/chat');
            } else{
                $scope.error = 'Incorrect username/password!';
                }
       };

       this.login = function(){
       console.log($scope.username + $scope.password);
       return true;
       }

}]);
