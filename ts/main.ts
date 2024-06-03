/* global data */
interface Entry {
  title: string;
  photoURL: string;
  notes: string;
  entryId: number;
}

const $photoURL = document.querySelector('#photo-url') as HTMLInputElement;
const $newEntryImage = document.querySelector(
  '#new-entry-image',
) as HTMLImageElement;
const $saveBtn = document.querySelector('#save-btn') as HTMLButtonElement;
const $title = document.querySelector('#title') as HTMLInputElement;
const $notes = document.querySelector('#notes') as HTMLTextAreaElement;
const $newEntryForm = document.querySelector(
  '#new-entry-form',
) as HTMLFormElement;

if (!$photoURL) throw new Error('no photoURL input found');
if (!$newEntryImage) throw new Error('no image found');
if (!$saveBtn) throw new Error('no save button found');
if (!$title) throw new Error('no title input found');
if (!$notes) throw new Error('no notes input found');
if (!$newEntryForm) throw new Error('no form element found');

$photoURL.addEventListener('input', () => {
  const photoURL = $photoURL.value;
  $newEntryImage.setAttribute('src', photoURL);
});

$saveBtn.addEventListener('click', (event: Event) => {
  event.preventDefault();
  const entry: Entry = {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
    entryId: data.nextEntryId,
  };
  data.entries.unshift(entry);
  data.nextEntryId++;
  $newEntryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
});
