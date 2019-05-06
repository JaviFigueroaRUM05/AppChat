angular.module('AppChat').controller('GroupController', ['$http', '$log', '$scope', '$cookies',
    function($http, $log, $scope, $cookies) {
        var thisGroupCtrl = this;

        this.groupList = [];
        this.groupUsersList = [];
        this.counter  = 2;
        this.groupName= " ... ";
        this.isBarToggled = false;
        this.isUserModalToggled = false;
        this.isNewGroupModalToggled = false;
        this.groupAlreadyExistsError = false;
        this.currentGid = 0;

        this.selected_u_email="";
        this.selected_u_fname="";
        this.selected_u_lname="";
        this.selected_u_phone="";
        this.selected_u_uname="";

        this.loadMessages = function(){
            // Get the messages from the server through the rest api
            thisGroupCtrl.groupList.push({"id": 1, "gName" : "The Cuchifrits", "gPhoto" : "media/group_pics/corgi.jpg"});
            thisGroupCtrl.groupList.push({"id": 2, "gName": "Hello World", "gPhoto": "media/profile_pics/succulents_profile.png"});

            $log.error("Message Loaded: ", JSON.stringify(thisGroupCtrl.groupList));
        };

        this.toggleBar = function(gname, gid){
            if(thisGroupCtrl.isBarToggled==false){
                thisGroupCtrl.currentGid = gid;
                thisGroupCtrl.isBarToggled = !thisGroupCtrl.isBarToggled;
                thisGroupCtrl.showGroupInfo(gname, gid);
            }
            else {
              if(thisGroupCtrl.currentGid == gid){
                thisGroupCtrl.isBarToggled = !thisGroupCtrl.isBarToggled;
              }
              else{
                thisGroupCtrl.currentGid = gid;
                thisGroupCtrl.showGroupInfo(gname, gid);
              }
          }
          };

          this.createUserModal = function(email, fname, lname, phone, uname){
            thisGroupCtrl.selected_u_email = email;
            thisGroupCtrl.selected_u_lname = lname;
            thisGroupCtrl.selected_u_fname = fname;
            thisGroupCtrl.selected_u_phone = phone;
            thisGroupCtrl.selected_u_uname = uname;
          };

        this.showUserModalInfo = function(email, fname, lname, phone, uname){
          if(thisGroupCtrl.isUserModalToggled == false){
            console.log(thisGroupCtrl.isUserModalToggled);
            thisGroupCtrl.isUserModalToggled = !thisGroupCtrl.isUserModalToggled;
            thisGroupCtrl.createUserModal(email, fname, lname, phone, uname);
          } else {
              thisGroupCtrl.isUserModalToggled = !thisGroupCtrl.isUserModalToggled;
          }
        };

        this.showGroupInfo = function(groupName, gid){
          console.log(groupName)
          thisGroupCtrl.groupName = groupName;
          thisGroupCtrl.groupUsersList.length = 0;
          $http({
            method: 'GET',
            url: 'http://127.0.0.1:5000/groups/'+ gid

          }).then(function(response){
            var gParticipants = response.data.participants
            console.log(gParticipants)
            for(user in gParticipants){
              thisGroupCtrl.groupUsersList.push(gParticipants[user]);
            }
          });

        };

        this.postMsg = function(){
            var msg = thisGroupCtrl.newText;
            // Need to figure out who I am
            var author = "Me";
            var nextId = thisGroupCtrl.counter++;
            thisGroupCtrl.groupList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
            thisGroupCtrl.newText = "";
        };

        this.createGroup = function(group_name, group_photo){

          console.log("create group");

           // TODO: fix the issue of uploading no image that puts {gphoto} in the image field in DB.
          if (group_photo === "{gphoto}"){ group_photo_name = ""; }
          else { group_photo_name = group_photo;}

          $http({
          method: 'POST',
          url: 'http://127.0.0.1:5000/groups/create',
          data: JSON.stringify({ "gname": group_name,
                                  "gphoto": group_photo_name
           }),

        }).then(function(response){ //TODO: add the user who created the group  to the group as the admin.
                    console.log(response.data.group.gid);

          })
        };



        this.getGroupInfo = function(number){
          console.log(number)
        }

        $http({
          method: 'GET',
          url: 'http://127.0.0.1:5000/groups',
      //    data: JSON.stringify({ "uid": 2 }),
          headers: {'Authorization': $cookies.get('uid')}
        }).then(function(groups){
          var response = groups.data
          for(group in response){
            thisGroupCtrl.groupList.push(response[group]);
          }
        });

        this.see_console = function(){
          console.log(thisGroupCtrl.groupList);
        };


}]);
