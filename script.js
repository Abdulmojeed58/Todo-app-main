const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const input = $('#input')
const form = $('form')
const darkLight = $('.dark-light')
const body = $('body')



window.addEventListener('keyup', (e)=>{
    if(e.key=='Enter') {
        console.log(input.value)
    }
    
})

form.addEventListener('submit', (e)=>{
    e.preventDefault()
})

darkLight.addEventListener('click', ()=>{
    if(body.classList.contains('dark')) {
        body.className = 'light'
        darkLight.innerHTML = `<img src="./images/icon-moon.svg" alt="">`
    } else {
        body.className = 'dark'
        darkLight.innerHTML = `<img src="./images/icon-sun.svg" alt="">`
    }
})