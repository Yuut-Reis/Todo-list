const btnTask = document.querySelector('.btnNewTask');
const inputTask = document.querySelector('.inputTask')
const list = document.querySelector('.dropzone');
const newTaskSpan = document.querySelector('.newTaskSpan');
const btnEnter = document.querySelector('.btnEnter');
const clearInputTask = () => inputTask.value.trim();
let storage = [];

// Responsavel por capturar a posição do elemento que está sendo arrastado.
const newposition = (ol, posY) => {
  const tasknoSelect = ol.querySelectorAll('.task:not(.dragging)') // Todas as li que não estão sendo movimentadas
  let result; // posição do mouse
  for (let taskli of tasknoSelect) {   // percorrendo os elementos não arrastados
    const li = taskli.getBoundingClientRect(); // ṕegando o tamanho da li e sua posição Y 
    const liCenterY = li.y + li.height / 2; // li.y = posição no eixo y + li.height / 2
    if (posY >= liCenterY) result = taskli;
  }
  changeStorage();
  return result // posição do mouse
}

// Adicionando e removendo a classe dragging ao arrastar e soltar
document.addEventListener('dragstart', ({ target }) => { target.classList.add('dragging') });
document.addEventListener('dragend', ({ target }) => { target.classList.remove('dragging') });
// Aplicando o evento que permite que a OL seja uma "Area soltavel"
list.addEventListener('dragover', (event) => {
  const dragging = document.querySelector('.dragging'); // item que está sendo arrastado
  const after = newposition(list, event.clientY); // a nova posição que o item arrastado vai assumir
  if (after) {
    after.insertAdjacentElement('afterend', dragging) // fazendo o "append do item"
  } else {
    list.prepend(dragging); // se estiver fazio ele vai ser o primeiro item da lista 
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