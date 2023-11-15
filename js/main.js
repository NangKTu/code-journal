document.querySelector('#photo-url').addEventListener('input', function (e) {
  const imageUrl = this.value;
  document.querySelector('#uploaded-img').src = imageUrl;
});

document.querySelector('#entryForm').addEventListener('submit', function (e) {
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
}

document.addEventListener('DOMContentLoaded', function (e) {
  const $entriesList = document.getElementById('entriesList');
  for (let i = 0; i < data.entries.length; i++) {
    const entryEle = renderEntry(data.entries[i]);
    $entriesList.appendChild(entryEle);
  }
});
