angular.module('starter.services', [])

.factory('Lists', function() {

  // Define variables in an object called data so they can be passed by reference rather than by value
  // These variables will be made visible to the controllers
  var data = {
      newTask: "",
      showAdd: false,
      showDelete: false,
      index: 0,
      lists: []
  };
  
  // Call the load function to load the users data
  load();
    
  function chooseList(i) {
      data.index = i;
  };
    
  function newList(name) {
      var newList = { title: name, tasks: [] };
      data.lists.push(newList);
      data.index = data.lists.length - 1;
  };
    
  function addNewTask() {
      if (data.newTask.length !== 0) {
          var newTask = {title: data.newTask, date: (new Date()), completed: false };
          data.lists[data.index].tasks.push(newTask);

          data.newTask = "";
          data.showAdd = false;
          save();
      }
  };
    
  function deleteTask(i) {
      data.lists[data.index].tasks.splice(i, 1);
      save();
  };
    
  function deleteList(i) {
      data.lists.splice(i, 1);
      save();
  };
    
  // The code for the load and save functions was adapted from http://stackoverflow.com/questions/28293790/how-to-save-load-web-app-setting-in-ionic-framework-after-we-close-it
  // The load function loads the users lists
  // If there is no data found create some default lists (i.e. the first time the user opens the map)
  function load() {
    var l = localStorage['todo'];
    
    if(l) {
      l = angular.fromJson(l);
      data.lists = l;
    } else {
      data.lists = [
        { title: "Shopping", tasks: [] },
        { title: "Work", tasks: [] },
        { title: "Exercise", tasks: [] }]
    }
  };
  
  // Convert the list of to do lists to Json and save it
  function save () {
    localStorage['todo'] = angular.toJson(data.lists);
  };
  
  function toggleAdd () {
    data.showAdd = !data.showAdd;
    data.showDelete = false;
  };  
  
  function toggleDelete () {
    data.showDelete = !data.showDelete;
    data.showAdd = false;
  };

  return {
    data: data,
    chooseList: chooseList,
    newList: newList,
    addNewTask: addNewTask,
    deleteTask: deleteTask,
    deleteList: deleteList,
    toggleAdd: toggleAdd,
    toggleDelete: toggleDelete,
    save: save
  }
});