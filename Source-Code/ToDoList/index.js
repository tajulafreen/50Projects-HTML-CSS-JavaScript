import { addTask, deleteTask } from './module/main.js';
import filterTasks from './module/filters.js';

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const categorySelect = document.getElementById('category-select');
  const taskList = document.getElementById('task-list');
  const filterSelect = document.getElementById('filter-select');

  document.querySelector('.add-btn').addEventListener('click', () => {
    addTask(taskInput, categorySelect, taskList);
  });

  filterSelect.addEventListener('change', () => {
    filterTasks(filterSelect, taskList);
  });

  taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      deleteTask(event.target);
    }
  });
});
