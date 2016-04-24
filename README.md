# To Do list app by Keith Williams
## 2nd year project for mobile application development module
### Purpose of this app
The purpose of this app is to track and schedule tasks with the ultimate aim of increasing productivity. This app allows users to create multiple to do lists, each with their own tasks. Each list has a goal to help the user stay on track. This app also allows the user to schedule tasks for different times in the day.

### Views
I originally used the sidemenu layout but later changed to the tab layout. The two apps tabs are home and calendar. In the home tab the user can add and delete lists and tasks. The calendar task is where the user schedules tasks for the current day. This app has six view in total.

#### Home/Lists View
In this view you can delete lists or view details about each list. These options can be found by swiping each list item to the left. The info button will show a popup with information about the selected list including the goal and number of completed tasks. Tap on the popup to close it. At the bottom of this view there's a button with a plus. This button will bring you to the new list view. When you click on a list it brings you to the tasks View.

#### New List View
In this view the user can create a new list. They must enter the list name. The goal field is optional. When they click the create list button they will be taken back to the home view

#### Tasks View
All tasks for the selected list are displayed in this view. The user can set a task to be complete by clicking the checkbox. They can also delete a task by swiping the task to the left and licking the delete button. There is also a plus button at the bottom of this view which brings the user to the new task view.

#### New Task View
In this view the user can create a new task for the selected list. They must enter the task name. The label field is optional and is only used to search for tasks.

#### Calendar View
In the calendar view there is a list of time slots for each hour of the day. The user can add any number of tasks to each time slot by clicking the plus to the right of the time. This will bring the user to the search view. The user can choose to clear a task from the time slot by swiping left and clicking the remove button. The calendar will reset everyday.

#### Search view
The search view is used to select tasks to add to the selected time slot in the calendar. The search searches for tasks with the same name or label as the search term. The search is case insensitive. The list of results are displayed and the user can choose which task to add to the calendar. When they choose a task they will be brought back to the calendar view.

### Other Notes
The save function is called when the application is paused rather than every time a change is made. However there is a problem with this approach, if the application is killed off quickly it may not save.