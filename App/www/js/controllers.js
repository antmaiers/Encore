angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $firebaseAuth, $timeout, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

 /* $scope.loginClicked = function(){
    console.log("login clicked");
    $state.go("host_create_event")
  };*/


  $scope.user = {};

  $scope.signIn = function(){
    console.log("$scope.user:" + JSON.stringify($scope.user));

    $scope.firebaseUser = null;
    $scope.error = null;

    var auth = $firebaseAuth();

    auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;

      $timeout(function(){
        $state.go('host_create_poll');
      }, 2000);
    }).catch(function(error) {
      $scope.error = error;
    });
  };

})

.controller('host_create_event_Ctrl', function($scope, $state) {
  $scope.nextClicked = function(){
    console.log("next clicked");
    $state.go("host_create_poll")
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
    $state.go("tab.dash")
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
    $state.go("tab.dash")
  };
})

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])
