angular.module('starter.controllers', [])

.run(function($ionicPlatform, Lists, Storage) {
    load();
    
    // Load all the lists when the device is ready
    function load() {
        Lists.data.lists = Storage.load();
        
        if (!Lists.data.lists) {
            Lists.setDefaultList();
        }
    };
    
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
    var states = {
        showGoal: false
    };
    
    function isEmpty() {
      return (Lists.data.lists.length == 0);
    };
    
    // Select list and show description
    function toggleGoalVisibility(index) {
        states.showGoal = !states.showGoal;
        
        if (states.showGoal) {
            Lists.chooseList(index);
        }
    };
    
    // Get the total number of tasks in the selected list
    function getTotalTasks() {
        var totalTasks = 0;
        
        if (Lists.data.lists.length > 0) {
            totalTasks = Lists.data.lists[Lists.data.index].tasks.length;
        }
        
        return totalTasks;
    };
    
    // Get the number of completed tasks in the selected list
    function getCompletedTasks() {
        var count = 0;
        
        for (var i = 0; i < getTotalTasks(); i++) {
            if (Lists.data.lists[Lists.data.index].tasks[i].completed) {
                count++;
            }
        }
        
        return count;
    };
    
    $scope.data = Lists.data;
    $scope.chooseList = Lists.chooseList;
    $scope.deleteList = Lists.deleteList;
    
    $scope.states = states;
    $scope.isEmpty = isEmpty;
    $scope.toggleGoalVisibility = toggleGoalVisibility;
    $scope.getTotalTasks = getTotalTasks;
    $scope.getCompletedTasks = getCompletedTasks;
})

// Controller for search view
.controller('SearchCtrl', function($scope, Lists, Calendar) {
    var data = {
        searchTerm: "",
        results: []
    };
    
    // Search for tasks with a label or name that matches the search term
    // The search is case insensitive
    function search() {
        // Reset search results
        data.results = [];
        
        for (var list = 0; list < Lists.data.lists.length; ++list) {
            
            for (var task = 0; task < Lists.data.lists[list].tasks.length; ++task) {
                
                if (compareStrings(Lists.data.lists[list].tasks[task].title, data.searchTerm)) {
                    pushResult(list, task);
                    break;
                } else if (Lists.data.lists[list].tasks[task].labels) {
                    for (var label = 0; label < Lists.data.lists[list].tasks[task].labels.length; ++label) {

                        if (compareStrings(Lists.data.lists[list].tasks[task].labels[label], data.searchTerm)) {
                            pushResult(list, task);
                            break;
                        }
                    }
                }
            }
        }
    };
    
    function pushResult(listIndex, taskIndex) {
        var result = { 
                      listTitle: Lists.data.lists[listIndex].title,
                      task: Lists.data.lists[listIndex].tasks[taskIndex],
                     };
        
        data.results.push(result);
    }
    
    // Compare two strings (case insensitive)
    function compareStrings(str1, str2) {
        return (str1.toUpperCase() === str2.toUpperCase());
    };
    
    // Return true if the list is empty
    function isEmpty() {
      return (data.results.length == 0);
    };
    
    // Add the selected task to the time slot
    function selectTask(index) {
        Calendar.addTaskToSlot(data.results[index].task);
        data.searchTerm = "";
        data.results = [];
    };
    
    $scope.data = data;
    $scope.search = search;
    $scope.isEmpty = isEmpty;
    $scope.selectTask = selectTask;
})

// Controller for calendar view
.controller('CalendarCtrl', function($scope, Lists, Calendar) {
    $scope.data = Calendar.data;
    $scope.selectTimeSlot = Calendar.selectTimeSlot;
    $scope.removeTaskFromSlot = Calendar.removeTaskFromSlot;
})

// controller for new list view
.controller('NewListCtrl', function($scope, Lists) {
    var data = {
        title: "",
        goal: ""
    };
    
    // Create a new list and reset values
    function addNewList() {
        Lists.addNewList(data.title, data.goal);
        data.title = "";
        data.goal = "";
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