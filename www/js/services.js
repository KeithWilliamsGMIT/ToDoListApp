angular.module('starter.services', [])

.factory('Lists', function() {
    // Define variables in an object called data so they can be passed by reference rather than by value
    // These variables will be made visible to the controllers
    var data = {
        index: 0,
        lists: []
    };

    function chooseList(index) {
        data.index = index;
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
            var newTask = { title: title, date: (new Date()), completed: false, labels: labels, schedule: -1 };
            data.lists[data.index].tasks.push(newTask);
        }
    };

    // Delete the current list
    function deleteList(index) {
        data.lists.splice(index, 1);
    };
  
    // Select the task at the given index in the current list
    function deleteTask(index) {
        data.lists[data.index].tasks.splice(index, 1);
    };
    
    // Get the total number of tasks in the selected list
    function getTotalTasks() {
        var totalTasks = 0;
        
        if (data.index < data.lists.length) {
            totalTasks = data.lists[data.index].tasks.length;
        }
        
        return totalTasks;
    };
    
    // Get the number of completed tasks in the selected list
    function getCompletedTasks() {
        var count = 0;
        
        for (var i = 0; i < getTotalTasks(); i++) {
            if (data.lists[data.index].tasks[i].completed) {
                count++;
            }
        }
        
        return count;
    };
    
  // Create a default list for first time users
  function setDefaultList() {
      data.lists = [
        { title: "Shopping", goal: "Some goal here!", tasks: [] },
        { title: "Work", goal: "Some goal here!", tasks: [] },
        { title: "Exercise", goal: "Some goal here!", tasks: [] }
      ]
  };

  return {
      data: data,
      chooseList: chooseList,
      addNewList: addNewList,
      addNewTask: addNewTask,
      deleteTask: deleteTask,
      deleteList: deleteList,
      getTotalTasks: getTotalTasks,
      getCompletedTasks: getCompletedTasks,
      setDefaultList: setDefaultList
  }
})

// The code for the load and save functions was adapted from
//  http://stackoverflow.com/questions/28293790/how-to-save-load-web-app-setting-in-ionic-framework-after-we-close-it
.factory('Storage', function() {
    // The load function loads the users lists
    function load() {
        // Uncomment to clear local storage (Used for testing features for new users)
        // localStorage.clear();
        
        var ls = localStorage['todo'];
        var object;
      
        if(ls) {
            object = angular.fromJson(ls);
            object.timestamp = new Date(object.timestamp);
        }
      
        return object;
    };
  
    // Convert the list of to do lists to Json and save it
    function save (lists) {
        var object = { timestamp: (new Date()), lists: lists}
        localStorage['todo'] = angular.toJson(object);
    };

    return {
        load: load,
        save: save
    }
})

// Service for all calendar related data
.factory('Calendar', function() {
    var data = {
        times: [],
        timeSlot: 0
    };
    
    // Initialize times with time and empty list
    function initializeTimes() {
        for (var i = 0; i < 24; ++i) {
            var slot = { time: (i + ":00"), tasks: [] };
            data.times.push(slot);
        }
    };
    
    function selectTimeSlot(index) {
        data.timeSlot = index;
    };
    
    // Add the task to the time slot if its not already appointed to it
    function addTaskToSlot(task) {
        // If the task is not in list already
        if (data.times[data.timeSlot].tasks.indexOf(task) === -1) {
            var slot = data.times[data.timeSlot];
            slot.tasks.push(task);
            
            var length = data.times[data.timeSlot].tasks.length - 1;
            slot.tasks[length].schedule = data.timeSlot;
        }
    };
    
    // Remove the task at a given index from the given time slot
    function removeTaskFromSlot(timeIndex, taskIndex) {
        data.times[timeIndex].tasks[taskIndex].schedule = -1;
        data.times[timeIndex].tasks.splice(taskIndex, 1);
    };
    
    // If the last save occured on another day, clear the schedule
    // Else appoint thetasks to the appropriate timeslot
    function initializeSchedule(saveDate, lists) {
        initializeTimes();
        
        if (isToday(saveDate)) {
            for (var i = 0; i < lists.length; ++i) {
                for (var j = 0; j < lists[i].tasks.length; ++j) {
                    var schedule = lists[i].tasks[j].schedule;
                    
                    if (schedule != -1) {
                        data.times[schedule].tasks.push(lists[i].tasks[j]);
                    }
                }
            }
        } else {
            for (var i = 0; i < lists.length; ++i) {
                for (var j = 0; j < lists[i].tasks.length; ++j) {
                    lists[i].tasks[j].schedule = -1;
                }
            }
        }
    };
    
    // Compare the given date to the current date to check if they are the same day
    function isToday(saveDate) {
        var today = new Date();
        return today.toDateString() === saveDate.toDateString();
    };
    
    // Remove the task from the calendar if it exists
    // This will be called when a task is deleted
    function removeTaskFromCalendar(task) {
        for (var i = 0; i < data.times.length; ++i) {
            var index = data.times[i].tasks.indexOf(task);
            
            if (index > -1) {
                data.times[i].tasks.splice(index, 1);
            }
        }
    };
    
    // Search for tasks with a label or name that matches the search term
    // The search is case insensitive
    function search(searchTerm, lists) {
        var results = [];
        
        for (var list = 0; list < lists.length; ++list) {
            
            for (var task = 0; task < lists[list].tasks.length; ++task) {
                
                if (compareStrings(lists[list].tasks[task].title, searchTerm)) {
                    pushResult(list, task, results, lists);
                    break;
                } else if (lists[list].tasks[task].labels) {
                    for (var label = 0; label < lists[list].tasks[task].labels.length; ++label) {

                        if (compareStrings(lists[list].tasks[task].labels[label], searchTerm)) {
                            pushResult(list, task, results, lists);
                            break;
                        }
                    }
                }
            }
        }
        
        return results;
    };
    
    // Add a task to the list of results
    function pushResult(listIndex, taskIndex, results, lists) {
        var result = { 
                      listTitle: lists[listIndex].title,
                      task: lists[listIndex].tasks[taskIndex],
                     };
        
        results.push(result);
    }
    
    // Compare two strings (case insensitive)
    function compareStrings(str1, str2) {
        return (str1.toUpperCase() === str2.toUpperCase());
    };

    return {
        data: data,
        selectTimeSlot: selectTimeSlot,
        addTaskToSlot: addTaskToSlot,
        removeTaskFromSlot: removeTaskFromSlot,
        initializeSchedule: initializeSchedule,
        removeTaskFromCalendar: removeTaskFromCalendar,
        search: search
    }
});