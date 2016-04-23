angular.module('starter.services', [])

.factory('Lists', function() {
  // Define variables in an object called data so they can be passed by reference rather than by value
  // These variables will be made visible to the controllers
  var data = {
      index: 0,
      lists: []
  };

  function chooseList(i) {
      data.index = i;
  };
    
  // Create a new todo list
  function addNewList(title, goal) {
      var newList = { title: title, goal: goal, tasks: [] };
      data.lists.push(newList);
      data.index = data.lists.length - 1;
  };
  
  // Create a new task in the current list
  function addNewTask(title, labels) {
      if (title.length !== 0) {
          var newTask = { title: title, date: (new Date()), completed: false, labels: labels };
          data.lists[data.index].tasks.push(newTask);
      }
  };

  // Delete the current list
  function deleteList(i) {
      data.lists.splice(i, 1);
  };
  
  // Select the task at the given index in the current list
  function deleteTask(i) {
      data.lists[data.index].tasks.splice(i, 1);
  };
    
  // Create a default list for first time users
  function setDefaultList() {
      data.lists = [
        { title: "Shopping", goal: "Dont starve!", tasks: [] },
        { title: "Work", goal: "Don't get fired!", tasks: [] },
        { title: "Exercise", goal: "Go to gym 3 times a week!", tasks: [] }
      ]
  };

  return {
    data: data,
    chooseList: chooseList,
    addNewList: addNewList,
    addNewTask: addNewTask,
    deleteTask: deleteTask,
    deleteList: deleteList,
    setDefaultList: setDefaultList
  }
})

// The code for the load and save functions was adapted from
//  http://stackoverflow.com/questions/28293790/how-to-save-load-web-app-setting-in-ionic-framework-after-we-close-it
.factory('Storage', function() {
  // The load function loads the users lists
  // If there is no data found create some default lists (i.e. the first time the user opens the map)
  function load() {
    var ls = localStorage['todo'];
    var lists;
      
    if(ls) {
      lists = angular.fromJson(ls);
    }
    
    return lists;
  };
  
  // Convert the list of to do lists to Json and save it
  function save (lists) {
    localStorage['todo'] = angular.toJson(lists);
  };

  return {
      load: load,
      save: save
  }
})

// Service for all calendar related data
.factory('Calendar', function() {
    var data = {
        startTime: 0,
        endTime: 23,
        times: [],
        date: (new Date()),
        timeSlot: 0
    };
    
    initializeTimes();
    
    function initializeTimes() {
        for (var i = data.startTime; i < data.endTime + 1; ++i) {
            var slot = { time: (i + ":00"), tasks: [] };
            data.times.push(slot);
        }
    };
    
    function selectTimeSlot(index) {
        data.timeSlot = index;
    };
    
    // Add the task to the time slot if its not already appointed to it
    function addTaskToSlot(task) {
        if (!containsTask(data.times[data.timeSlot].tasks, task)) {
            data.times[data.timeSlot].tasks.push(task);
        }
    };
    
    // Remove the task at a given index from the list at a given list
    function removeTaskFromSlot(listIndex, taskIndex) {
        data.times[listIndex].tasks.splice(taskIndex, 1);
    };
    
    // Check if the task is already appointed to the time slot
    // Return true if it is and false if its not
    function containsTask(list, task) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === task) {
                return true;
            }
        }

        return false;
    };

    return {
        data: data,
        selectTimeSlot: selectTimeSlot,
        addTaskToSlot: addTaskToSlot,
        removeTaskFromSlot: removeTaskFromSlot
    }
});