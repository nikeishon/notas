const form    = document.getElementById('note-form');
const input   = document.getElementById('note-input');
const list    = document.getElementById('notes-list');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  list.innerHTML = '';
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    notes.push(text);
    saveNotes();
    renderNotes();
    input.value = '';
  }
});

renderNotes();
