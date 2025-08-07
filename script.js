const form = document.getElementById('timetable-form');
const tbody = document.querySelector('#timetable tbody');

window.addEventListener('DOMContentLoaded', loadTimetable);


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const subject = document.getElementById('subject').value;
  const day = document.getElementById('day').value;
  const time = document.getElementById('time').value;

  const entry = { subject, day, time };

  addRowToTable(entry);
  saveEntryToLocalStorage(entry);

  form.reset();
});


function addRowToTable(entry, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${entry.day}</td>
    <td>${entry.time}</td>
    <td>${entry.subject}</td>
    <td><button onclick="deleteEntry(${index})">🗑 Delete</button></td>
  `;
  tbody.appendChild(row);
}


function saveEntryToLocalStorage(entry) {
  let entries = JSON.parse(localStorage.getItem('timetableEntries')) || [];
  entries.push(entry);
  localStorage.setItem('timetableEntries', JSON.stringify(entries));
}

function loadTimetable() {
  const entries = JSON.parse(localStorage.getItem('timetableEntries')) || [];
  entries.forEach((entry, index) => addRowToTable(entry, index));
}

function deleteEntry(index) {
  let entries = JSON.parse(localStorage.getItem('timetableEntries')) || [];
  entries.splice(index, 1); 
  localStorage.setItem('timetableEntries', JSON.stringify(entries));
  refreshTable();
}
function refreshTable() {
  tbody.innerHTML = '';
  loadTimetable();
}
document.getElementById('clear-all').addEventListener('click', function () {
  localStorage.removeItem('timetableEntries');
  refreshTable();
});
