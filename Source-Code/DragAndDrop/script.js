// Get all the lists and list items
const lists = document.querySelectorAll('.list');
const items = document.querySelectorAll('li');

// Drag start function to add the dragging class
function dragStart(e) {
  e.target.classList.add('dragging');
}

// Drag end function to remove the dragging class
function dragEnd(e) {
  e.target.classList.remove('dragging');
}

// Drag over function to allow dropping on the list
function dragOver(e) {
  e.preventDefault();
}

// Drag enter function to style the list when an item is dragged over
function dragEnter(e) {
  e.target.classList.add('over');
}

// Drag leave function to remove the styling when the item leaves the list
function dragLeave(e) {
  e.target.classList.remove('over');
}

// Drop function to move the dragged item into the list
function drop(e) {
  e.preventDefault();
  const draggedItem = document.querySelector('.dragging');
  e.target.classList.remove('over');

  // If the target is a list, append the dragged item to it
  if (e.target.classList.contains('list')) {
    e.target.querySelector('ul').appendChild(draggedItem);
  }
}

// Add event listeners for dragging items
items.forEach((item) => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

// Add event listeners for the lists to accept dropped items
lists.forEach((list) => {
  list.addEventListener('dragover', dragOver);
  list.addEventListener('dragenter', dragEnter);
  list.addEventListener('dragleave', dragLeave);
  list.addEventListener('drop', drop);
});
