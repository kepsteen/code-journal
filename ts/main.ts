/* global data */
interface Entry {
  title: string;
  photoURL: string;
  notes: string;
  entryId: number;
}

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoURL: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $photoURL = document.querySelector('#photo-url') as HTMLInputElement;
const $newEntryImage = document.querySelector(
  '#new-entry-image',
) as HTMLImageElement;
const $newEntryForm = document.querySelector(
  '#new-entry-form',
) as HTMLFormElement;

if (!$photoURL) throw new Error('no photoURL input found');
if (!$newEntryImage) throw new Error('no image found');
if (!$newEntryForm) throw new Error('no form element found');

$photoURL.addEventListener('input', () => {
  const photoURL = $photoURL.value;
  $newEntryImage.setAttribute('src', photoURL);
});

$newEntryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const $formElements = $newEntryForm.elements as FormElements;
  const entry: Entry = {
    title: $formElements.title.value,
    photoURL: $formElements.photoURL.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.entries.unshift(entry);
  data.nextEntryId++;
  $newEntryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
});
