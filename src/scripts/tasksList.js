const tasks = localStorage.getItem('tasks')
  ? localStorage.tasks
  : [];

function saveToLocalStorage(tasks){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskData){
  tasks.push(taskData);
  saveToLocalStorage(tasks);
}

function getElement(id){
  const current = tasks.find(task => task.id === id);
  return current;
}

export {addTask, tasks}

