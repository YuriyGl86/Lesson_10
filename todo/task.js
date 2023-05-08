
document.querySelector('#tasks__form').addEventListener('submit', addTask)


getTasksFromStorage()

function addTask (event){
    event.preventDefault()
    const txt = event.target.task__input.value
    if(txt.trim()){
        renderTask(txt)
        addToStorage(txt)
    }

    event.target.task__input.value = ''
}

function renderTask(txt){
    const taskDiv = document.querySelector('#tasks__list')
    const task = `<div class="task">
                      <div class="task__title">
                        ${txt}
                      </div>
                      <a href="#" class="task__remove">&times;</a>
                    </div>`
    taskDiv.insertAdjacentHTML("beforeend", task)
    taskDiv.lastChild.querySelector('a').addEventListener('click', removeTask)
}

function getTasksFromStorage(){
    let tasks = localStorage.getItem('tasks')
    tasks = tasks? JSON.parse(tasks): []
    tasks.forEach(task => renderTask(task))
    
}

function addToStorage(txt){
    
    let tasks = localStorage.getItem('tasks')
    console.log(tasks)
    // JSON.parse(localStorage.getItem('tasks'))
    tasks = tasks? JSON.parse(tasks): []
    console.log(tasks)
    
    localStorage.setItem('tasks', JSON.stringify([...tasks, txt]))
}


function removeTask(event){
    const taskList = Array.from(document.querySelectorAll('.task__remove'))
    const taskIndex = taskList.findIndex(e => e == event.target)

    removeFromStorage(taskIndex)
    event.target.closest('div.task').remove()

}

function removeFromStorage(taskIndex){
    const tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.splice(taskIndex,1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

        