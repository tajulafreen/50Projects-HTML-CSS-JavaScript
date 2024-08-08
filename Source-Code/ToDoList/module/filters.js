export default function filterTasks(filterSelect, taskList) {
  const filterValue = filterSelect.value;
  const tasks = taskList.getElementsByClassName('task-item');

  for (let i = 0; i < tasks.length; i += 1) {
    const taskCategory = tasks[i].innerText.split(' (')[1].split(')')[0];
    if (filterValue === '' || filterValue === taskCategory) {
      tasks[i].style.display = '';
    } else {
      tasks[i].style.display = 'none';
    }
  }
}
