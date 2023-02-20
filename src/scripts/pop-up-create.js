import { TaskCreator } from "./task-create.js";

const addTaskBtn = document.getElementById('add-task-btn');

addTaskBtn.onclick = () => new PopUp();

export class PopUp {
  constructor(editData) {

    this.taskNameInput = createElem({
      elemOfKind: 'input',
      classNames: ['task-name'],
      placeholder: 'Task heading'
    });

    this.descriptionInput = createElem({
      elemOfKind: 'textarea',
      classNames: ['task-description'],
      placeholder: 'Task text'
    });

    this.popUp = this._makePopUp(editData);
    
    this._showPopUp();
  }
  
  _makePopUp(editData) {
    const bodyCover = createElem({
      elemOfKind: 'div',
      classNames: ['body-deactivate-cover', 'active'],
    });
    
    const popUp = createElem({
      elemOfKind: 'div',
      classNames: ['add-task-pop-up', 'active']
    });
    
    if (editData) this._insertTextForEdit(editData);
    const btn = this._makeBtn(editData);
    popUp.append(this.taskNameInput, this.descriptionInput, btn);
    bodyCover.append(popUp);
    bodyCover.addEventListener('click', this.onPopUpClick);
    return bodyCover;
  }
  
  _makeBtn(editData) {
    const btn = createElem({
      elemOfKind: 'button',
      classNames: ['add-task-to-list'],
      textContent: editData
        ? 'Edit task'
        : 'Add new task',
    });

    let callback;
    if (editData) {
      callback = () => {
        const editedTask = this.editTask.bind(this);
        this.replaceWith(elem.taskElem);
      }
    }
    else {
      callback = this.addNewTask.bind(this);
    }

    btn.addEventListener('click', () => {
      callback();
      this.popUp.remove();
    })

    return btn;
  }

  addNewTask() {
    const taskList = document.getElementById('task-list');
    const task = new TaskCreator({
      name: this.taskNameInput.value,
      description: this.descriptionInput.value
    });

    task.taskElem.setAttribute('data-obj-ref', task.backRef);
    console.log(task.taskElem)

    taskList.prepend(task.taskElem);
  }

  _insertTextForEdit({ name, description }) {
    this.taskNameInput.value = name;
    this.descriptionInput.value = description;
  }

  onPopUpClick(event) {
    const popUpPane = event.target.closest('.add-task-pop-up');
    if(!popUpPane) event.target.remove();
  }

  _showPopUp() {
    document.body.append(this.popUp);
  }

  // _makeTaskObjRef() {
  //   // this.popUp.taskNumber = 
  // }

}

export function createElem({
  elemOfKind,
  classNames,
  value,
  placeholder,
  textContent
}) {
  const elem = document.createElement(`${elemOfKind}`);
  elem.className = classNames.join(' ');
  if (value) elem.value = value;
  if (placeholder) elem.placeholder = placeholder;
  if (textContent) elem.textContent = textContent;
  return elem;
}