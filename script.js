'use strict';

let array = [];

const listFactory = (content, id) => {
    let completed = false;
    const display = () => {
        const section = document.getElementById('list-container');
        const div = document.createElement('div'); 
        div.classList.add('todo', 'todo-js');
        div.setAttribute('data-key', id);
        div.innerHTML = `
            <button class="btn list-btn" type="button"></button>
            <input id="input" class="todo__box todo-list" type="text" value="${content}" autocomplete="off">
            <img class="todo__cross" src="images/icon-cross.svg" alt="">
        `
        section.appendChild(div);
        remove();
        completeBtn();
    }

    const remove = () => {
        const cross = document.querySelectorAll('.todo__cross');
        const divs = document.querySelectorAll('.todo-js');
        cross.forEach((element, index) => {
            if (element.getAttribute('listener') !== 'true') {
                element.addEventListener('click', ()=>{
                    let text = divs[index].getAttribute("data-key");
                    divs[index].remove();
                    array.splice(text, 1);
                    resetDatakey();
                    itemsLeft();
                })
                element.setAttribute('listener', 'true');
           }
        });
    }

    const completeBtn = () => {
        const btn = document.querySelectorAll('.list-btn');
        const todo = document.querySelectorAll('.todo-list');
        const divs = document.querySelectorAll('.todo-js');
        btn.forEach((element, index) => {
            if (element.getAttribute('listener') !== 'true'){
                element.addEventListener('click', ()=>{
                    let text = divs[index].getAttribute("data-key");
                    element.classList.toggle('btn-checked');
                    todo[index].classList.toggle('todo-strike');
                    array[text].completed = true;
                })
            }
            element.setAttribute('listener', 'true');
        });
    }

    return {
        content,
        completed,
        display
    }
}

function addList(){
    const input = document.getElementById('input');
    input.addEventListener('keypress', (e)=>{
        if(input.value != ""){
            if (e.key === 'Enter') {
                const list = listFactory(input.value, array.length);
                array.push(list);
                list.display();
                input.value = "";
                clearCompleted();
                itemsLeft();
              }
        }
    })
}

function itemsLeft(){
    const items = document.querySelector('#items');
    items.textContent = `${array.length} items left`;
}

function clearCompleted(){
    const clear = document.querySelector('.clear');
    const div = document.getElementsByClassName('todo-js');
    if (clear.getAttribute('listener') !== 'true'){
        clear.addEventListener('click', ()=>{
            for (var i = array.length - 1; i >= 0; --i) {
                if (array[i].completed == true) {
                    div[i].remove();
                    array.splice(i,1);
                    resetDatakey();
                    itemsLeft();
                }
            }
        })
        clear.setAttribute('listener', 'true');
    }
}

function resetDatakey(){
    const div = document.getElementsByClassName('todo-js');
    Array.from(div).forEach((element, index) => {
        element.setAttribute('data-key', index);
    });
}

function filter(){
    // const all = document.getElementById(all);
    // const active = document.getElementById(active);
    // const complete = document.getElementById(complete);
    const filter = document.querySelectorAll('.filter');
    
    filter.forEach((element, index) => {
        element.addEventListener('click', ()=>{
            switch(index){
                case 1:
                    element.style.color = '#3A7CFD';
                    filter[0].style.color = 'white';
                    filter[2].style.color = 'white';
                    filterActive();
                    break;
                case 2:
                    element.style.color = '#3A7CFD';
                    filter[1].style.color = 'white';
                    filter[0].style.color = 'white';
                    filterComplete();
                    break;
                default:
                    element.style.color = '#3A7CFD';
                    filter[1].style.color = 'white';
                    filter[2].style.color = 'white';
            }
        })
    });
}

function filterActive (){
    const div = document.querySelectorAll('.todo-js');
    for (var i = array.length - 1; i >= 0; --i) {
        if (array[i].completed == true) {
            div[i].remove();
        }
    }
}

function filterComplete (){
    const div = document.querySelectorAll('.todo-js');
    for (var i = array.length - 1; i >= 0; --i) {
        if (array[i].completed == false) {
            div[i].remove();
        }
    }
}

addList();
filter();