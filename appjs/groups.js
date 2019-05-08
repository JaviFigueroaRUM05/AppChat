angular.module('AppChat').controller('GroupController', ['$http', '$log', '$scope', '$cookies',
    function($http, $log, $scope, $cookies) {
        var thisGroupCtrl = this;

        this.groupList = [];
        this.groupUsersList = [];
        this.contactsNotInGroupList = [];
        this.counter  = 2;
        this.groupName= " ... ";
        this.isBarToggled = false;
        this.isUserModalToggled = false;
        this.isNewGroupModalToggled = false;
        this.isCreateGroupCompleted = false;
        this.isDeleteGroupModalToggled = false;
        this.isDeleteGroupCompleted = false;
        this.isAddParticipantModalToggled = false;
        this.isRemoveParticipantModalToggled = false;
        this.currentGid = 0;
        this.isActiveUserAdmin = false;

        this.selected_u_email="";
        this.selected_u_fname="";
        this.selected_u_lname="";
        this.selected_u_phone="";
        this.selected_u_uname="";
        this.selected_u_uid="";
        this.selected_u_isadmin = "";

        this.loadMessages = function(){
            // Get the messages from the server through the rest api
            thisGroupCtrl.groupList.push({"id": 1, "gName" : "The Cuchifrits", "gPhoto" : "media/group_pics/corgi.jpg"});
            thisGroupCtrl.groupList.push({"id": 2, "gName": "Hello World", "gPhoto": "media/profile_pics/succulents_profile.png"});

            $log.error("Message Loaded: ", JSON.stringify(thisGroupCtrl.groupList));
        };

        // I think this isn't used if my sidebar toggle modification is implemented properly. -Brian
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

          this.createUserModal = function(email, fname, lname, phone, uname, uid, isadmin){
            thisGroupCtrl.selected_u_email = email;
            thisGroupCtrl.selected_u_lname = lname;
            thisGroupCtrl.selected_u_fname = fname;
            thisGroupCtrl.selected_u_phone = phone;
            thisGroupCtrl.selected_u_uname = uname;
            thisGroupCtrl.selected_u_uid = uid;
            thisGroupCtrl.selected_u_isadmin = isadmin;
          };

        this.showUserModalInfo = function(email, fname, lname, phone, uname, uid, isadmin){
          if(thisGroupCtrl.isUserModalToggled == false){
           // console.log(thisGroupCtrl.isUserModalToggled);
            thisGroupCtrl.isUserModalToggled = !thisGroupCtrl.isUserModalToggled;
            thisGroupCtrl.createUserModal(email, fname, lname, phone, uname, uid, isadmin);
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
              }).then(
                      function(response){
                        var gParticipants = response.data.participants

                        for(user in gParticipants){
                          thisGroupCtrl.groupUsersList.push(gParticipants[user]);

                          if(thisGroupCtrl.groupUsersList
                                        [thisGroupCtrl.groupUsersList.length - 1].uid  == $cookies.get("uid")){
                            thisGroupCtrl.isActiveUserAdmin =
                                                    thisGroupCtrl.groupUsersList
                                                                [thisGroupCtrl.groupUsersList.length - 1].isadmin;
                          }
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
          console.log(group_photo);
          if(group_name){
              if (!group_photo){ group_photo_name = "succulenticon.jpg"; }
              else { group_photo_name = group_photo;}

              $http({
                  method: 'POST',
                  url: 'http://127.0.0.1:5000/groups/create',
                  data: JSON.stringify({ "gname": group_name,
                                        "gphoto": "media/group_pics/" + group_photo_name }),
                    }).then(
                        function(response){

                            if(response.data.hasOwnProperty('Error')){ console.log(response.data.Error); }
                            else{
                                thisGroupCtrl.addSelfAsAdmin(response.data.group.gid);
                                console.log(response.data.group.gid);
                                thisGroupCtrl.isCreateGroupCompleted = true;
                                thisGroupCtrl.isNewGroupModalToggled = false;
                                }
                        })
        }};


        this.addSelfAsAdmin = function(gid){
          $http({
              method: 'POST',
              url: 'http://127.0.0.1:5000/groups/' + gid + '/add-participant',
              data: JSON.stringify({ "uid": $cookies.get('uid'),
                                    "isAdmin": "true" }),
                }).then(
                    function(response){
                        if(response.data.hasOwnProperty('Error')){ console.log(response.data.Error); }
                        else{
                            thisGroupCtrl.getGroupInfo();
                            console.log(response.data);
                            }
                    })
        };

        this.getContactsNotInGroup = function(){
          $http({
              method: 'GET',
              url: 'http://127.0.0.1:5000/user/contacts/not-in-group/'+ thisGroupCtrl.currentGid,
              headers: {'Authorization': $cookies.get('uid')}
                }).then(
                    function(response){
                        if(response.data.hasOwnProperty('Error')){ console.log(response.data.Error); }
                        else{
                            thisGroupCtrl.contactsNotInGroupList.length=0;
                            for(contact in response.data.contacts){
                                thisGroupCtrl.contactsNotInGroupList.push(response.data.contacts[contact]);
                            }
                            console.log(thisGroupCtrl.contactsNotInGroupList);
                            }
                    })
        };

        this.addParticipant = function(uid){
         console.log(uid);
         $http({
          method: 'POST',
          url: 'http://127.0.0.1:5000/groups/' + thisGroupCtrl.currentGid + '/add-participant',
          data: JSON.stringify({ "uid": uid,
                                "isAdmin": "false" }),
            }).then(
                function(response){
                    if(response.data.hasOwnProperty('Error')){ console.log(response.data.Error); }
                    else{
                        thisGroupCtrl.showGroupInfo(thisGroupCtrl.groupName, thisGroupCtrl.currentGid);
                        console.log(response.data);
                        }
                })
        };

        this.removeParticipant = function(uid){
            console.log(uid);
            console.log(thisGroupCtrl.currentGid);
            $http({
          method: 'DELETE',
          url: 'http://127.0.0.1:5000/groups/' + thisGroupCtrl.currentGid + '/delete-participant/' + uid,
            }).then(
                function(response){
                    if(response.data.hasOwnProperty('Error')){ console.log(response.data.Error); }
                    else{
                        if(uid == $cookies.get('uid')){
                            thisGroupCtrl.isBarToggled=false;
                            thisGroupCtrl.currentGid = 0;
                            thisGroupCtrl.getGroupInfo();
                        }
                        else{
                            thisGroupCtrl.showGroupInfo(thisGroupCtrl.groupName, thisGroupCtrl.currentGid);
                            console.log(response.data);
                            }
                        }
                })
        };


        this.deleteGroup = function(){
            console.log(thisGroupCtrl.currentGid);
            $http({
              method: 'DELETE',
              url: 'http://127.0.0.1:5000/groups/' + thisGroupCtrl.currentGid + '/delete-group',
                 }).then(
                    function(response){
                         if(response.data.hasOwnProperty('Error')){ console.log(response.data.Error); }
                        else{
                        thisGroupCtrl.currentGid = 0;
                        thisGroupCtrl.isDeleteGroupCompleted = true;
                        thisGroupCtrl.isBarToggled = false;
                        thisGroupCtrl.getGroupInfo();

                        console.log(response.data);
                        }
                    })
        };



        this.getGroupInfo = function(){ // Surrounded the http call within the getGroupInfo method. - Brian
            thisGroupCtrl.groupList.length = 0;
          console.log("Getting group info");
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
            })};

        this.see_console = function(){
          console.log(thisGroupCtrl.groupList);
        };

        this.getGroupInfo();
}]);
