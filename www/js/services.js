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
  function addNewList(title) {
      var newList = { title: title, tasks: [] };
      data.lists.push(newList);
      data.index = data.lists.length - 1;
  };
  
  // Create a new task in the current list
  function addNewTask(title, labels) {
      if (title.length !== 0) {
          var newTask = {title: title, date: (new Date()), completed: false, labels: labels };
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

  return {
    data: data,
    chooseList: chooseList,
    addNewList: addNewList,
    addNewTask: addNewTask,
    deleteTask: deleteTask,
    deleteList: deleteList
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
    } else {
      lists = [
        { title: "Shopping", tasks: [] },
        { title: "Work", tasks: [] },
        { title: "Exercise", tasks: [] }]
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
});