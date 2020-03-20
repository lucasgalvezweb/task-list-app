// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Call function that call all event listener
loadEventListener();

// Create the function
function loadEventListener(){
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task form event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTask);
}

// Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add a materialize class
    li.className = 'collection-item';
    // Create the text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  })
}

// Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task first');
  }else{
    // Create li element
    const li = document.createElement('li');
    // Add a materialize class
    li.className = 'collection-item';
    // Create the text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTasFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTasFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);   
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(){
  // taskList.innerHTML = '';
  // Faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
  localStorage.clear;
}

function filterTask(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    console.log(task);
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}