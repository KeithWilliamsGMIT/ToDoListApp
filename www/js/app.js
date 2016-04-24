// Create the states for the application
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/tabs.html',
    })

    // Home state
    .state('app.home', {
        url: '/home',
        views: {
            'home': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            }
        }
    })

    // Calendar state
    .state('app.calendar', {
        url: '/calendar',
        views: {
            'calendar': {
                templateUrl: 'templates/calendar.html',
                controller: 'CalendarCtrl'
            }
        }
    })

    // Search state
    .state('app.search', {
        url: '/calendar/search',
        views: {
            'calendar': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    // New list state
    .state('app.newList', {
        url: '/home/newList',
        views: {
            'home': {
                templateUrl: 'templates/newList.html',
                controller: 'NewListCtrl'
            }
        }
    })

    // List state
    .state('app.tasks', {
        url: '/home/tasks',
        views: {
            'home': {
                templateUrl: 'templates/tasks.html',
                controller: 'TasksCtrl'
            }
        }
    })

    // New task state
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
