const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.btn_add');
const incompleteTaskHolder = document.getElementById('incomplete-task');
const completedTasksHolder = document.getElementById('completed-tasks__items');

const createNewTaskElement = (taskString)  => {
    const listItem = document.createElement('li');
    listItem.className  =  'list-item';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'input_checkbox';

    const label = document.createElement('label');
    label.innerText = taskString;
    label.className = 'todo-list__label label';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'input_text';

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'btn btn_edit';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn_delete';

    const deleteButtonImg = document.createElement('img');
    deleteButtonImg.src = './remove.svg';

    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = ()=> {
    if (!taskInput.value) return;

    const listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';
}

const editTask = (e)=> {
    const listItem = e.currentTarget.parentElement;

    const editInput = listItem.querySelector('.input_text');
    const label = listItem.querySelector('label');
    const editBtn = listItem.querySelector('.btn_edit');
    const isContainsClass = listItem.classList.contains('list-item_edit');

    if (isContainsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }

    listItem.classList.toggle('list-item_edit');
};



const deleteTask = (e) => {
    const listItem = e.currentTarget.parentElement;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);
}


const taskCompleted = (e)=> {
    const listItem = e.currentTarget.parentElement;
    const editBtn = listItem.querySelector('.btn_edit');

    editBtn.innerText = 'Edit';
    listItem.classList.remove('list-item_edit');
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


const taskIncomplete = (e) => {
    const listItem = e.currentTarget.parentElement;

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



const ajaxRequest = ()=> {
    console.log('AJAX Request');
}


addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);


const bindTaskEvents = (taskListItem,checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector('.input_checkbox');
    const editButton = taskListItem.querySelector('.btn_edit');
    const deleteButton = taskListItem.querySelector('.btn_delete');


    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
