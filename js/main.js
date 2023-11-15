/* global data */

const $entriesView = document.getElementById('entries');
const $entryFormView = document.getElementById('entry-form');

document.querySelector('#photo-url').addEventListener('input', function (e) {
  const imageUrl = this.value;
  document.querySelector('#uploaded-img').src = imageUrl;
});

document.querySelector('#entryForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const $title = document.querySelector('#title').value;
  const $photoUrl = document.querySelector('#photo-url').value;
  const $notes = document.querySelector('#notes').value;

  const newEntry = {
    entryId: data.nextEntryId,
    $title,
    $photoUrl,
    $notes,
  };

  data.nextEntryId++;
  // add new entry to beginning of the data
  data.entries.unshift(newEntry);
  // Render a DOM tree for the newly submitted entry
  renderEntry(newEntry);
  // Show the "entries" view
  viewSwap('entries');
  // Conditionally use the toggleNoEntries function to remove the no entries text
  toggleNoEntries(data.entries.length === 0);
  // to reset preview image to placeholder image
  document.querySelector('#uploaded-img').src =
    '/images/placeholder-image-square.jpg';
  // to reset form
  document.querySelector('#entryForm').reset();
});

function renderEntry(entry) {
  const $li = document.createElement('li');

  const $img = document.createElement('img');
  $img.setAttribute('class', 'savedImage');
  $img.setAttribute('src', entry.$photoUrl);
  $img.setAttribute('alt', entry.$title);
  $li.appendChild($img);

  const $div = document.createElement('div');

  const $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'h2Test');
  $h2.textContent = entry.$title;
  $div.appendChild($h2);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'qTest');
  $p.textContent = entry.$notes;
  $div.appendChild($p);

  $li.appendChild($div);
  const $entriesList = document.getElementById('entriesList');
  $entriesList.appendChild($li);
}

document.addEventListener('DOMContentLoaded', function (e) {
  const $entriesList = document.getElementById('entriesList');
  $entriesList.innerHTML = '';

  // Show the view which was displayed prior to page refresh
  viewSwap(data.view);

  if (data.entries.length > 0) {
    for (let i = 0; i < data.entries.length; i++) {
      renderEntry(data.entries[i]);
    }
  } else {
    const noEntries = document.createElement('p');
    noEntries.textContent = 'No entries have been recorded.';
    $entriesList.appendChild(noEntries);
  }

  // Conditionally use the toggleEntries function to show or remove the no entries text
  toggleNoEntries(data.entries.length === 0);
});

function toggleNoEntries(visible) {
  const $entriesList = document.getElementById('entriesList');
  const $noEntries = document.getElementById('noEntries');
  if ($noEntries) {
    $noEntries.style.display = visible ? 'block' : 'none';
    $entriesList.style.display = visible ? 'none' : 'block';
  }
}

function viewSwap(viewName) {
  if (viewName === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryFormView.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  }
  data.view = viewName;
}

document.addEventListener('DOMContentLoaded', function () {
  viewSwap(data.view);

  // Add an event listener to the Entries
  document
    .getElementById('entries-link')
    .addEventListener('click', function (e) {
      e.preventDefault();
      viewSwap('entries');
    });
  // Add an event listener to New
  document
    .getElementById('new-entry-link')
    .addEventListener('click', function (e) {
      e.preventDefault();
      viewSwap('entry-form');
    });
});
