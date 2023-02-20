export function popUpLogic() {
  const makeNewTaskBtn = document.getElementById('add-task-btn');
  const popUpElement = makeNewTaskPopUp();

  makeNewTaskBtn.addEventListener('click', () => showPopUp(popUpElement));

  function showPopUp(elem) {
    document.body.append(elem);
  }

  function removePopUp(elem) {
    elem.remove();
  }

  function makeNewTaskPopUp() {
    const popUpBodyCover = makeElementHTML({
      elemOfKind: 'div',
      classes: ['body-deactivate-cover']
    });
    const popUp = makeElementHTML({
      elemOfKind: 'div',
      classes: ['add-task-pop-up'],
    });
    const taskName = makeElementHTML({
      elemOfKind: 'input',
      classes: ['new-task-name'],
      type: 'text',
      placeholder: 'Task name'
    });
    const taskDescription = makeElementHTML({
      elemOfKind: 'textarea',
      classes: ['new-task-description'],
      placeholder: 'Task description',
    });
    const btn = makeElementHTML({
      elemOfKind: 'button',
      classes: ['add-task-to-list'],
      type: 'button',
      textContent: 'Add new task'
    });

    console.log(popUp)

    popUp.append(taskName, taskDescription, btn);
    popUpBodyCover.append(popUp);

    return popUpBodyCover;
  }

  function makeElementHTML({
    elemOfKind,
    classes,
    type,
    placeholder,
    textContent
  }) {
    const elem = document.createElement(`${elemOfKind}`);
    
    if (classes) {
      classes.forEach(className => {
        elem.classList.add(className)
      });
    }

    if (type) {
      elem.type = type;
    }

    if (placeholder) {
      elem.placeholder = placeholder
    };

    if (textContent) {
      elem.textContent = textContent;
    }

    return elem;
  }

  function addEventListenersTo(elem, event, callback){
    elem.addEventListener(event, () => callback)
  }
}