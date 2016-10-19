// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','firebase', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      cache: false,
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('host_create_event', {
    url: '/host_create_event',
    templateUrl: 'templates/host_create_event.html',
    controller: 'host_create_event_Ctrl'
  })

  .state('host_create_poll', {
    url: '/host_create_poll',
    templateUrl: 'templates/host_create_poll.html',
    controller: 'host_create_poll_Ctrl'
  })

  .state('host_poll_in_progress', {
    url: '/host_poll_in_progress',
    templateUrl: 'templates/host_poll_in_progress.html',
    controller: 'host_poll_in_progress_Ctrl'
  })

  .state('host_poll_results', {
    url: '/host_poll_results',
    templateUrl: 'templates/host_poll_results.html',
    controller: 'host_poll_results_Ctrl'
  })

  .state('voter_search', {
    url: '/voter_search',
    templateUrl: 'templates/voter_search.html',
    controller: 'voter_search_Ctrl'
  })

  .state('voter_vote', {
    url: '/voter_vote',
    templateUrl: 'templates/voter_vote.html',
    controller: 'voter_vote_Ctrl'
  })

  .state('voter_submission', {
    url: '/voter_submission',
    templateUrl: 'templates/voter_submission.html',
    controller: 'voter_submission_Ctrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
