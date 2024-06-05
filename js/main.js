'use strict';
const $photoURL = document.querySelector('#photo-url');
const $newEntryImage = document.querySelector('#new-entry-image');
const $newEntryForm = document.querySelector('#new-entry-form');
const $cardList = document.querySelector('.card-list');
const $entryFormContainer = document.querySelector('#entry-form');
const $entryContainer = document.querySelector('#entry-container');
const $entriesAnchor = document.querySelector('#entries-link');
const $newEntryBtn = document.querySelector('#new-btn');
const $noEntry = document.querySelector('#no-entries');
if (!$photoURL) throw new Error('no photoURL input found');
if (!$newEntryImage) throw new Error('no image found');
if (!$newEntryForm) throw new Error('no form element found');
if (!$cardList) throw new Error('no card list found');
if (!$entryFormContainer) throw new Error('no entry form container found');
if (!$entryContainer) throw new Error('no entry container found');
if (!$entriesAnchor) throw new Error('no entries anchor found');
if (!$newEntryBtn) throw new Error('no new entry button found');
if (!$noEntry) throw new Error('no no entry li element found');
$photoURL.addEventListener('input', () => {
  const photoURL = $photoURL.value;
  $newEntryImage.setAttribute('src', photoURL);
});
$newEntryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $newEntryForm.elements;
  const entry = {
    title: $formElements.title.value,
    photoURL: $formElements.photoURL.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.entries.unshift(entry);
  data.nextEntryId++;
  $newEntryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
  $cardList.prepend(renderEntry(data.entries[0]));
  viewSwap('entries');
  toggleNoEntries();
});
function renderEntry(entry) {
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
  return $listElement;
}
function toggleNoEntries() {
  if (!$noEntry.classList.contains('hidden') && data.entries.length !== 0) {
    $noEntry.classList.add('hidden');
  } else if (
    data.entries.length === 0 &&
    $noEntry.classList.contains('hidden')
  ) {
    $noEntry.classList.remove('hidden');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  viewSwap(data.view);
  toggleNoEntries();
  for (let i = 0; i < data.entries.length; i++) {
    $cardList.appendChild(renderEntry(data.entries[i]));
  }
});
function viewSwap(view) {
  if ($entryFormContainer.dataset.view === view) {
    $entryFormContainer.setAttribute('class', '');
    $entryContainer.setAttribute('class', 'hidden');
  } else if ($entryContainer.dataset.view === view) {
    $entryContainer.setAttribute('class', '');
    $entryFormContainer.setAttribute('class', 'hidden');
  }
  data.view = view;
}
$entriesAnchor.addEventListener('click', () => {
  viewSwap('entries');
});
$newEntryBtn.addEventListener('click', () => {
  viewSwap('entry-form');
});
