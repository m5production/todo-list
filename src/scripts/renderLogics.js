import { makeElementHTML, PopUp } from "./pop-up-create.js";
import { TaskData, createTaskDataFromHTML } from "./task-create.js";
import { changeTaskData, deleteTaskData } from "./tasksList.js";

const taskList = document.getElementById('task-list');

function renderTask(taskData) {
  const newTask = new TaskHtml(taskData);
  taskList.prepend(newTask.task);
}

class TaskHtml {
  constructor(taskData) {
    
    const taskClasses = taskData.done 
    ? ['task-item', 'task-done']
    : ['task-item'];

    this.task = makeElementHTML({
      elemOfKind: 'div',
      classes: taskClasses,
    });

    this.checkbox = makeElementHTML({
      elemOfKind: 'input',
      classes: ['task-item-checkbox'],
      type: 'checkbox',
    });

    // this.pen = makeElementHTML({
    //   elemOfKind: 'div',
    //   classes: ['task-btn', 'edit-task']
    // });

    this.trashBin = makeElementHTML({
      elemOfKind: 'div',
      classes: ['task-btn', 'remove']
    });

    if(taskData.done) this.checkbox.checked = true;
    if(taskData.id) this.task.id = taskData.id;

    this.text = this.makeText(taskData);

    this.task.append(
      this.checkbox,
      this.text,
      //this.pen,
      this.trashBin);

    this.checkbox.addEventListener('change', this.toggleDone);
    // this.pen.addEventListener('click', this.editTask)
    this.trashBin.addEventListener('click', this.deleteTaskHTML);
  }

  deleteTaskHTML(event){
    const task = event.target.closest('.task-item');
    deleteTaskData(+task.id);
    task.remove();
  }

  toggleDone(event){
    const taskElement = event.target.closest('.task-item');
    
    taskElement.classList.toggle('task-done');
    
    const taskData = createTaskDataFromHTML(taskElement);

    changeTaskData(taskData);
  }

  // editTask(event){
  //   const currentTask = event.target.closest('.task-item');
  //   const taskData = createTaskDataFromHTML(currentTask);
  //   document.body.append(new PopUp(taskData).popUpElement)
  // }

  makeText(taskData) {
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

    this.insertTaskParams(taskData, this.task, taskName, taskDescription);

    wrapper.append(taskName, taskDescription);

    return wrapper;
  }

  insertTaskParams(
    taskData, 
    task, 
    taskName, 
    taskDescription) {
    task.id = taskData.id;
    taskName.textContent = taskData.taskName;
    taskDescription.textContent = taskData.taskDescription;
  }
}

export { renderTask };