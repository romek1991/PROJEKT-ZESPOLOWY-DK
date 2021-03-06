/**
 * Created by Pawel on 2015-10-28.
 */

define(['./../module'], function (controllers) {
    'use strict';

    controllers.controller('RegisterController', ['$location', '$window', 'UserService', 'AuthenticationService',
        '$cookies', '$state', 'md5',
        function LoginCtrl($location, $window, UserService, AuthenticationService, $cookies, $state, md5){
		var vm = this;
		
		vm.register = function(login, password, email, firstName, lastName){
			if(login !== undefined && password !== undefined && email !== undefined && firstName !== undefined && lastName
			!== undefined){
				var hash = md5.createHash(password);
				console.log('hash:' + hash);
				UserService.register(login, hash, email, firstName, lastName).success(function(data){
					$state.go('login', {
						successfulSignup: true
					});
				}).error(function(status, data){
					vm.registrationFailed = true;
					if (data.message.indexOf('User already exists') > -1) {
					  vm.registrationFailedMessage = "Login lub e-mail jest już używany";
					}
					
				});
			}
			
		}
       

    }]);
});