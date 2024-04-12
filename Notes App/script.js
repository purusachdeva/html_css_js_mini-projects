const notesContainer = document.querySelector('.notes-container');
const createButton = document.querySelector('.create-button');
let notes = document.querySelectorAll('.input-box');

function renderNotes() {
  notesContainer.innerHTML = localStorage.getItem('notes');
}

renderNotes();

function saveToLocalStorage() {
  localStorage.setItem('notes', notesContainer.innerHTML);
}

createButton.addEventListener('click', () => {
  let inputBox = document.createElement('p');
  let img = document.createElement('img');
  inputBox.classList.add('input-box');
  inputBox.setAttribute('contenteditable', 'true');
  img.src = 'images/delete.png';
  notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG') {
    e.target.parentElement.remove();
    saveToLocalStorage();
  } 
  else if(e.target.tagName === 'P') {
    notes = document.querySelectorAll('.input-box');
    notes.forEach(note => {
      note.addEventListener('input', saveToLocalStorage);
    });
  }
});

function clearLocalStorage() {
  localStorage.clear();
  renderNotes();
}

document.addEventListener('keydown', event => {
  if(event.key === 'Enter') {
    document.execCommand('insertLineBreak');
    event.preventDefault();
  }
});