
document.querySelector('#tasks__form').addEventListener('submit', addTask)


getTasksFromStorage()

function addTask (event){
    event.preventDefault()
    const txt = event.target.task__input.value
    console.log(txt)
    renderTask(txt)
    event.target.task__input.value = ''
    addToStorage(txt)

    
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
    const tasks = localStorage.getItem('tasks')
    if(tasks){
        tasks.split(',').forEach(task => renderTask(task))
    }
}

function addToStorage(txt){
    let newVolue = localStorage.getItem('tasks')
    newVolue = newVolue?newVolue + `,${txt}`:txt
    localStorage.setItem('tasks', newVolue)
}


function removeTask(event){
    const taskList = Array.from(document.querySelectorAll('.task__remove'))
    const taskIndex = taskList.findIndex(e => e == event.target)

    removeFromStorage(taskIndex)
    event.target.closest('div.task').remove()

}

function removeFromStorage(taskIndex){
    const tasks = localStorage.getItem('tasks').split(',')
    tasks.splice(taskIndex,1)
    localStorage.setItem('tasks', tasks.join(','))
}

        