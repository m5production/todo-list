import { getElementFromTemplate } from "../shared.js"

class PopUp {
  constructor({onOk, container}) {
    const popUpTemplate = getElementFromTemplate('pop-up-template');
    this.popUpContainer = popUpTemplate.firstElementChild;
    container.append(popUpTemplate);

    this.onOk = onOk;
    
    this.descriptionTextarea = this.popUpContainer.querySelector('.new-task-description');
    
    this.popUpBtn = this.popUpContainer.querySelector('.add-task-to-list');
    
    this.nameInput = this.popUpContainer.querySelector('.new-task-name');
    
    this.popUpContainer.addEventListener('click', (e) => this.onBodyCoverClick(e));
  }

  onBodyCoverClick(event) {
    if (event.target === this.popUpContainer){
      this.popUpContainer.remove();
    }
  }
}

export class NewTaskPopUp extends PopUp {
  constructor(...args){
    super(...args);
    this.popUpBtn.textContent = 'Add task';
    this.popUpBtn.addEventListener('click', () => this.addNewTask());
  }

  addNewTask(){
    const newTask = {
      taskName: this.nameInput.value,
      taskDescription: this.descriptionTextarea.value,
    };

    this.onOk(newTask);
    this.popUpContainer.remove();
  }
}