angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, Lists) {
    $scope.data = Lists.data;
    $scope.chooseList = Lists.chooseList;
})

.controller('HomeCtrl', function($scope, Lists) {
    $scope.data = Lists.data;
    $scope.chooseList = Lists.chooseList;
})

.controller('ListCtrl', function($scope, Lists) {
    $scope.data = Lists.data;
    $scope.list = Lists.list;
    $scope.addNewTask = Lists.addNewTask;
    $scope.deleteTask = Lists.deleteTask;
    $scope.toggleDelete = Lists.toggleDelete;
    $scope.toggleAdd = Lists.toggleAdd;
    $scope.save = Lists.save;
});

