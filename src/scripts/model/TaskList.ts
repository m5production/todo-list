import { ITaskDataConstructor, TaskData } from "./TaskData";

const LOCAL_STORAGE_KEY_TASKS = 'LOCAL_STORAGE_KEY_TASKS';

export class TaskList {
  tasks: TaskData[]

  constructor() {
    const dataFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY_TASKS);
    this.tasks = dataFromLocalStorage
      ? JSON.parse(dataFromLocalStorage)
      : [];
  }

  saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY_TASKS, JSON.stringify(this.tasks));
  }

  addTask(taskData:Omit<ITaskDataConstructor, 'taskId'>) {
    const newTask = new TaskData({
      taskId: Date.now(),
      ...taskData
    });

    this.tasks.push(newTask);
    this.saveToLocalStorage();
    return newTask;
  }

  deleteTaskData(id: number) {
    const taskDataIndex = this.getTaskIndex(id);
    if (taskDataIndex === -1) {
      console.warn('No such task found');
      return;
    }
    this.tasks.splice(taskDataIndex, 1);
    this.saveToLocalStorage();
  }

  updateTaskData(modifiedTaskData: Partial<ITaskDataConstructor>) {
    const taskIndex = this.getTaskIndex(modifiedTaskData.taskId);

    if (taskIndex === -1) {
      console.warn('No such task found');
      return;
    }

    const oldTaskData = this.tasks[taskIndex];

    const newTaskData = new TaskData({
      ...oldTaskData,
      ...modifiedTaskData,
    });

    this.tasks.splice(taskIndex, 1, newTaskData);

    this.saveToLocalStorage();

    return newTaskData;
  }

  getTaskById(id: number) {
    return this.tasks.find(task => task.taskId === id);
  }

  getTaskIndex(id: number) {
    return this.tasks.findIndex(t => t.taskId === id);
  }
}
