angular.module('starter.services', [])

.factory('Lists', function() {

  var data = {
      newTask: "",
      showAdd: false,
      showDelete: false,
      index: 0,
      lists: [ { title: "Shopping", tasks: [] },
             { title: "Work", tasks: [] },
             { title: "Exercise", tasks: [] }]
  };
  
  load();
    
  function chooseList(i) {
      data.index = i--;
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
    
  // The code for the load and save functions was adapted from http://stackoverflow.com/questions/28293790/how-to-save-load-web-app-setting-in-ionic-framework-after-we-close-it
  function load() {
    var l = localStorage['todo'];
    
    if(l) {
      l = angular.fromJson(l);
      data.lists = l;
    }
  };
    
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
    addNewTask: addNewTask,
    deleteTask: deleteTask,
    toggleAdd: toggleAdd,
    toggleDelete: toggleDelete,
    save: save
  }
});