angular.module('starter.controllers', [])

.run(function($ionicPlatform, Lists, Storage) {
    // Load all the lists when the device is ready
    $ionicPlatform.ready(function() {
        Lists.data.lists = Storage.load();
    });
    
    // Save the lists when the device is paused
    $ionicPlatform.on('pause', function(){
        Storage.save(Lists.data.lists);
    });
})

// Controller for sidemenu
.controller('AppCtrl', function($scope, Lists) {
    $scope.data = Lists.data;
    $scope.chooseList = Lists.chooseList;
})

// Controller for home view
.controller('HomeCtrl', function($scope, Lists) {
    function isEmpty() {
      return (Lists.data.lists.length == 0);
    };
    
    $scope.data = Lists.data;
    $scope.chooseList = Lists.chooseList;
    $scope.deleteList = Lists.deleteList;
    $scope.isEmpty = isEmpty;
})

// Controller for search view
.controller('SearchCtrl', function($scope, Lists) {
    var data = {
        searchTerm: "",
        results: []
    };
    
    // Search for tasks with the specified label
    // The search is case insensitive
    function search() {
        // Reset search results
        data.results = [];
        
        for (var l = 0; l < Lists.data.lists.length; ++l) {
            
            for (var t = 0; t < Lists.data.lists[l].tasks.length; ++t) {
                
                for (var label = 0; label < Lists.data.lists[l].tasks[t].labels.length; ++label) {
                    
                    if (Lists.data.lists[l].tasks[t].labels[label].toUpperCase() === data.searchTerm.toUpperCase()) {
                        data.results.push(Lists.data.lists[l].tasks[t]);
                        break;
                    }
                }
            }
        }
    };
    
    // Return true if the list is empty
    function isEmpty() {
      return (data.results.length == 0);
    };
    
    $scope.data = data;
    $scope.search = search;
    $scope.isEmpty = isEmpty;
})

// controller for new list view
.controller('NewListCtrl', function($scope, Lists) {
    var data = {
        title: ""
    };
    
    function addNewList() {
        Lists.addNewList(data.title);
        data.title = "";
    };
    
    $scope.data = data;
    $scope.addNewList = addNewList;
})

// Controller for single list view
.controller('ListCtrl', function($scope, Lists) {
    // Check if the current list is empty
    function isEmpty() {
      return (Lists.data.lists[Lists.data.index].tasks.length == 0);
    };
    
    // Delete a task
    function deleteTask (index) {
      Lists.deleteTask(index);
    };
    
    $scope.data = Lists.data;
    $scope.save = Lists.save;
    $scope.isEmpty = isEmpty;
    $scope.deleteTask = deleteTask;
})

// Controller for single new task view
.controller('NewTaskCtrl', function($scope, Lists) {
    var data = {
        title: "",
        label: "",
        labels: []
    };
    
    // Add a new label to the new task
    function addNewLabel() {
        if (data.label) {
          data.labels.push(data.label);
          data.label = "";
        }
    };
    
    // Add a new task to the current list
    function addNewTask() {
        Lists.addNewTask(data.title, data.labels);
        data.title = "";
        data.label = "";
        data.labels = [];
    };
    
    // Format and return the list of labels
    function formattedLabels() {
        return data.labels.join(", ");
    };
    
    // Check if there are labels
    function isEmpty() {
        return (data.labels.length == 0);
    };
    
    $scope.data = data;
    $scope.addNewLabel = addNewLabel;
    $scope.addNewTask = addNewTask;
    $scope.formattedLabels = formattedLabels;
    $scope.isEmpty = isEmpty;
});