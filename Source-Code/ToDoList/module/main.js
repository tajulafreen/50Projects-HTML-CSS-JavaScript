export function addTask(taskInput, categorySelect, taskList) {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;

  if (taskText === '' || category === '') {
    alert('Please enter a task and select a category.');
    return;
  }

  const li = document.createElement('li');
  li.classList.add('task-item');
  li.innerHTML = `
          <span class="task-text">${taskText} (${category})</span>
          <button class="delete-btn">Delete</button>
      `;

  taskList.appendChild(li);

  // Clear input fields
  taskInput.value = '';
  categorySelect.value = '';
}

export function deleteTask(button) {
  const taskList = document.getElementById('task-list');
  taskList.removeChild(button.parentElement);
}
