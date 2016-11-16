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
  .state('host_events_management', {
    url: '/host_events_management',
    templateUrl: 'templates/events_management.html',
    controller: 'host_events_management_Ctrl'
  })

  .state('host_create_event', {
    cache: false,
    url: '/host_create_event',
    templateUrl: 'templates/host_create_event.html',
    controller: 'host_create_event_Ctrl'
  })
  .state('host_poll_in_progress', {
    url: '/host_poll_in_progress',
    templateUrl: 'templates/host_poll_in_progress.html',
    controller: 'host_poll_in_progress_Ctrl'
  })

  .state('poll_results', {
    url: '/poll_results',
    templateUrl: 'templates/poll_results.html',
    controller: 'poll_results_Ctrl'
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

.controller('loginCtrl', function($scope,$rootScope, $firebaseAuth, Auth, $timeout, $state) {
  $scope.createAccount = function(){
    console.log("clicked create account");
    $state.go("create_account")
  };

  $scope.login_check = function(){
      return !($rootScope.loggedIn);
  };

  $scope.logout = function(){
    Auth.$signOut();
    console.log("Signing out");
    $rootScope.loggedIn = false;
    $state.go('login');
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
    $rootScope.user_type = item.name;

    var auth = $firebaseAuth();

    if ($scope.selected == true){
      auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;

          if(item.name == $scope.users[1].name){
            $timeout(function(){

            $state.go('voter_search');
            }, 2000);
          }else if(item.name == $scope.users[2].name){
            $timeout(function(){

            $state.go('host_events_management');
            }, 2000);
          }else{
            console.log("user not selected properly")
          }

          $rootScope.loggedIn = true;

      }).catch(function(error) {
        $scope.error = error;
      });
    }else{
      $scope.msg = "Please Select User Type.";
    }
  };

  $scope.isUserTypeSelected = function(userSelected){
    selected = false;
    if (userSelected != $scope.users[0]){
      $scope.selected = true;
    }
    return $scope.selected;
  }
})

.controller('create_account_Ctrl', function($scope, $firebaseAuth, $timeout, $state) {
  $scope.user = {};

  $scope.backClicked = function(){
    console.log("back clicked");
    $state.go("login")
  };

  $scope.createAccount = function(){
    console.log("$scope.user:" + JSON.stringify($scope.user));
    $scope.firebaseUser = null;
    $scope.error = null;

    var auth = $firebaseAuth();

    if ($scope.match == true){
      auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
        console.log("User created successfully!");

          $timeout(function(){
            $state.go('login');
          }, 2000);

      }).catch(function(error) {
        console.log("Error:", error);
        $scope.error = error;
      });

    }else{
      $scope.msg = "Passwords MUST Match.";
    }
  };

  $scope.passwordsMatch = function(){
    $scope.match = false;
    if ($scope.user.password == $scope.user.confirmPassword){
      $scope.match = true;
    }
    return $scope.match;
  }
})

.controller('host_create_event_Ctrl', function($scope, $state, Events) {
  $scope.submitClicked = function(item){
    console.log("submit clicked");
    $state.go("host_events_management")


    $scope.event =
    {eventName: item.eventName,
      eventLocation: item.eventLocation,
      eventTime: item.eventTime,
      option1: item.option1,
      option2: item.option2,
      option3: item.option3,
      option4: item.option4,
      option1_votes: 0,
      option2_votes: 0,
      option3_votes: 0,
      option4_votes: 0        };

    Events.$add($scope.event);

  };
})

.controller('host_events_management_Ctrl', function($scope, $rootScope, $state, Events){
  $scope.newEventClicked = function(){
    console.log("next clicked");
    $state.go("host_create_event")
  };

  $scope.events = Events;

  $scope.startClicked = function(x){
    console.log("select clicked for event: " + x.eventName);
    //console.log("submit clicked");
    $rootScope.currentEvent = x;
    $state.go("host_poll_in_progress")
  };

  $scope.deleteItem = function(x){
    $scope.events.$remove(x);

  };


})

.controller('host_poll_in_progress_Ctrl', function($scope, $state){
  $scope.stopClicked = function(){
    console.log("stop clicked");
    $state.go("poll_results")
  };
})



.controller('poll_results_Ctrl', function($scope, $rootScope, $state){

  console.log("Currentevent: "+$rootScope.currentEvent.eventName);

  $scope.homeClicked = function(){
    console.log("$rootScope.user_type= "+$rootScope.user_type);
    console.log("home clicked");
    if ($rootScope.user_type == "Voter"){
      $state.go("voter_search")
    }else if($rootScope.user_type == "Host"){
      $state.go("host_events_management")
    }

  };
})

.controller('voter_search_Ctrl', function($scope, $rootScope, $firebaseObject, $state, Events){
  $scope.searchClicked = function(){
    console.log("search clicked");
    //$state.go("voter_vote")
  };

  $scope.events = Events;

  $scope.voteClicked = function(x){
      console.log("vote clicked for event: " + x.eventName);

      $rootScope.currentEvent = x;

      $state.go("voter_vote")
  };
  $scope.resultsClicked = function(x){
    console.log("results clicked for event: " + x.eventName);

    $rootScope.currentEvent = x;

    $state.go("poll_results")
  };
})

.controller('voter_vote_Ctrl', function($scope, $rootScope, $state, $timeout){

  console.log("Currentevent: "+$rootScope.currentEvent.eventName);

  $scope.backClicked = function(){
    console.log("back clicked");
    $state.go("voter_search")
  };

    $scope.submitClicked = function(vote){
      console.log("submit clicked");
      //$state.go("voter_submission")

      if(vote == 1){
        $rootScope.currentEvent.option1_votes++;
      }else if (vote == 2){
        $rootScope.currentEvent.option2_votes++;
      }else if (vote == 3){
        $rootScope.currentEvent.option3_votes++;
      }else if (vote == 4){
        $rootScope.currentEvent.option4_votes++;
      }

      $scope.msg = "Vote Submitted";

      $timeout(function(){
        $state.go('voter_search');
      }, 2000);
  };
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
])


.factory("Events", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database where we will store our data
    var ref = firebase.database().ref();

    return $firebaseArray(ref.child("Events"));
  }
]);



