import { TaskData } from "./task-create.js";
import { addTask } from "./tasksList.js";
import { renderTask } from "./renderLogics.js";

function popUpLogic() {
  const showPopUpBtn = document.getElementById('add-task-btn');
  showPopUpBtn.addEventListener('click', () => document.body.append(new PopUp().popUpElement));
}

class PopUp {
  constructor(changeTask) {
    this.addTaskBtn = makeElementHTML({
      elemOfKind: 'button',
      classes: ['add-task-to-list'],
      type: 'button',
      textContent: changeTask ? 'Edit task' : 'Add new task',
    });
    this.taskName = makeElementHTML({
      elemOfKind: 'input',
      classes: ['new-task-name'],
      type: 'text',
      placeholder: 'Task name'
    });
    this.taskDescription = makeElementHTML({
      elemOfKind: 'textarea',
      classes: ['new-task-description'],
      placeholder: 'Task description',
    });
    this.taskId = null;
    this.taskDone = null;
    this.popUpElement = this.makePopUpHTML();
    this.popUpElement.addEventListener('click', (event) => this.removePopUp.call(this, event));
    

    if(changeTask) this.setValues(changeTask);

    if (changeTask) {
      this.addTaskBtn.addEventListener('click', () => this.makeChanges.call(this));
    } else {
      this.addTaskBtn.addEventListener('click', () => this.makeNewTask.call(this));
    }
  }

  setValues(changeTask){
    this.taskName.value = changeTask.taskName;
    this.taskDescription.value = changeTask.taskDescription;
    this.taskDone = changeTask.taskDone;
    this.taskId = changeTask.taskId;
  }

  // makeChanges(){
  //   const updatedTask = new TaskData({
  //     taskName: this.taskName.value,
  //     taskDescription: this.taskDescription.value,
  //     taskId: this.taskId,
  //     taskDone: this.taskDone
  //   })

  //   console.log(updatedTask);
  // }

  makePopUpHTML() {
    const popUpBodyCover = makeElementHTML({
      elemOfKind: 'div',
      classes: ['body-deactivate-cover']
    });
    const popUp = makeElementHTML({
      elemOfKind: 'div',
      classes: ['add-task-pop-up'],
    });

    popUp.append(this.taskName, this.taskDescription, this.addTaskBtn);
    popUpBodyCover.append(popUp);

    return popUpBodyCover;
  }

  removePopUp(event) {
    const clickedItemClasses = event.target.classList;
    if (clickedItemClasses.contains('body-deactivate-cover')) {
      this.popUpElement.remove();
    }
  }

  makeNewTask() {
    const newTask = new TaskData({
      taskName: this.taskName.value,
      taskDescription: this.taskDescription.value
    });
    addTask(newTask);
    renderTask(newTask);
    this.popUpElement.remove();
  }
}

function makeElementHTML({
  elemOfKind,
  classes,
  type,
  placeholder,
  textContent
}) {
  const elem = document.createElement(`${elemOfKind}`);

  if (classes) {
    classes.forEach(className => {
      elem.classList.add(className)
    });
  }

  if (type) {
    elem.type = type;
  }

  if (placeholder) {
    elem.placeholder = placeholder
  };

  if (textContent) {
    elem.textContent = textContent;
  }

  return elem;
}

export { popUpLogic, makeElementHTML, PopUp }