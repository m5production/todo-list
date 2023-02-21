export class TaskData{
  constructor({
    taskName,
    taskDescription
  }){
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.id = Date.now();
    this.done = false;
  }
}