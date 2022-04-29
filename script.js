const todoInput = document.querySelector('.todo--input');
const userInput = document.querySelector('#input');
const list = document.querySelector('#list');
const listContainer = document.getElementById('list-container');
const items = document.getElementById('items');
let img;
let content;
let input;
let btn;
let todoList = [];

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        todoList.push(userInput.value);
        localStorage.setItem("list", JSON.stringify(todoList));
        create();
        deleteList();
        addList();
        displayItemsLeft();
        userInput.value = "";
    }
});

if (localStorage.length > 0) {
    let getLocalStorage = localStorage.getItem("list");
    todoList = JSON.parse(getLocalStorage);
}



function create() {
    content = document.createElement('div');
    btn = document.createElement('button');
    input = document.createElement('input');
    img = document.createElement('img');

    content.classList.add('todo', 'todo--list');
    btn.classList.add('btn', 'btn-js');
    input.classList.add('todo__box', 'todo-js');
    img.classList.add('todo__cross');

    img.setAttribute('src', 'images/icon-cross.svg');

    content.appendChild(btn);
    content.appendChild(input);
    content.appendChild(img);
    listContainer.appendChild(content);
}

function displayList() {
    todoList.forEach((element, index) => {
        create();
        input.value = todoList[index];
    });
}

function addList() {
    input.value = userInput.value;
}


function deleteList() {
    const cross = document.querySelectorAll('.todo__cross');
    const lists = document.querySelectorAll('.todo--list');
    const input = document.querySelectorAll('.todo-js');
    cross.forEach((element, index) => {
        element.addEventListener('click', () => {
            var filteredArray = todoList.filter(e => e !== input[index].value);
            todoList = filteredArray;
            localStorage.setItem('list', JSON.stringify(filteredArray));
            listContainer.removeChild(lists[index]);
            displayItemsLeft();
        });
    });
}

function displayItemsLeft() {
    items.textContent = todoList.length + ' items left';
}

// function changeBtn() {
//     const btns = document.querySelectorAll('.btn-js');
//     btns.forEach((element, index) => {
//         element.addEventListener('click', () => {
//             element.classList.toggle('btn-toggle');
//         });
//     });
// }

function main() {
    displayList();
    displayItemsLeft();
    deleteList();
    // changeBtn();
}

main();