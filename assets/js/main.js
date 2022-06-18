const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function getLi() {
    const li = document.createElement('li')
    return li
}

inputTask.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        getTask(inputTask.value)
    }
})

function clearInput() {
    inputTask.value = ''
    inputTask.focus()

}

function createBtnDelete(li) {
    li.innerText += ' '
    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'Apagar'
    btnDelete.setAttribute('class', 'apagar')
    btnDelete.setAttribute('title', 'Apagar essa tarefa')
    li.appendChild(btnDelete)
}

function getTask(inputText) {
    const li = getLi()
    li.innerText = inputText
    tasks.appendChild(li)
    clearInput()
    createBtnDelete(li)
    saveTasks()
}

btnTask.addEventListener('click', function() {
    if (!inputTask.value) return;
    getTask(inputTask.value)
});

document.addEventListener('click', function(e) {
    const el = e.target

    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        saveTasks()
    }
})

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li')
    const listTasks = [];

    for (let task of liTasks) {
        let taskText = task.innerText
        taskText = taskText.replace('Apagar', '').trim()
        listTasks.push(taskText)
    }
    const tasksJSON = JSON.stringify(listTasks)
    localStorage.setItem('tasks', tasksJSON)
}

function addSaveTask() {
    const tasks = localStorage.getItem('tasks')
    const listTasks = JSON.parse(tasks)
    
    for (let task of listTasks) 
    getTask(task)
}

addSaveTask()