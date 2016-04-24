angular.module('starter.controllers', [])

// Load data when application starts and save data when the application is paused
.run(function($ionicPlatform, Lists, Calendar, Storage) {
    load();
    
    // Load all the lists when the device is ready
    function load() {
        var data = Storage.load();
        
        // If there was no data found create a default list and set the timestamp to today
        if (!data) {
            Lists.setDefaultList();
            Calendar.initializeSchedule((new Date()), Lists.data.lists);
        } else {
            Lists.data.lists = data.lists;
            Calendar.initializeSchedule(data.timestamp, Lists.data.lists);
        }
    };
    
    // Save the lists when the device is paused
    $ionicPlatform.on('pause', function(){
        Storage.save(Lists.data.lists);
    });
})

// Controller for home view
.controller('HomeCtrl', function($scope, Lists) {
    var states = {
        showPopup: false
    };
    
    function isEmpty() {
      return (Lists.data.lists.length == 0);
    };
    
    // Select list and show/hide popup
    function togglePopupVisibility(index) {
        states.showPopup = !states.showPopup;
        
        if (states.showPopup) {
            Lists.chooseList(index);
        }
    };
    
    $scope.data = Lists.data;
    $scope.chooseList = Lists.chooseList;
    $scope.deleteList = Lists.deleteList;
    $scope.getTotalTasks = Lists.getTotalTasks;
    $scope.getCompletedTasks = Lists.getCompletedTasks;
    
    $scope.states = states;
    $scope.isEmpty = isEmpty;
    $scope.togglePopupVisibility = togglePopupVisibility;
})

// Controller for search view
.controller('SearchCtrl', function($scope, Lists, Calendar) {
    var data = {
        searchTerm: "",
        hasSearched: false,
        results: []
    };
    
    // Search for tasks with a label or name that matches the search term
    function search() {
        // Reset search results
        data.results = [];
        
        // Get results from search
        data.results = Calendar.search(data.searchTerm, Lists.data.lists);
        
        // Set hasSearched to true so if there are no results an error message will be shown
        data.hasSearched = true;
    };
    
    // Return true if the list is empty
    function isEmpty() {
      return (data.results.length == 0 && data.hasSearched);
    };
    
    // Add the selected task to the time slot
    function selectTask(index) {
        Calendar.addTaskToSlot(data.results[index].task);
        data.searchTerm = "";
        data.hasSearched = false;
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
.controller('ListCtrl', function($scope, Lists, Calendar) {
    // Check if the current list is empty
    function isEmpty() {
      return (Lists.data.lists[Lists.data.index].tasks.length == 0);
    };
    
    // Delete a task
    function deleteTask (index) {
        // Remove task from calendar
        Calendar.removeTaskFromCalendar(Lists.data.lists[Lists.data.index].tasks[index]);
        
        // Delete task permanently
        Lists.deleteTask(index);
    };
    
    $scope.data = Lists.data;
    $scope.deleteTask = deleteTask;
    $scope.isEmpty = isEmpty;
})

// Controller for single new task view
.controller('NewTaskCtrl', function($scope, Lists) {
    var data = {
        title: "",
        label: "",
        labels: []
    };
    
    // Add a new label to the new task if its not an empty string and is not already in list
    // Reset label value
    function addNewLabel() {
        // If not empty
        if (data.label) {
            // If not in list
            if (data.labels.indexOf(data.label) === -1) {
                data.labels.push(data.label);
            }
        }
        
        data.label = "";
    };
    
    // Add a new task to the current listand reset values
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
    
    // Retun true if the list of labels is empty
    function isEmpty() {
        return (data.labels.length == 0);
    };
    
    $scope.data = data;
    $scope.addNewLabel = addNewLabel;
    $scope.addNewTask = addNewTask;
    $scope.formattedLabels = formattedLabels;
    $scope.isEmpty = isEmpty;
});