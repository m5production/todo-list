export class TaskData{
  constructor({
    taskName,
    taskDescription,
    taskId,
    taskDone
  }){
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.id = taskId || Date.now();
    this.done = taskDone || false;
  }
}

export function createTaskDataFromHTML(task){
  const taskName = task.querySelector('.task-item-content-name').textContent;
  const taskDescription = task.querySelector('.description').textContent;
  const taskDone = task.querySelector('.task-item-checkbox').checked;
  const taskId = +task.id;
  return new TaskData({
    taskName,
    taskDescription,
    taskDone,
    taskId
  });
}