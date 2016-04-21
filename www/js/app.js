// Create the states for the application
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'AppCtrl'
  })
  
    .state('app.home', {
      url: '/home',
      views: {
        'home': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
  
  .state('app.calendar', {
    url: '/calendar',
    views: {
      'calendar': {
        templateUrl: 'templates/calendar.html',
        controller: 'CalendarCtrl'
      }
    }
  })
  
  .state('app.search', {
    url: '/calendar/search',
    views: {
      'calendar': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  
    .state('app.newList', {
      url: '/home/newList',
      views: {
        'home': {
          templateUrl: 'templates/newList.html',
          controller: 'NewListCtrl'
        }
      }
    })

  .state('app.list', {
    url: '/home/list',
    views: {
      'home': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl'
      }
    }
  })
  
  .state('app.newTask', {
    url: '/home/newTask',
    views: {
      'home': {
        templateUrl: 'templates/newTask.html',
        controller: 'NewTaskCtrl'
      }
    }
  });
    
  // Go to the home view by default
  $urlRouterProvider.otherwise('/app/home');
});
