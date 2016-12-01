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

  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
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
    controller: 'host_events_management_Ctrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  })

  .state('host_create_event', {
    cache: false,
    url: '/host_create_event',
    templateUrl: 'templates/host_create_event.html',
    controller: 'host_create_event_Ctrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  })
  .state('host_poll_in_progress', {
    url: '/host_poll_in_progress',
    templateUrl: 'templates/host_poll_in_progress.html',
    controller: 'host_poll_in_progress_Ctrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  })

  .state('poll_results', {
    url: '/poll_results',
    templateUrl: 'templates/poll_results.html',
    controller: 'poll_results_Ctrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  })

  .state('voter_search', {
    cache: false,
    url: '/voter_search',
    templateUrl: 'templates/voter_search.html',
    controller: 'voter_search_Ctrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  })

  .state('voter_vote', {
    url: '/voter_vote',
    templateUrl: 'templates/voter_vote.html',
    controller: 'voter_vote_Ctrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  })

  .state('voter_submission', {
    url: '/voter_submission',
    templateUrl: 'templates/voter_submission.html',
    controller: 'voter_submission_Ctrl',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
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
    $state.go('login');
    $rootScope.loggedIn = false;
  };

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

    if ($scope.selected == true){
      Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;

          if(item.name == $scope.users[1].name){
            $timeout(function(){

            $state.go('voter_search');
            }, 1000);
          }else if(item.name == $scope.users[2].name){
            $timeout(function(){

            $state.go('host_events_management');
            }, 1000);
          }

          $rootScope.loggedIn = true;
          $rootScope.email = $scope.user.email.toUpperCase();
          console.log("$rootScope.email= "+$rootScope.email);

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

.controller('create_account_Ctrl', function($scope, $firebaseAuth,Auth, $timeout, $state) {
  $scope.user = {};

  $scope.backClicked = function(){
    console.log("back clicked");
    $state.go("login")
  };

  $scope.createAccount = function(){
    console.log("$scope.user:" + JSON.stringify($scope.user));
    $scope.firebaseUser = null;
    $scope.error = null;
    $scope.confirmPassword = "";

    if ($scope.match == true){
      Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
        console.log("User created successfully!");

          $timeout(function(){
            $state.go('login');
          }, 1000);

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

.controller('host_create_event_Ctrl', function($scope, $rootScope, $state, Events) {
  $scope.backClicked = function(){
    $state.go("host_events_management");
  };

  $scope.submitClicked = function(item){
    $state.go("host_events_management")

    $scope.event =
      { eventName: item.eventName,
        eventLocation: item.eventLocation,
        eventTime: item.eventTime,
        state: "new",
        email: $rootScope.email,
        option1: item.option1,
        option2: item.option2,
        option3: item.option3,
        option4: item.option4,
        option1_votes: 0,
        option2_votes: 0,
        option3_votes: 0,
        option4_votes: 0 };

    Events.$add($scope.event);

  };
})

.controller('host_events_management_Ctrl', function($scope, $rootScope,$firebaseArray, $state, Events){
  $scope.events = Events;
  $rootScope.search = "";

  $scope.currentEvent = {
    email:""
  }

  $scope.message = "";

  $scope.query = {
    search:""
  }

  $scope.newEventClicked = function(){
    console.log("new event clicked");
    $state.go("host_create_event")
  };

  $scope.emailCheck = function(x){
    $rootScope.validEmail = false;
    if($rootScope.email == x.email.toUpperCase()){
      $rootScope.validEmail = true;
    }
    return $rootScope.validEmail;
  };

  $scope.searchCheck = function(x){
    $scope.match = false;

    var str = x.eventName.toUpperCase();
    var n = str.includes($rootScope.search);

    if(n == true){
      $scope.match = true;
    }

    return !($scope.match);
  }

  $scope.searchClicked = function(){
    $rootScope.search = $scope.query.search.toUpperCase();
  };

  $scope.startClicked = function(x){
    $rootScope.currentEvent = x;
    $rootScope.currentEvent.state = "open";
    Events.$save($rootScope.currentEvent);
    //$state.go("host_poll_in_progress")
  };

  $scope.stopClicked = function(x){
    $rootScope.currentEvent = x;
    $rootScope.currentEvent.state = "closed"
    Events.$save($rootScope.currentEvent);
    //$state.go("host_poll_in_progress")
  };

  $scope.viewVotesClicked = function(x){
    console.log("view votes clicked");
    $rootScope.currentEvent = x;
    $state.go("poll_results");
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

  $scope.homeClicked = function(){
    console.log("home clicked");
    if ($rootScope.user_type == "Voter"){
      $state.go("voter_search")
    }else if($rootScope.user_type == "Host"){
      $state.go("host_events_management")
    }

  };
})

.controller('voter_search_Ctrl', function($scope, $rootScope, $firebaseObject, $firebaseArray, $state, Events){

  $scope.events = Events;
  $rootScope.search = "";

  $scope.query = {
    search:""
  }

  $scope.open_check = function(x){
      $scope.isOpen = false;
      if(x.state == "open"){
        $scope.isOpen = true;
      }
      return !($scope.isOpen);
  };

  $scope.closed_check = function(x){
    $scope.isClosed = false;
    if(x.state == "closed"){
      $scope.isClosed = true;
    }
    return !($scope.isClosed);
  };

  $scope.searchCheck = function(x){
    $scope.match = false;

    var str = x.eventName.toUpperCase();
    var n = str.includes($rootScope.search);

    if(n == true){
      $scope.match = true;
    }

    return !($scope.match);
  }


  $scope.searchClicked = function(){
    /*if($scope.query.search != "") {
      var ref = firebase.database().ref();
      $scope.events = $firebaseArray(ref.child("Events").orderByChild('eventName').equalTo($scope.query.search));
      //$scope.events = EventsQuery;
      //$rootScope.query = $scope.query.search;
      //console.log("rootScope.query= "+$rootScope.query);
      //$scope.events = Events;
    }else{
      $scope.events = Events;
    }*/
    $rootScope.search = $scope.query.search.toUpperCase();
  };

  $scope.cancelClicked = function(){
    $scope.query.search = "";
    $scope.events = Events;
  };


  $scope.voteClicked = function(x){
      $rootScope.currentEvent = x;
      $state.go("voter_vote")
  };

  $scope.resultsClicked = function(x){
    $rootScope.currentEvent = x;
    $state.go("poll_results")
  };
})

.controller('voter_vote_Ctrl', function($scope, $rootScope, $state, $timeout, Events){

  $scope.backClicked = function(){;
    $state.go("voter_search")
  };

  $scope.submitClicked = function(vote){
    if(vote == 1){
      $rootScope.currentEvent.option1_votes++;
    }else if (vote == 2){
      $rootScope.currentEvent.option2_votes++;
    }else if (vote == 3){
      $rootScope.currentEvent.option3_votes++;
    }else if (vote == 4){
      $rootScope.currentEvent.option4_votes++;
    }

    Events.$save($rootScope.currentEvent);

    $scope.msg = "Vote Submitted";

    $timeout(function(){
      $state.go('voter_search');
    }, 1000);
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



