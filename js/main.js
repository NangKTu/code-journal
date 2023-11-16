/* global data */
const $entriesList = document.getElementById('entriesList');
const $entriesView = document.getElementById('entries');
const $entryFormView = document.getElementById('entry-form');

document.querySelector('#photo-url').addEventListener('input', function (e) {
  const imageUrl = this.value;
  document.querySelector('#uploaded-img').src = imageUrl;
});

document.querySelector('#entryForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const journalEntry = {
    $title: document.querySelector('#title').value,
    $photoUrl: document.querySelector('#photo-url').value,
    $notes: document.querySelector('#notes').value,
  };

  if (data.editing === null) {
    // Perform normal behavior for a new entry
    // Add the entryId property and give it the value from data.nextEntryId
    journalEntry.entryId = data.nextEntryId;
    // Unshift your journal entry object into data.entries
    data.entries.unshift(journalEntry);
    // Increment the value of data.nextEntryId
    data.nextEntryId++;
    // Prepend the journal entry DOM tree to the ul
    const $newLi = renderEntry(journalEntry);
    $entriesList.prepend($newLi);
  } else {
    // Editing an existing entry
    journalEntry.entryId = data.editing.entryId;
    // STEP - Replace the original object in the data.entries array for the edited entry with the new journal entry object with the edited data.
    for (let i = 0; i < data.entries.length; i++) {
      // Check if the id of the current element you are looping through is equal to the id of the journal entry object
      if (data.entries[i].entryId === journalEntry.entryId) {
        // If a match is found, set data.entries[i] to the journal entry object
        data.entries[i] = journalEntry;
        // Break out of the loop since you found the match
        break;
      }
    }

    // STEP - Render a new DOM tree for the new object with the updated data, and replace the original li with the matching data-entry-id value with the new generated DOM tree.
    // Query all the li items and save to variable $lis
    const $lis = document.querySelectorAll('li');
    // Declare variable updatedLi and set equal to renderEntry(journal entry object variable)
    const updatedLi = renderEntry(journalEntry);
    // Loop over the li's to find the li to replace
    for (let i = 0; i < $lis.length; i++) {
      // Check if the data-entry-id attribute value of the current li being looped through is equal to id property of data.editing
      if (
        parseInt($lis[i].getAttribute('data-entry-id')) === journalEntry.entryId
      ) {
        // If a match is found, create a variable that represents the li to replace
        const liToReplace = $lis[i];
        // Use the replaceWith method to replace the li to replace with the updated li
        liToReplace.replaceWith(updatedLi);
        // Break out of the loop since you found the match
        break;
      }
    }

    // STEP - Update the title on the form to New Entry.
    document.querySelector('#editEntries').innerText = 'New Entry';

    // STEP - Reset data.editing to null.
    data.editing = null;
  }

  // After the if else statement resume with common behavior
  // Set the img src attribute to the placeholder image
  document.querySelector('#uploaded-img').src =
    '/images/placeholder-image-square.jpg';
  // Reset form
  document.querySelector('#entryForm').reset();
  // Call view swap function with entries argument
  viewSwap('entries');
  // Call toggleNoEntries
  toggleNoEntries(data.entries.length === 0);
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('data-entry-id', entry.entryId);

  const $img = document.createElement('img');
  $img.setAttribute('class', 'savedImage');
  $img.setAttribute('src', entry.$photoUrl);
  $img.setAttribute('alt', entry.$title);
  $li.appendChild($img);

  const $div = document.createElement('div');

  const $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'h2Test');
  $h2.textContent = entry.$title;
  // Add a pencil icon next to the title
  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');
  $h2.appendChild($pencilIcon);
  $div.appendChild($h2);

  const $p = document.createElement('p');
  $p.setAttribute('class', 'qTest');
  $p.textContent = entry.$notes;
  $div.appendChild($p);

  $li.appendChild($div);
  return $li;
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

  // Event listener for Entries link
  document
    .getElementById('entries-link')
    .addEventListener('click', function (e) {
      e.preventDefault();
      viewSwap('entries');
    });

  // Event listener for New entry link
  document
    .getElementById('new-entry-link')
    .addEventListener('click', function (e) {
      e.preventDefault();
      viewSwap('entry-form');
    });
});

document.addEventListener('click', function (event) {
  const clickedPencil = event.target.closest('.fa-pencil');

  if (clickedPencil) {
    // Find the closest parent li element (the entry) that has a data-entry-id attribute
    const $entry = clickedPencil.closest('li[data-entry-id]');

    if ($entry) {
      // Extract the data-entry-id attribute value
      const entryId = $entry.getAttribute('data-entry-id');

      // Find the corresponding entry in the data.entries array
      const editingEntry = data.entries.find(
        (entry) => entry.entryId === parseInt(entryId)
      );

      if (editingEntry) {
        // Assign the editing entry to the data.editing property
        data.editing = editingEntry;

        // Show the form view
        viewSwap('entry-form');

        // Pre-populate the form fields with the editing entry's values
        document.querySelector('#title').value = editingEntry.$title;
        document.querySelector('#photo-url').value = editingEntry.$photoUrl;
        document.querySelector('#notes').value = editingEntry.$notes;

        // Set the preview image to the editing entry's photo URL
        document.querySelector('#uploaded-img').src = editingEntry.$photoUrl;

        // Update the title of the entry-form view to Edit Entry
        document.querySelector('#editEntries').innerText = 'Edit Entry';
      }
    }
  }
});
