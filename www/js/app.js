// Create the states for the application

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
  
    .state('app.newList', {
      url: '/newList',
      views: {
        'menuContent': {
          templateUrl: 'templates/newList.html',
          controller: 'NewListCtrl'
        }
      }
    })

  .state('app.list', {
    url: '/home/:listId',
    views: {
      'menuContent': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    }
  });
    
  // Go to the home view by default
  $urlRouterProvider.otherwise('/app/home');
});
