// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: false,
        templateUrl: 'templates/menu.html'
    })
	.state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
				controller: 'LoginCtrl'
            }
        }
    })
    .state('app.main', {
        url: '/main',
        views: {
            'menuContent': {
                templateUrl: 'templates/main.html',
				controller: 'AppCtrl'
            }
        }
    })
    
    .state('app.video', {
        url: '/video',
		cache: false,
        abstract: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/video.html',
				controller: 'VidCtrl'
            }
        }
    })
    
    .state('app.watchlater', {
        url: '/watchlater',
		cache: false,
        abstract: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/watchlater.html',
				controller: 'WLtrCtrl'
            }
        }
    })
    
    .state('app.searchresults', {
        url: '/searchresults',
		cache: false,
        abstract: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/searchresults.html',
				controller: 'SearchResCtrl'
            }
        }
    })

    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');
});
