import { INewTaskDataCreate } from "scripts/model/TaskData";
import { getElementFromTemplate } from "../shared"

type IPopUp = {
  onOk: IOnOk,
  container: HTMLElement
}

type IOnOk = (newTask: INewTaskDataCreate) => void;

class PopUp {
  onOk: IOnOk;
  
  popUpContainerNode: HTMLElement;
  descriptionTextareaNode: HTMLTextAreaElement;
  popUpBtnNode: HTMLElement;
  nameInputNode: HTMLInputElement;

  constructor({onOk, container}: IPopUp) {
    const popUpTemplate = getElementFromTemplate('pop-up-template');
    this.popUpContainerNode = popUpTemplate.firstElementChild as HTMLElement;
    container.append(popUpTemplate);

    this.onOk = onOk;
    
    this.descriptionTextareaNode = this.popUpContainerNode.querySelector('.new-task-description');
    
    this.popUpBtnNode = this.popUpContainerNode.querySelector('.add-task-to-list');
    
    this.nameInputNode = this.popUpContainerNode.querySelector('.new-task-name');
    
    this.popUpContainerNode.addEventListener('click', (e) => this.onBodyCoverClick(e));
  }

  onBodyCoverClick(event: MouseEvent) {
    if (event.target === this.popUpContainerNode){
      this.popUpContainerNode.remove();
    }
  }
}

export class NewTaskPopUp extends PopUp {
  constructor(arg: IPopUp){
    super(arg);
    this.popUpBtnNode.textContent = 'Add task';
    this.popUpBtnNode.addEventListener('click', () => this.addNewTask());
  }

  addNewTask(){
    const newTask = {
      taskName: this.nameInputNode.value,
      taskDescription: this.descriptionTextareaNode.value,
    };

    this.onOk(newTask);
    this.popUpContainerNode.remove();
  }
}

export class EditTaskPopUp extends NewTaskPopUp {
  constructor(arg: IPopUp, taskName: string, taskDescription: string){
    super(arg);
    this.nameInputNode.value = taskName;
    this.descriptionTextareaNode.value = taskDescription;
    this.popUpBtnNode.textContent = 'Edit task';
    this.popUpBtnNode.addEventListener('click', () => this.addNewTask());
  }
}