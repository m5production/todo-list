import { makeElementHTML } from "./pop-up-create.js";

const taskList = document.getElementById('task-list');

function renderTask(taskData) {
  const newTask = makeTaskHTML(taskData);
  taskList.prepend(newTask);
}

function makeTaskHTML(taskData) {
  const task = makeElementHTML({
    elemOfKind: 'div',
    classes: ['task-item'],
  });

  const checkbox = makeElementHTML({
    elemOfKind: 'input',
    classes: ['task-item-checkbox'],
    type: 'checkbox',
  });

  const text = makeText(taskData);

  const pen = makeElementHTML({
    elemOfKind: 'div',
    classes: ['task-btn', 'edit-task']
  })

  const trashBin = makeElementHTML({
    elemOfKind: 'div',
    classes: ['task-btn', 'remove']
  });

  task.append(checkbox, text, pen, trashBin);

  return task;

  function makeText(taskData) {
    const wrapper = makeElementHTML({
      elemOfKind: 'div',
      classes: ['task-item-content'],
    });

    const taskName = makeElementHTML({
      elemOfKind: 'h3',
      classes: ['task-item-content-name']
    });

    const taskDescription = makeElementHTML({
      elemOfKind: 'div',
      classes: ['description'],
    })

    insertTaskParams(taskData, task, taskName, taskDescription);

    wrapper.append(taskName, taskDescription);

    return wrapper;
  }
}

function insertTaskParams(taskData, task, taskName, taskDescription) {
  task.id = taskData.id;
  taskName.textContent = taskData.taskName;
  taskDescription.textContent = taskData.taskDescription;
}

export {renderTask, insertTaskParams};