const todoBody = document.querySelector('.todo-body');
const todoHeader = document.querySelector('.todo-header');
const form = document.querySelector('.form');
const headerDay = document.createElement('div');
const search = document.querySelector('.search-input');
const container = document.querySelector('.container');
let taskCount = 0;
let sectionHeight = todoBody.getBoundingClientRect().height;

headerDay.innerHTML = `Today: ${new Date().toDateString()}`;
todoHeader.appendChild(headerDay);
console.log('Created by Dawid Blocher');

// let contentTextarea = textarea.value;
document.addEventListener('DOMContentLoaded', function () {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = this.querySelector('input');
        if (input.value !== '') {
            addTask(input.value);
            input.value = '';
        }
        sectionHeight = todoBody.getBoundingClientRect().height;
        if (sectionHeight > 200) {
            container.style.setProperty('height', `${sectionHeight + 380}px`)
        }
    });

    search.addEventListener('input', function () {
        const value = this.value;
        const todoElements = document.querySelectorAll('.content-task');

        todoElements.forEach(element => {
            const text = element.textContent;
            if (text.indexOf(value) !== -1) {
                element.parentElement.style.setProperty('display', '');
            } else {
                element.parentElement.style.setProperty('display', 'none');
            }
            console.log(text);
        })
        console.log(this.value);
    })
});

function addTask(text) {
    const taskWrap = document.createElement('form');
    taskWrap.classList.add('task-wrap');
    date = new Date();
    // Create delete button
    const taskCheck = document.createElement('input');
    taskCheck.classList.add('check-btn');
    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.setAttribute('id', `task-label-${taskCount}`);
    taskCheck.addEventListener('input', function () {
        if (taskCheck.checked) {
            taskContent.classList.add('checked');
        } else {
            taskContent.classList.remove('checked');
        };
    });

    // add date
    const taskDate = document.createElement('div');
    taskDate.classList.add('task-add-date');
    taskDate.innerHTML = `add date:<br> ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} `;

    // content wrap
    const taskContent = document.createElement('label');
    taskContent.setAttribute('for', `task-label-${taskCount++}`);
    taskContent.classList.add('content-task');
    taskContent.innerHTML = `<span>${text}</span>`;

    const taskDelete = document.createElement('button');
    taskDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
    taskDelete.classList.add('delete-btn');
    taskDelete.addEventListener('click', function () {
        this.parentElement.remove();
    });

    taskWrap.appendChild(taskCheck);
    taskWrap.appendChild(taskContent);
    taskWrap.appendChild(taskDelete);
    taskWrap.appendChild(taskDate);
    todoBody.appendChild(taskWrap);
}