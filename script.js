const btnTask = document.querySelector('.btnNewTask');
const inputTask = document.querySelector('.inputTask')
const list = document.querySelector('.dropzone');
const newTaskSpan = document.querySelector('.newTaskSpan');
const btnEnter = document.querySelector('.btnEnter');
const clearInputTask = () => inputTask.value.trim();
let storage = [];

const newposition = (ol, posY) => {
  const tasknoSelect = ol.querySelectorAll('.task:not(.dragging)')
  let result; 
  for (let taskli of tasknoSelect) { 
    const li = taskli.getBoundingClientRect(); 
    const liCenterY = li.y + li.height / 2; 
    if (posY >= liCenterY) result = taskli;
  }
  changeStorage();
  return result 
}


document.addEventListener('dragstart', ({ target }) => { target.classList.add('dragging') });
document.addEventListener('dragend', ({ target }) => { target.classList.remove('dragging') });

list.addEventListener('dragover', (event) => {
  const dragging = document.querySelector('.dragging');
  const after = newposition(list, event.clientY); 
  if (after) {
    after.insertAdjacentElement('afterend', dragging);
  } else {
    list.prepend(dragging); 
  }
})

const changeStorage = () => {
  storage = [];
  document.querySelectorAll('.task').forEach((element) => {
    const newStorage = {
      task: element.firstChild.innerText,
      done: element.firstChild.classList.value.includes('completed'),
    }
    storage.push(newStorage);
  })
  localStorage.task = JSON.stringify(storage);
};


const doneTask = ({ target }) => {
  target.classList.toggle('completed');
  changeStorage();
}
const toggleAddTask = () => {
  newTaskSpan.classList.toggle('none');
}

const deletTask = ({ target }) => {
  target.parentNode.remove();
  changeStorage();
}


const createNewElement = (element, value, nameClass) => {
  const newElement = document.createElement(element);
  if (value) newElement.innerText = value;
  newElement.className = nameClass;
  return newElement;
}


const addList = (value, nameclass) => {
  const task = createNewElement('div', false, 'task');
  const textTask = createNewElement('p', value, nameclass)
  const delet = createNewElement('button', 'X', 'delet');
  task.draggable = true;
  task.appendChild(textTask)
  task.appendChild(delet);
  btnTask.addEventListener('click', changeStorage);
  delet.addEventListener('click', deletTask);
  textTask.addEventListener('dblclick', doneTask);
  list.appendChild(task);
  inputTask.value = '';
};

const emptyTask = () => {
  if (!clearInputTask()) {
    btnEnter.removeEventListener('click', toggleAddTask)
    btnEnter.addEventListener('click', toggleAddTask)
    return
  }
  addList(clearInputTask(), 'textTask')
  changeStorage()
  btnTask.focus();
}

const taskonload = () => {
  storage = JSON.parse(localStorage.task);
  storage.forEach(({ task, done }) => {
    addList(task, done ? 'textTask completed' : 'textTask');
  })
};

btnTask.addEventListener('click', () => {
  toggleAddTask()
  inputTask.focus()
});

inputTask.addEventListener('keyup', (event) => {
  if (event.which === 13) {
    if(!!clearInputTask()) {
        emptyTask()
        newTaskSpan.classList.add('none')
      }
  }
})
btnEnter.addEventListener('click', emptyTask);
btnEnter.addEventListener('click', toggleAddTask);

window.onload = () => {
  taskonload();
  btnTask.focus();
};