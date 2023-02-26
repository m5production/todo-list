import { NewTaskPopUp } from "../vue/Pop-up.js";
import { TaskList } from "../model/TaskList.js";
import { TaskHtml } from "../vue/renderLogics.js";

const taskList = new TaskList();

export function initializeApp() {
  const taskListNode = document.getElementById('task-list');
  renderTaskList(taskList.tasks, taskListNode);
  popUpLogic(taskListNode);
}

function renderTaskList(tasks, taskListNode) {
  tasks.forEach(taskData => {
    renderTask(taskData, taskListNode);
  });
}

function renderTask(taskData, container) {
  const newTask = new TaskHtml({ onToggleDone, onDeleteTask, taskData });
  container.prepend(newTask.task);
}

function onToggleDone(modifiedTaskData) {
  taskList.updateTaskData(modifiedTaskData)
}

function onDeleteTask(taskId) {
  taskList.deleteTaskData(taskId)
}

function popUpLogic(taskContainer) {
  const showPopUpBtn = document.getElementById('add-task-btn');
  showPopUpBtn.addEventListener('click', () => {
    new NewTaskPopUp({
      onOk: (newTask) => onAddTask(newTask, taskContainer),
      container: document.body
    });
  });
}

function onAddTask(newTaskData, container) {
  const newTask = taskList.addTask(newTaskData);
  renderTask(newTask, container);
}
