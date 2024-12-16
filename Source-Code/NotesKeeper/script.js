console.log('Welcome to Magic Notes App!');

// Function Declaration Before Use
function showNotes() {
  const notesObj = JSON.parse(localStorage.getItem('notes')) || [];
  const notesElem = document.getElementById('notes');

  if (notesObj.length === 0) {
    notesElem.innerHTML = 'No notes added yet.';
    return;
  }

  notesElem.innerHTML = notesObj
    .map(
      (note, index) => `
        <div class="noteBox">
            <h3 class="noteHeading">Note ${index + 1}</h3>
            <p class="paraHeading">${note}</p>
            <button class="buttonHeading" onclick="deleteNote(${index})">Delete Note</button>
        </div>
      `,
    )
    .join('');
}

// Event Listener for Add Note Button
document.getElementById('myBtn').addEventListener('click', () => {
  const textArea = document.getElementById('textarea');
  const noteContent = textArea.value.trim();
  if (!noteContent) {
    alert('Please enter a note!');
    return;
  }

  const notesObj = JSON.parse(localStorage.getItem('notes')) || [];
  notesObj.push(noteContent);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  textArea.value = '';
  showNotes();
});

// Delete Note Function
// eslint-disable-next-line no-unused-vars
function deleteNote(index) {
  const notesObj = JSON.parse(localStorage.getItem('notes')) || [];
  notesObj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  showNotes();
}

// Search Notes
document.getElementById('search').addEventListener('input', function () {
  const inputVal = this.value.toLowerCase().trim();
  const noteBoxes = document.getElementsByClassName('noteBox');

  Array.from(noteBoxes).forEach((element) => {
    const boxTxt = element
      .querySelector('.paraHeading')
      .innerText.toLowerCase();
    element.style.display = boxTxt.includes(inputVal) ? 'block' : 'none';
  });
});

// Initial Call
showNotes();
