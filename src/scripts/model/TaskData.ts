export interface INewTaskDataCreate{
  taskName: string
  taskDescription: string
}

export interface ITaskDataConstructor extends INewTaskDataCreate {
  taskId: number
  taskDone?: boolean
}

export interface ITaskDataEdit extends INewTaskDataCreate{
  taskId: number
  taskDone: boolean
}

export class TaskData {
  taskName: string
  taskDescription: string
  taskId: number
  done: boolean

  constructor({
    taskName,
    taskDescription,
    taskId,
    taskDone
  }: ITaskDataConstructor) {
    if (!taskName
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