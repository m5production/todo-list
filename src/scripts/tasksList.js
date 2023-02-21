import { renderTask } from "./renderLogics.js";

const tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.tasks)
  : [];

renderFromLocalStorage();

function renderFromLocalStorage(){
  tasks.forEach(taskData => {
    renderTask(taskData);
  });
}

function saveToLocalStorage(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskData){
  tasks.push(taskData);
  saveToLocalStorage();
}

function deleteTaskData(id){
  const taskDataIndex = getTaskDataIndex(id);
  tasks.splice(taskDataIndex,1);
  saveToLocalStorage();
}

function changeTaskData(modifiedTask){
  const id = +modifiedTask.id;
  let oldTaskIndex = getTaskDataIndex(id);
  tasks[oldTaskIndex] = modifiedTask;
  saveToLocalStorage();
}

function getTaskDataIndex(id){
  const searchedIndex = tasks.findIndex(task => task.id == id);
  return searchedIndex;
}

export {addTask, tasks, changeTaskData, deleteTaskData}

