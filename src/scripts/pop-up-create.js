export function popUpLogic() {
  const makeNewTaskBtn = document.getElementById('add-task-btn');
  
  makeNewTaskBtn.addEventListener('click', showPopUp);

  function showPopUp() {
    const popUp = makeNewTaskPopUp();
    document.body.append(popUp);
  }

  function makeNewTaskPopUp() {
    const popUpBodyCover = makeElementHTML({
      elemOfKind: 'body-deactivate-cover',
      classes: ['add-task-pop-up']
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

    popUp.append(taskName, taskDescription, btn);
    popUpBodyCover.append(popUp);
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
  }
}