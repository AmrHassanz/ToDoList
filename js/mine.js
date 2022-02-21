let taskInput = document.getElementById('taskInput');
let addBtn = document.getElementById('add');
let clearAllBtn = document.getElementById('clearAll');
let editBtn = document.getElementById('edit');

let tasks;
if (localStorage.getItem('myTasks') != null) {
    tasks = JSON.parse(localStorage.getItem('myTasks'));
    display();
}
else {
    tasks = [];
    display();
}

taskInput.addEventListener('keyup', function () {
    if (taskInput.value == '') {
        addBtn.disabled = true;
    }
    else {
        addBtn.disabled = false;
    }
});

function amr(i) {
    // let items = Array.from(document.querySelectorAll('.item'));
    if (tasks[i].done == 'active') {
        tasks[i].done = '';
    }
    else {
        tasks[i].done = 'active';
    }
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    display();
    console.log(tasks)
}

function addTask() {
    let task = {
        oneTask: taskInput.value,
        done: ''
    };
    tasks.push(task);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    taskInput.value = '';
    display();
    console.log(tasks)
    addBtn.disabled = true;
}
addBtn.addEventListener('click', addTask);


function display() {
    let cartoona = '';
    for (let i = 0; i < tasks.length; i++) {
        cartoona += `  <li   class="item  list-group-item p-0 overflow-hidden d-flex align-items-center justify-content-between">
         <span class='ms-2 my-span' onclick="retrieve(${i})">${tasks[i].oneTask}</span>
         <button onclick="deleteTask(${i})" class="del btn btn-secondary text-white"><i
                class="fas fa-trash-alt"></i></button>
         <button onclick="amr(${i})" class="${tasks[i].done} my-btn"></button>
    </li>`
    }
    document.getElementById('toDoList').innerHTML = cartoona;

    let count = document.getElementById('count').innerHTML = tasks.length;
    if (count == 0) {
        clearAllBtn.disabled = true;
        addBtn.disabled = true;
        editBtn.disabled = true;
    }
    else {
        clearAllBtn.disabled = false;
        editBtn.disabled = false;
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    display();
    console.log(tasks);
}

function clearAll() {
    tasks = [];
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    display();
};
clearAllBtn.addEventListener('click', clearAll);



let clickedIndex;
function retrieve(index) {
    clickedIndex = index;
    taskInput.value = tasks[index].oneTask;
}
function editTask() {
    tasks[clickedIndex].oneTask = taskInput.value;
    display();
    taskInput.value = '';
}
editBtn.addEventListener('click', editTask);

