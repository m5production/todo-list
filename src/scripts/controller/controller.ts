import { EditTaskPopUp, NewTaskPopUp } from "../vue/Pop-up";
import { TaskList } from "../model/TaskList";
import { TaskHtml } from "../vue/renderLogics";
import { INewTaskDataCreate, ITaskDataConstructor, ITaskDataEdit, TaskData } from "scripts/model/TaskData";

const taskList = new TaskList();

export function initializeApp() {
  const taskListNode = document.getElementById('task-list');
  renderTaskList(taskList.tasks, taskListNode);
  popUpLogic(taskListNode);
}

function renderTaskList(tasks: TaskData[], taskListNode: HTMLElement) {
  tasks.forEach(taskData => {
    renderTask(taskData, taskListNode);
  });
}

function renderTask(taskData: TaskData, container: HTMLElement) {
  const newTask = new TaskHtml({ onToggleDone, onDeleteTask, onEditClick, taskData });
  container.prepend(newTask.taskNode);
}

function onToggleDone(modifiedTaskData: Omit<ITaskDataConstructor, 'taskName' | 'taskDescription'>) {
  taskList.updateTaskData(modifiedTaskData);
}

function onDeleteTask(taskId: number) {
  taskList.deleteTaskData(taskId);
}

function popUpLogic(taskContainer: HTMLElement) {
  const showPopUpBtnNode = document.getElementById('add-task-btn');
  showPopUpBtnNode.addEventListener('click', () => {
    new NewTaskPopUp({
      onOk: (newTask: INewTaskDataCreate) => onAddTask(newTask, taskContainer),
      container: document.body
    });
  });
}

function onAddTask(newTaskData: INewTaskDataCreate, container: HTMLElement) {
  const newTask = taskList.addTask(newTaskData);
  renderTask(newTask, container);
}

function onEditClick(taskContent: ITaskDataConstructor, taskNode: HTMLElement) {
  new EditTaskPopUp(
    {
      onOk: (newTask: ITaskDataConstructor) => onEditTask(newTask, taskContent.taskId, taskNode),
      container: document.body
    },
    taskContent.taskName,
    taskContent.taskDescription
  )
}

function onEditTask(taskToUpdate: ITaskDataConstructor, taskId: number, taskNode: HTMLElement){
  taskToUpdate.taskId = taskId;
  const updTaskData = taskList.updateTaskData(taskToUpdate);
  const updTaskHtml = new TaskHtml({ onToggleDone, onDeleteTask, onEditClick, taskData: updTaskData });
  updTaskHtml.insertEditedTask(taskNode);
}