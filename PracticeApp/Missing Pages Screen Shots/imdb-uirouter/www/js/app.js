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
    .state('login',{
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: "LoginCtrl"
    })
    .state('home',{
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: "MainCtrl"
    })
    .state('favorites',{
      url: '/favorites',
      templateUrl: 'templates/favorites.html',
      controller: "FavoritesCtrl"
    });

    $urlRouterProvider.otherwise('/login');
})

.controller("MainCtrl", function($scope, ImdbAPI, $ionicSideMenuDelegate){
  $scope.toggleLeft = function(){
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.addFavorite = function(){
    // do this later
    var favoritesList = window.localStorage.getItem("favoritesList");
    if( favoritesList == null || favoritesList.length == 0 ){
      favoritesList = [];
    }
    favoritesList.push($scope.data.result.title);
    window.localStorage.setItem("favoritesList", favoritesList);

    console.log("Adding to favorites: " + $scope.data.result.title);
  };

  $scope.foo = "Thomas";

  $scope.query = {
    queryString: "hello"
  }

  $scope.searchMovie = function(){
    ImdbAPI.getMovie($scope.query.queryString).then(function(data){
      console.log("data in ctrl:" + JSON.stringify(data));

      // binding data from the API to scope
      $scope.data = data;
    });
  };
  
})

.controller("LoginCtrl", function($scope){

})

.controller("FavoritesCtrl", function($scope){
  $scope.favorites = ["Spiderman", "Superman", "Batman", "The Hulk"];
})

.service("ImdbAPI", function($http){
  var baseURL = "https://imdb.p.mashape.com/movie";

  var auth_headers = {
    'X-Mashape-Key': "vCUk82sBTsmshLxx0FCiSTTy9EErp1yUo6UjsnVr8S2yF15Nik",
    'Accept': "application/json"
  };

  return {
    getMovie: function(searchTerm){
      // ex: https://imdb.p.mashape.com/movie?searchTerm=Twilight
      var searchURL = baseURL + "?searchTerm=" + searchTerm;

      var settings = {
        method: "POST",
        url: searchURL,
        headers: auth_headers
      };

      console.log("POST: " + searchURL);

      return $http(settings).then(function(response){
        return response.data;
      });
    }
  };

});
