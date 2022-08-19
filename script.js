const inputTask = document.querySelector('.inputNewTask');
const btnTask = document.querySelector('.btnNewTask');
const list = document.querySelector('.dropzone');
let storage = [];

// Responsavel por capturar a posição do elemento que está sendo arrastado.
const newposition = (ol, posY) => {
  const tasknoSelect = ol.querySelectorAll('.task:not(.dragging)') // Todas as li que não estão sendo movimentadas
  let result; // posição do mouse
  for (let taskli of tasknoSelect){   // percorrendo os elementos não arrastados
    const li = taskli.getBoundingClientRect(); // ṕegando o tamanho da li e sua posição Y 
    const liCenterY = li.y + li.height / 2; // li.y = posição no eixo y + li.height / 2
    if(posY >= liCenterY) result = taskli;
  }
  setStorage()
  return result // posição do mouse
}

// Adicionando e removendo a classe dragging ao arrastar e soltar
document.addEventListener('dragstart', ({ target }) => { target.classList.add('dragging') });
document.addEventListener('dragend', ({ target }) => { target.classList.remove('dragging') });
// Aplicando o evento que permite que a OL seja uma "Area soltavel"
list.addEventListener('dragover', (event) => {
  const dragging = document.querySelector('.dragging'); // item que está sendo arrastado
  const after = newposition(list, event.clientY); // a nova posição que o item arrastado vai assumir
  if(after) {
    after.insertAdjacentElement('afterend', dragging) // fazendo o "append do item"
  }else{
    list.prepend(dragging); // se estiver fazio ele vai ser o primeiro item da lista 
  }
})

const setStorage = () => {
  const task = document.querySelectorAll('.task');
  if (!task.length) return false
  storage = []
  task.forEach((element) => {
    const tasks = {
      task: element.firstChild.nodeValue,
      done: element.className === 'task completed' || 'task completed dragging' ? true : false,
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
    storage.forEach(({ task, done }) => {
      addList(task, done ? 'task completed' : 'task');
    })
  } else {
    storage = []
  }
}


btnTask.addEventListener('click', () => { addList(inputTask.value, 'task') });
window.onload = taskonload;