/**
 * Created by Pawel on 2015-10-28.
 */

define(['./../module'], function (controllers) {
    'use strict';

    controllers.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService, $cookies) {
        return {

            request: function (config) {
                //alert($cookies.get('token'));
                config.headers = config.headers || {};
                if ($cookies.get('token')) {

                    config.headers['x-access-token'] = $cookies.get('token');
                }
                return config;
            },

            requestError: function(rejection) {
                return $q.reject(rejection);
            },

        };
    });


    controllers.factory('AuthenticationService', function() {
        var auth = {
            isLogged: false
        }

        function set(flag) {
            auth.isLogged = flag;
        }
        function get() {
            return auth.isLogged;
        }

        return {
            setIsLogged: set,
            getIsLogged: get
        }

    });


    controllers.factory('UserService', function($http) {
        var baseUrl = "http://localhost:3000";
        return {

            logIn: function(username, password) {
                return $http.post(baseUrl + '/login', {"login": username, "password": password});
            },

			register: function(login, password, email, firstName, lastName ) {
                return $http.post(baseUrl + '/signup', {
					
					//login, password, email,name ,surname
					"login": login,	
					"password": password,
					"email":email,
					"firstName":firstName,
					"lastName":lastName						
					
					});
            },
			
            logOut: function() {

            },

            getUsers: function(){
                return $http.get(baseUrl + '/users');
            }

        }
    });


    controllers.controller('LoginController', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
        '$cookies',
        function LoginCtrl($scope, $location, $window, UserService, AuthenticationService, $cookies){

        var vm = this;

        $scope.$watch(function () { return AuthenticationService.getIsLogged(); },
            function (value) {
                vm.loggedInFlag = value;
            }
        );

        vm.credsOk = true;
        vm.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {

                UserService.logIn(username, password).success(function(data) {
                    if(data.success){
                        AuthenticationService.setIsLogged(true);
                        $cookies.put('token', data.token);
                        $location.path("/");
                    }
                    else{
                        vm.credsOk = false;
                    }
                    console.log(data);
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        };


        vm.logout = function logout() {
            $scope.credsOk = true;
            if (AuthenticationService.getIsLogged()) {
                AuthenticationService.setIsLogged(false);
                //alert("Logging out");
                $cookies.remove('token');
                $location.path("/");
            }
        };


        vm.getUsers = function logout() {
            UserService.getUsers().success(function(data){
                console.log(data);

        });

        }
    }]);
});