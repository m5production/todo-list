export class TaskData{
  constructor({
    taskName,
    taskDescription,
    taskId,
    taskDone
  }){
    if(!taskName 
      || !taskDescription
      || !taskId) {
        throw Error('Must contain required fields');
    }
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.taskId = taskId;
    this.done = taskDone || false;
  }
}