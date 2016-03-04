angular.module('Singable').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'client/pages/home/home.ng.html',
      controller: 'HomeCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: 'client/pages/search/search.ng.html',
      controller: 'SearchCtrl',
    });

  $urlRouterProvider.otherwise("/home");
});
