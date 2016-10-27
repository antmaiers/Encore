// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','firebase'])

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

  // Each tab has its own nav history stack:
  .state('login', {
      cache: false,
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

  .state('create_account', {
    cache: false,
    url: '/create_account',
    templateUrl: 'templates/create_account.html',
    controller: 'create_account_Ctrl'
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
  $urlRouterProvider.otherwise('/login');

})

.controller('loginCtrl', function($scope, $firebaseAuth, $timeout, $state) {
  $scope.createAccount = function(){
    console.log("clicked create account");
    $state.go("create_account")
  };

  console.log($scope.selectedUser);
  $scope.users = [
    {name: '<---Select--->'},
    {name:'Voter'},
    {name:"Host"}
  ];

  $scope.user = {};

  $scope.signIn = function(item){
    console.log("$scope.user:" + JSON.stringify($scope.user));

    $scope.firebaseUser = null;
    $scope.error = null;

    var auth = $firebaseAuth();

    auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;

        console.log(item.name);
        if(item.name == $scope.users[1].name){
          $timeout(function(){

          $state.go('voter_search');
          }, 2000);
        }else if(item.name == $scope.users[2].name){
          $timeout(function(){

          $state.go('host_create_event');
          }, 2000);
        }else{
          console.log("user not selected properly")
        }

    }).catch(function(error) {
      $scope.error = error;
    });
  };
})

.controller('create_account_Ctrl', function($scope, $firebaseAuth, $timeout, $state) {
  $scope.user = {};

  $scope.createAccount = function(){
    console.log("$scope.user:" + JSON.stringify($scope.user));
    $scope.firebaseUser = null;
    $scope.error = null;

    var auth = $firebaseAuth();

    auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      console.log("User created successfully!");

        $timeout(function(){
          $state.go('login');
        }, 2000);

    }).catch(function(error) {
      console.log("Error:", error);
    });
  };
})

.controller('host_create_event_Ctrl', function($scope, $state) {
  $scope.nextClicked = function(){
    console.log("next clicked");
    $state.go("host_poll_in_progress")
  };
})

.controller('AccountCtrl', function($scope, $state) {
  $scope.loginClicked = function(){
    console.log("login clicked");
    $state.go("voter_search")
  };
})


.controller('host_create_poll_Ctrl', function($scope, $state){
  $scope.backClicked = function(){
    console.log("back clicked");
    $state.go("host_create_event")
  };
  $scope.submitClicked = function(){
    console.log("submit clicked");
    $state.go("host_poll_in_progress")
  };
  //console.log('loaded host_create_poll_Ctrl');
})

.controller('host_poll_in_progress_Ctrl', function($scope, $state){
  $scope.stopClicked = function(){
    console.log("stop clicked");
    $state.go("host_poll_results")
  };
  $scope.autoClicked = function(){
    console.log("auto clicked");
    //$state.go("")
  };
})

.controller('host_poll_results_Ctrl', function($scope, $state){
  $scope.homeClicked = function(){
    console.log("home clicked");
    $state.go("host_create_event")
  };
})

.controller('voter_search_Ctrl', function($scope, $state){
  $scope.searchClicked = function(){
    console.log("search clicked");
    $state.go("voter_vote")
  };
})

.controller('voter_vote_Ctrl', function($scope, $state){
    $scope.backClicked = function(){
    console.log("back clicked");
    $state.go("tab.account")
  };

    $scope.submitClicked = function(){
    console.log("submit clicked");
    $state.go("voter_submission")
  };
  //console.log('loaded voter_vote_Ctrl');
})

.controller('voter_submission_Ctrl', function($scope, $state){
  $scope.homeClicked = function(){
    console.log("home clicked");
    $state.go("voter_search")
  };
})

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
