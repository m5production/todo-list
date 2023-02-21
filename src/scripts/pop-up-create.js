import { TaskData } from "./task-create.js";
import {addTask} from "./tasksList.js";
import { renderTask } from "./renderLogics.js";

function popUpLogic() {
  const makeNewTaskBtn = document.getElementById('add-task-btn');
  const popUpElement = makeNewTaskPopUp();

  makeNewTaskBtn.addEventListener('click', () => showPopUp(popUpElement));
  popUpElement.addEventListener('click', (e) => onPopUpClick(e));

  function onPopUpClick(event) {
    const btn = event.target.closest('.add-task-to-list');
    const popUpContainer = event.target.closest('.body-deactivate-cover');

    if (btn) {
      const popUpNameField = popUpContainer.querySelector('.new-task-name');
      const popUpDescriptionField = popUpContainer.querySelector('.new-task-description');
      const newTaskData = new TaskData({
        taskName: popUpNameField.value,
        taskDescription: popUpDescriptionField.value
      });
      
      addTask(newTaskData);
      
      renderTask(newTaskData);

    } else {
      const popUp = event.target.closest('.add-task-pop-up');
      if (popUp) return;
    }

    popUpContainer.remove();
  }

  function showPopUp(elem) {
    document.body.append(elem);
  }

  function makeNewTaskPopUp() {
    const popUpBodyCover = makeElementHTML({
      elemOfKind: 'div',
      classes: ['body-deactivate-cover']
    });
    const popUp = makeElementHTML({
      elemOfKind: 'div',
      classes: ['add-task-pop-up'],
    });
    const taskName = makeElementHTML({
      elemOfKind: 'input',
      classes: ['new-task-name'],
      type: 'text',
      placeholder: 'Task name'
    });
    const taskDescription = makeElementHTML({
      elemOfKind: 'textarea',
      classes: ['new-task-description'],
      placeholder: 'Task description',
    });
    const btn = makeElementHTML({
      elemOfKind: 'button',
      classes: ['add-task-to-list'],
      type: 'button',
      textContent: 'Add new task'
    });

    popUp.append(taskName, taskDescription, btn);
    popUpBodyCover.append(popUp);

    return popUpBodyCover;
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

export {popUpLogic, makeElementHTML}