let dragged = null;
const inputTask = document.querySelector('.inputNewTask');
const btnTask = document.querySelector('.btnNewTask');
const list = document.querySelector('.dropzone');
let storage = [];

document.addEventListener('dragstart', ({target}) => {dragged = target})
document.addEventListener('dragover', (event) => {event.preventDefault()})
document.addEventListener('drop', (event) => {
  event.preventDefault()
  if(event.target.className === 'dropzone') {
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
})

const setStorage = () => {
  const task = document.querySelectorAll('.task');
  if (!task.length) return false
  storage = []
  task.forEach((element) => {
    const tasks = {
      task: element.firstChild.nodeValue,
      done: element.className === 'task completed' ? true : false,
    }
    storage.push(tasks)
  });
  localStorage.tasks = JSON.stringify(storage);
}

const doneTask = ({ target }) => {
  target.classList.toggle('completed');
  setStorage()
}

const deletTask = ({ target }) => {
  target.parentNode.remove();
  setStorage();
}

const createNewElement = (element, value, nameClass) => {
  const newElement = document.createElement(element);
  newElement.innerText = value;
  newElement.className = nameClass;
  return newElement;
}

const addList = (value, nameclass) => {
  const delet = createNewElement('button', 'X', 'delet');
  const task = createNewElement('li', value, nameclass,);
  task.draggable = true;
  task.appendChild(delet)
  btnTask.addEventListener('click', setStorage);
  delet.addEventListener('click', deletTask);
  task.addEventListener('dblclick', doneTask);
  list.appendChild(task);
  inputTask.value = '';
};


const taskonload = () => {
  if (localStorage.tasks) {
    storage = JSON.parse(localStorage.tasks)
    storage.forEach(({task, done}) => {
      addList(task, done  ? 'task completed' : 'task');
    })
  } else {
    storage = []
  }
}


btnTask.addEventListener('click', () => { addList(inputTask.value, 'task') });
window.onload = taskonload;