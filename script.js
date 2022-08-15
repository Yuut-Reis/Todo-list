const inputTask = document.querySelector('.inputNewTask');
const btnTask = document.querySelector('.btnNewTask');
const list = document.querySelector('.list');

const addList = () => {
   const task = document.createElement('li');
   task.innerText = inputTask.value;
   list.appendChild(task);
   inputTask.value = '' 
};

btnTask.addEventListener('click', addList);