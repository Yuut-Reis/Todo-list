const inputTask = document.querySelector('.inputNewTask');
const btnTask = document.querySelector('.btnNewTask');
const list = document.querySelector('.list');



const doneTask = ({target}) => {
target.classList.toggle('completed')
}
    
 
const addList = () => {
   const task = document.createElement('li');
   task.innerText = inputTask.value;
   task.addEventListener('dblclick', doneTask)
   list.appendChild(task);
   inputTask.value = '' 
};


btnTask.addEventListener('click', addList);