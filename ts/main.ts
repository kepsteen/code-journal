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
const $cardList = document.querySelector('.card-list') as HTMLUListElement;

if (!$photoURL) throw new Error('no photoURL input found');
if (!$newEntryImage) throw new Error('no image found');
if (!$newEntryForm) throw new Error('no form element found');
if (!$cardList) throw new Error('no card list found');

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

function renderEntry(entry: Entry): void {
  const $listElement = document.createElement('li');
  $listElement.setAttribute('class', 'card-wrapper');
  const $card = document.createElement('div');
  $card.setAttribute('class', 'card');
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half flex justify-center');
  const $cardImg = document.createElement('img');
  $cardImg.setAttribute('class', 'card-img');
  $cardImg.setAttribute('src', entry.photoURL);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  const $row2 = document.createElement('div');
  $row2.setAttribute('class', 'row space-between');
  const $cardTitle = document.createElement('h2');
  $cardTitle.innerText = entry.title;
  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil fa-lg align-center');
  const $cardText = document.createElement('p');
  $cardText.innerText = entry.notes;

  $row2.appendChild($cardTitle);
  $row2.appendChild($pencilIcon);
  $columnHalf2.appendChild($row2);
  $columnHalf2.appendChild($cardText);
  $columnHalf.appendChild($cardImg);
  $row.appendChild($columnHalf);
  $row.appendChild($columnHalf2);
  $card.appendChild($row);
  $listElement.appendChild($card);
  $cardList.appendChild($listElement);
}

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }
});
