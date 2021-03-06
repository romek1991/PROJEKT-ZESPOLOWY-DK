define(['./../module'], function (controllers) {
    'use strict';
    controllers.controller('ProfileEditController', ['ProfileService', 'AuthenticationService',
        'UserService', '$cookies', '$http', '$state', 'Upload', "$rootScope", 'md5',
        function ProfileCtrl(ProfileService, AuthenticationService, UserService, $cookies, $http, $state, Upload, $rootScope, md5) {
            console.log('editProfile controller');
            
            var vm = this;



            var token = $cookies.get('token');
            vm.token = token;
            var user = AuthenticationService.getUser();

            vm.login = user.login;
            vm.email = user.email;
            vm.firstName = user.firstName;
            vm.lastName = user.lastName;
            vm.avatarName = user.avatarName;

            vm.updateProfile = function() {
				if (vm.firstName && vm.lastName)
                var hash = (!vm.password || vm.password=="") ? null : md5.createHash(vm.password);
                ProfileService.updateProfile(user.id, vm.login, vm.email, vm.firstName, vm.lastName, hash, token).
                success(function(){
                        user.email = vm.email;
                        user.firstName = vm.firstName;
                        user.lastName = vm.lastName;
                   AuthenticationService.setUser(user);

                    var cookieUser = JSON.parse($cookies.get('user'));

                    cookieUser.firstName = vm.firstName;
                    cookieUser.lastName = vm.lastName;

                    $cookies.put('user', JSON.stringify(cookieUser));
                    $rootScope.$$childTail.$$childTail.mCtrl.getUser();

				   $state.go('app.profile', {
						userDataUpdateSuccess: true
					});
                }).error(function(data, status) {
					vm.userDataUpdateFailed = true;
          alert(data);
				});

                //$state.go($state.current, {}, {reload: true});
            };
            
            vm.resetAvatar = function() {
              ProfileService.resetAvatar(vm.login, token);
              $state.go('app.profile');
            };




            vm.uploadAvatar = function() {
                console.log("test:");
                console.log(vm.file);
                console.log(vm.tripIdent);
                Upload.upload({
                    url: 'http://localhost:3000/photo/avatar',
                    data: {username: vm.login, token: vm.token, avatar: vm.file},
                    method: 'POST'
                }).then(function (resp) {
                    console.log('Success ');
                    var currentUser = JSON.parse($cookies.get('user'));
                    currentUser.avatarName = currentUser.login + "?" + new Date().getTime();
                    vm.avatarName = currentUser.avatarName;
                    $cookies.put('user', JSON.stringify(currentUser));
                    console.log(currentUser);
                    $state.go('app.profile', {
                        userDataUpdateSuccess: true
                    });
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    vm.userDataUpdateFailed = true;
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ');
                });


            }

        }
    ]);
});