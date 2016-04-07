angular.module('starter.controllers', [])

// Controller for sidemenu
.controller('AppCtrl', function($scope, Lists) {
    $scope.data = Lists.data;
    $scope.chooseList = Lists.chooseList;
})

// Controller for home view
.controller('HomeCtrl', function($scope, Lists) {
    var state = {
        showDelete: false
    };
    
    function isEmpty() {
      return (Lists.data.lists.length == 0);
    };
    
    $scope.data = Lists.data;
    $scope.chooseList = Lists.chooseList;
    $scope.deleteList = Lists.deleteList;
    $scope.state = state;
    $scope.isEmpty = isEmpty;
})

// controller for new list view
.controller('NewListCtrl', function($scope, Lists) {
    var data = {
        title: ""
    };
    
    function newList() {
        Lists.newList(data.title);
        data.title = "";
    };
    
    $scope.data = data;
    $scope.newList = newList;
})

// Controller for single list view
.controller('ListCtrl', function($scope, Lists) {
    function isEmpty() {
      return (Lists.data.lists[Lists.data.index].tasks.length == 0);
    };
    
    $scope.data = Lists.data;
    $scope.addNewTask = Lists.addNewTask;
    $scope.deleteTask = Lists.deleteTask;
    $scope.toggleDelete = Lists.toggleDelete;
    $scope.toggleAdd = Lists.toggleAdd;
    $scope.save = Lists.save;
    $scope.isEmpty = isEmpty;
});

