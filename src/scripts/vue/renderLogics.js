import { getElementFromTemplate } from "../shared.js";

export class TaskHtml {
  constructor({onToggleDone, onDeleteTask, taskData}) {
    this.onToggleDone = onToggleDone;
    this.onDeleteTask = onDeleteTask;
    this.taskTemplateContainer = getElementFromTemplate('task-item-template');
    this.task = this.taskTemplateContainer.querySelector('.task-item');
    this.taskId = taskData.taskId; 

    this.checkbox = this.task.querySelector('.task-item-checkbox');

    this.taskName = this.task.querySelector('.task-item-content-name');
    this.taskName.textContent = taskData.taskName

    this.taskDescription = this.task.querySelector('.description');
    this.taskDescription.textContent = taskData.taskDescription;
    // this.pen = this.task.querySelector('.edit-task');

    this.trashBin = this.task.querySelector('.task-btn.remove');

    if(taskData.done) {
      this.task.classList.add('task-done');
      this.checkbox.checked = true;
    }

    console.log(this.task)

    this.checkbox.addEventListener('change', () => this.toggleDone());
    // this.pen.addEventListener('click', this.editTask)
    this.trashBin.addEventListener('click', () => this.deleteTaskHTML());
  }

  deleteTaskHTML(){
    this.onDeleteTask(this.taskId);
    this.task.remove();
  }

  toggleDone(){
    this.task.classList.toggle('task-done');

    this.onToggleDone({taskId: this.taskId, taskDone: this.checkbox.checked});
  }
}