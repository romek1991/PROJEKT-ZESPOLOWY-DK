define(['app'], function (app) {
    'use strict';
    return app.config(function($stateProvider) {
        $stateProvider
            .state('index', {
                url:"",
                templateUrl: 'modules/welcome/welcome.html',
                data: {
                    requireLogin: false
                }
            })
            .state('login', {
                url:'/login',
                templateUrl: 'modules/user/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
				params: {
                    successfulSignup: null
                },
                data: {
                    requireLogin: false
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'modules/user/signup.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                data: {
                    requireLogin: false
                }
            })
            .state('app', {
                url:"",
                controllerAs: 'vm',
                data: {
                    requireLogin: true
                }
            })
            .state('app.start', {
                url: '/start',
                templateUrl: '/modules/start/start.html',
                controller: 'StartController',
                controllerAs: 'vm'
            })
            .state('app.profile', {
                url: '/profile/:login',
                templateUrl: 'modules/user/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
				params: {
                    userDataUpdateSuccess: false
                }
            })
            .state('app.editprofile', {
                url: '/editProfile',
                templateUrl: 'modules/user/editProfile.html',
                controller: 'ProfileEditController',
                controllerAs: 'vm'
            })
            .state('app.trip', {
                url: '/trip/:tripId',
                templateUrl: 'modules/trip/trip.html',
                controller: 'TripController',
                controllerAs: 'vm'
            })
            .state('app.addtrip', {
                url: '/addtrip',
                templateUrl: 'modules/trip/addtrip.html',
                controller: 'TripController',
                controllerAs: 'vm'
            })
            .state('app.edittrip', {
                url: '/edittrip/:tripId',
                templateUrl: 'modules/trip/editTrip.html',
                controller: 'TripController',
                controllerAs: 'vm'
            })
            .state('app.error', {

                url: '/error/:message',
                templateUrl: 'modules/error/error.html',
                controller: 'ErrorController',
                controllerAs: 'vm',
                data: {
                    message: "Wystąpił bład"
                }
            })
            .state('app.test', {
                url:"/appTest"
            });
        //stany ktore sa po zalogowaniu tworzymy na zasadzie app.NAZWASTANU - wtedy sa zagniezdzone i wszedzie obowiazuje requireLogin:true ze stanu app(on jest parentem)
    });
});