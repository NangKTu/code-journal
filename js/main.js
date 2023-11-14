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
