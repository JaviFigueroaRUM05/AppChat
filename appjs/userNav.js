angular.module('AppChat').controller('UserNavController', ['$http', '$log', '$scope', '$window', "$cookies",
    function($http, $log, $scope, $window, $cookies, $mdSidenav) {
        var thisCtrl = this;

        this.userNavBarToggled = false;
        this.fullName = "";
        this.username = "";
        this.email='';
        this.phone='';

//       $scope.toggleUserNav = buildToggler('right');

//    this.buildToggler = function(componentId) {
//      return function() {
//        $mdSidenav(componentId).toggle();
//      };



      this.toggleUserNavBar = function(){
            thisCtrl.userNavBarToggled = !thisCtrl.userNavBarToggled;
            console.log(thisCtrl.userNavBarToggled);
          //  groupCtrl.showGroupInfo(group.gName, group.GID)
          };

       this.getUserInfo = function(){
            $http({
            method: 'GET',
            url: 'http://127.0.0.1:5000/user/uid='+ $cookies.get('uid')
          }).then(
                function(success_response){
                var response_data = success_response.data;
                thisCtrl.fullName = response_data.first_name + " " + response_data.last_name;
                thisCtrl.username = response_data.uname;
                thisCtrl.email = response_data.email;
                thisCtrl.phone = response_data.phone;
                }
          )
       };


    this.getUserInfo();
}]);
