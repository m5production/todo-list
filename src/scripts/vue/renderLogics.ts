import { ITaskDataConstructor, ITaskDataEdit, TaskData } from "scripts/model/TaskData";
import { getElementFromTemplate } from "../shared";

interface ITaskHtml {
  onToggleDone: (modifiedTaskData: Omit<ITaskDataConstructor, 'taskName' | 'taskDescription'>) => void,
  onDeleteTask: (taskId: number) => void,
  onEditClick: (editData: Omit<ITaskDataEdit, 'taskDone'>, taskContainer: HTMLElement) => void,
  taskData: TaskData
}

export class TaskHtml {
  onToggleDone
  onDeleteTask
  onEditClick
  
  taskTemplateContainerNode: DocumentFragment;
  taskNode: HTMLElement;
  taskId: number;
  checkboxNode: HTMLInputElement;
  taskNameNode: HTMLElement;
  taskDescriptionNode: HTMLElement;
  taskPen: HTMLElement;
  trashBinNode: HTMLInputElement;


  constructor({onToggleDone, onDeleteTask, onEditClick, taskData}: ITaskHtml) {
    this.onToggleDone = onToggleDone;
    this.onDeleteTask = onDeleteTask;
    this.onEditClick = onEditClick;
    this.taskTemplateContainerNode = getElementFromTemplate('task-item-template');
    this.taskNode = this.taskTemplateContainerNode.querySelector('.task-item');
    this.taskId = taskData.taskId; 

    this.checkboxNode = this.taskNode.querySelector('.task-item-checkbox');

    this.taskNameNode = this.taskNode.querySelector('.task-item-content-name');
    this.taskNameNode.textContent = taskData.taskName

    this.taskDescriptionNode = this.taskNode.querySelector('.description');
    this.taskDescriptionNode.textContent = taskData.taskDescription;
    this.taskPen = this.taskNode.querySelector('.edit-task');

    this.trashBinNode = this.taskNode.querySelector('.task-btn.remove');

    if(taskData.done) {
      this.taskNode.classList.add('task-done');
      this.checkboxNode.checked = true;
    }

    this.checkboxNode.addEventListener('change', () => this.toggleDone());
    this.taskPen.addEventListener('click', () => this.editTaskClick());
    this.trashBinNode.addEventListener('click', () => this.deleteTaskHTML());
  }

  deleteTaskHTML(){
    this.onDeleteTask(this.taskId);
    this.taskNode.remove();
  }

  toggleDone(){
    this.taskNode.classList.toggle('task-done');

    this.onToggleDone({taskId: this.taskId, taskDone: this.checkboxNode.checked});
  }

  editTaskClick(){
    const taskContent = {
      taskName: this.taskNameNode.textContent,
      taskDescription: this.taskDescriptionNode.textContent,
      taskId: this.taskId,
    }
    this.onEditClick(taskContent, this.taskNode);
  }

  insertEditedTask(oldNode: HTMLElement){
    oldNode.replaceWith(this.taskNode);
  }
}