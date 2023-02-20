// import { PopUp } from "./pop-up-create.js";

export class TaskCreator {
  constructor({ name, description }) {
    this.name = name;
    this.description = description;
    this.taskElem = this._fillElem();
    this.done = false;
    this.deleted = false;
  }

  _fillElem() {
    const elem = this.createTaskElement();
    const checkbox = this._createCheckbox();
    const text = this._createText();
    const pen = this._createPen();
    const trashBin = this._createTrashBin();
    elem.append(checkbox, text, pen, trashBin);
    return elem;
  }

  _removeTask(event) {
    const task = event.target.closest('.task-item');
    task.remove();
    this.deleted = true;
  }

  _toggleDone(event) {
    const task = event.target.closest('.task-item');
    task.classList.toggle('task-done');
    this.done = !this.done;
  }

  createTaskElement() {
    const elem = document.createElement('li');
    elem.className = 'task-item';
    return elem;
  }

  _createCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-item-checkbox';
    checkbox.addEventListener('change', this._toggleDone);
    return checkbox;
  }

  _createText() {

    const textContainer = document.createElement('div');
    textContainer.className = 'task-item-content';

    const heading = document.createElement('h3');
    heading.className = 'task-item-content-name';
    this._insertText(heading, this.name);

    const text = document.createElement('div');
    text.className = 'task-item-content-body';
    this._insertText(text, this.description);

    textContainer.append(heading, text);
    return textContainer;
  }

  _insertText(textField, text) {
    textField.textContent = text;
  }

  _createPen() {
    const pen = document.createElement('div');
    pen.classList.add('edit-task', 'task-btn');
    pen.addEventListener('click', () => {
      console.log(new PopUp());
      PopUp.editTask({
        tName: this.name,
        tDescription: this.description,
        tElem: this.taskElem
      });
    });

    return pen;
  }

  _createTrashBin() {
    const bin = document.createElement('div');
    bin.classList.add('remove', 'task-btn');
    bin.addEventListener('click', this._removeTask);
    return bin;
  }
}