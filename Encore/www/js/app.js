// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('index',{
      url: '/',
      templateUrl: 'index.html',
      //controller: "Main_Ctrl"
    })
    .state('voter_find_event',{
      url: '/voter_find_event',
      templateUrl: 'templates/voter_find_event.html',
      //controller: "voter_find_event_Ctrl"
    })
    .state('host_create_event',{
      url: '/host_create_event',
      templateUrl: 'templates/host_create_event.html',
      //controller: "host_create_event_Ctrl"
    })
    .state('host_create_poll',{
      url: '/host_create_poll',
      templateUrl: 'templates/host_create_poll.html',
      //controller: "host_create_poll_Ctrl"
    });
    .state('host_poll_results',{
      url: '/host_poll_results',
      templateUrl: 'templates/host_poll_results.html',
      //controller: "host_poll_results_Ctrl"
    });

    $urlRouterProvider.otherwise('/');
})

.controller('MainCtrl', function($scope){

})

/*
.controller("voter_find_event_Ctrl", function($scope){

})
.controller("host_create_event_Ctrl", function($scope){

})
.controller("host_create_poll_Ctrl", function($scope){

})
.controller("host_poll_results_Ctrl", function($scope){

})*/