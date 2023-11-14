/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

function saveToLocalStorage() {
  const newJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', newJSON);
}

window.addEventListener('beforeunload', saveToLocalStorage);

const previousTodosJSON = localStorage.getItem('javascript-local-storage');
if (previousTodosJSON !== null) {
  data = JSON.parse(previousTodosJSON);
}
