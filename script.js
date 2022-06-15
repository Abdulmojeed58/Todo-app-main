const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const form = $('form')
const darkLight = $('.dark-light')
const body = $('body')
const ul = $('ul')
const clear = $('.clear')
const itemsLeft = $('.time-left')
const active = $('.active')
const all = $('.all')
const completed = $('.completed')
const filter = $('.filter')





// GET ITEMS FROM LOCAL STORAGE ////
function getItemsFromStorage(){
    return todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
}

// ADD ITEMS TO LOCAL STORAGE
function addItemsToStorage(input, id){
    //get items from local storage
    let todos = getItemsFromStorage()

    todos.push({todoName: input, id: id, checked: false});

    localStorage.setItem('todo', JSON.stringify(todos))

    // console.log(todos)
}

function addItemsToUI() {
    
    let todos = getItemsFromStorage()
    
    
    // console.log(todos)
    return ul.innerHTML = todos.reverse().map(todo=>{
        return `
        <li class="flex ${todo.checked && 'checked'}" id="${todo.id}" draggable="true">
        <input type="checkbox" id="checkbox" ${todo.checked && 'checked'} onchange="changeStatus(event, ${todo.id})">
        <p>${todo.todoName}</p>
        <div class="checkmark"></div>
        <div class="del active">
          <img src="./images/icon-cross.svg" class="remove">
        </div>
      </li>
        `

        // console.log(a)
    }).join('')
}



// CLEAR COMPLETED ///
clear.addEventListener('click', ()=>{
    let todos = getItemsFromStorage()
    todos = todos.filter(todo=>{
        return todo.checked === false
    })
    localStorage.setItem('todo', JSON.stringify(todos))
    addItemsToUI()
})

function getitemsLeft(){
    let todos = getItemsFromStorage()
    let count = 0
    todos.forEach(todo=>{
        if(!todo.checked){
            count ++
            itemsLeft.innerHTML = `${count} Items left`
        }
    })
}








// FILTER BY ACTIVE, COMPLETED, ALL

function filterByActive(){
    let todos = getItemsFromStorage()
    return todos.filter(todo=>!todo.checked)
}

function filterByCompleted(){
    let todos = getItemsFromStorage()
    return todos.filter(todo=>todo.checked)
}


filter.addEventListener('click', (e)=>{
    let todos;
    if(e.target.classList.contains('active')){
        todos = filterByActive()
    } else if(e.target.classList.contains('completed')){
        todos = filterByCompleted()
    }
    else return
    ul.innerHTML = todos.reverse().map(todo=>{
            return `
            <li class="flex ${todo.checked && 'checked'}" id="${todo.id}" draggable="true">
            <input type="checkbox" id="checkbox" ${todo.checked && 'checked'} onchange="changeStatus(event, ${todo.id})">
            <p>${todo.todoName}</p>
            <div class="checkmark"></div>
            <div class="del active">
          <img src="./images/icon-cross.svg" class="remove">
        </div>
        </li>
            `
            // console.log(todo)
            // console.log(ul.innerHTML)
    }).join('')
})

// FILTER BY ALL
all.addEventListener('click', addItemsToUI)


// CHANGE STATUS TO CHECKED OR NOT CHECKED

function changeStatus(e, id) {
    let todos = getItemsFromStorage()
    todos.forEach(todo=>{
        if(todo.id == id) {
            if(todo.checked == false) {
                todo.checked = true
                localStorage.setItem('todo', JSON.stringify(todos))
            } else {
                todo.checked = false
                localStorage.setItem('todo', JSON.stringify(todos))
            }
        }
        addItemsToUI()
        getitemsLeft()
        
    })
}



form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const input = $('#input')
    let id = new Date().getTime()

    addItemsToStorage(input.value, id)
   
    // ADD ITEMS TO UI ///
    addItemsToUI()

    input.value = ''

    getitemsLeft()
    
})


// DELETE FROM LIST ///////////
ul.addEventListener('click', (e)=>{
    let id = e.target.parentElement.parentElement.getAttribute('id')
    if(e.target.classList.contains('remove')) {
        let todos = getItemsFromStorage()
        todos.forEach((todo, index)=>{
            if(todo.id==id){
                todos.splice(index, 1)
                localStorage.setItem('todo', JSON.stringify(todos))
                addItemsToUI()
                getitemsLeft()
            }
        })
        
    }
})

// ///  TOGGLE LIGHT AND DARK MODDE //

darkLight.addEventListener('click', ()=>{
    if(body.classList.contains('dark')) {
        body.className = 'light'
        darkLight.innerHTML = `<img src="./images/icon-moon.svg" alt="">`
    } else {
        body.className = 'dark'
        darkLight.innerHTML = `<img src="./images/icon-sun.svg" alt="">`
    }
})

window.addEventListener('DOMContentLoaded', ()=>{
    // ADD ITEMS TO UI ///
    addItemsToUI()
    getitemsLeft()
})