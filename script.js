const inputTask = document.querySelector('.inputNewTask');
const btnTask = document.querySelector('.btnNewTask');
const list = document.querySelector('.list');



const doneTask = ({target}) => {
target.classList.toggle('completed')
}
    
const deletTask = ({target}, btn) => { 
    target.parentNode.remove();
  } 


const addList = () => {
  const delet = document.createElement('button');
    delet.innerText = 'delet';
    const task = document.createElement('li');
    task.innerText = inputTask.value;
    task.appendChild(delet)
    delet.addEventListener('click', deletTask)
   task.addEventListener('dblclick', doneTask)
   list.appendChild(task);
   inputTask.value = '' 
};




btnTask.addEventListener('click', addList);