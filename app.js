const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener('submit',function(event){
    event.preventDefault();
    const newTask = todoInput.value;

    if(newTask === ''){
        alert('Please enter a task!');
        return;
    }
    todoInput.value = '';
    addTask(newTask);    
});

function addTask(task){
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    listItem.appendChild(taskText);

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    listItem.appendChild(checkBox);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    listItem.appendChild(deleteBtn);
    todoList.appendChild(listItem);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    listItem.appendChild(editBtn);

    checkBox.addEventListener('change',function(){
        if (this.checked) {
            taskText.style.textDecoration = 'line-through';
        }else{
            taskText.style.textDecoration = 'none';
        }
    });

    deleteBtn.addEventListener('click',()=>{
        todoList.removeChild(listItem)
    });

    editBtn.addEventListener('click',function(){
        const isEditing = listItem.classList.contains('editing');
        if(isEditing){
            taskText.textContent = this.previousSibling.value;
            listItem.classList.remove('editing');
            editBtn.textContent = 'Edit';
        }else{
            const input = document.createElement('input');
            input.type = 'text';
            input.value = taskText.textContent;
            listItem.insertBefore(input,taskText);
            listItem.removeChild(taskText);
            listItem.classList.add('editing');
            editBtn.textContent = 'Save';
        }

    });

    saveTasksToLocalStorage();
}


function saveTasksToLocalStorage(){
    const tasks = [];
    document.querySelectorAll("#todo-list li").forEach(task=>{
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.classList.contains('completed');
        tasks.push({text : taskText , completed : isCompleted});
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

document.addEventListener('DOMContentLoaded',function(){
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task =>{
        addTask(task.text);
    });
});