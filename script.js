document.addEventListener('DOMContentLoaded', (event) => {
  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.1';
    this.style.border = '3px dashed #c4cad3';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('task-hover');
  }

  function handleDragLeave(e) {
    this.classList.remove('task-hover');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); 
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    this.style.border = 0;

    items.forEach(function (item) {
      item.classList.remove('task-hover');
    });
  }

  function handleCheckboxChange(e) {
    // Get the corresponding task element
    const taskElement = this.parentElement;

    // Remove the task from the original list
    taskElement.remove();

    // Move the task to the completed tasks section
    moveTaskToCompleted(taskElement);
  }

  function moveTaskToCompleted(taskElement) {
    const completedTasks = document.getElementById('completed-tasks');

    // Create a new task element for completed tasks
    const completedTask = document.createElement('div');
    completedTask.className = 'completed-task';

    // Extract task text from the original task
    const taskText = taskElement.querySelector('p').innerText;

    // Create a simplified task in the completed tasks section
    completedTask.innerHTML = `
      <div class='completed-task-box'>
        <input type='checkbox' class='task-checkbox' checked disabled>
        <span class='completed-task__text'>${taskText}</span><br>
      </div>
    `;

    // Append the simplified task to the completed tasks section
    completedTasks.appendChild(completedTask);
  }

  function showTooltip() {
    document.getElementById("profileTooltip").style.visibility = "visible";
}

function hideTooltip() {
    document.getElementById("profileTooltip").style.visibility = "hidden";
}

  let items = document.querySelectorAll('.task');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);

    // Remove the task owner span and add a checkbox in its place
    let taskOwnerSpan = item.querySelector('.task__owner');
    if (taskOwnerSpan) {
      taskOwnerSpan.innerHTML = ''; // Remove content of the span

      // Add a checkbox in place of the span
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox'; // Add this line to set a class for styling
      checkbox.addEventListener('change', handleCheckboxChange);
      item.appendChild(checkbox);
    }
  });
});
document.addEventListener('DOMContentLoaded', (event) => {
  const addTaskButton = document.getElementById('addTaskButton');
  if (addTaskButton) {
      addTaskButton.addEventListener('click', handleAddTaskButtonClick);
  }
});

function handleAddTaskButtonClick() {
  const taskNameInput = document.getElementById('taskNameInput');
  const taskName = taskNameInput.value.trim();

  if (taskName !== '') {
      // Create a new task element
      const newTask = createTaskElement(taskName);

      // Append the new task to the added-tasks container
      const addedTasksContainer = document.getElementById('added-tasks');
      addedTasksContainer.appendChild(newTask);

      // Clear the input field after adding the task
      taskNameInput.value = '';
  }
}

function createTaskElement(taskName) {
  // Create a new task element
  const newTask = document.createElement('div');
  newTask.className = 'task';
  newTask.draggable = true;

  // Create a paragraph element for the task text
  const taskText = document.createElement('p');
  taskText.innerText = taskName;

  // Create a div for task tags, you can customize this part
  const taskTags = document.createElement('div');
  taskTags.className = 'task__tags';

  // Append the elements to the new task
  newTask.appendChild(taskText);
  newTask.appendChild(taskTags);

  // Add event listeners for drag-and-drop functionality
  newTask.addEventListener('dragstart', handleDragStart, false);
  newTask.addEventListener('dragenter', handleDragEnter, false);
  newTask.addEventListener('dragover', handleDragOver, false);
  newTask.addEventListener('dragleave', handleDragLeave, false);
  newTask.addEventListener('drop', handleDrop, false);
  newTask.addEventListener('dragend', handleDragEnd, false);

  // Add a checkbox for completed tasks
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.addEventListener('change', handleCheckboxChange);
  newTask.appendChild(checkbox);

  return newTask;
}
