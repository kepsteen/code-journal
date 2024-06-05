'use strict';
const $photoURL = document.querySelector('#photo-url');
const $newEntryImage = document.querySelector('.entry-image');
const $newEntryForm = document.querySelector('#new-entry-form');
const $cardList = document.querySelector('.card-list');
const $entryFormContainer = document.querySelector('#entry-form');
const $entryContainer = document.querySelector('#entry-container');
const $entriesAnchor = document.querySelector('#entries-link');
const $newEntryBtn = document.querySelector('#new-btn');
const $noEntry = document.querySelector('#no-entries');
const $titleInput = document.querySelector('#title');
const $notesTextArea = document.querySelector('#notes');
const $pageHeader = document.querySelector('#new-edit-entry');
const $deleteAnchor = document.querySelector('#delete-a');
const $confirmationModal = document.querySelector('#delete-entry-modal');
const $confirmationButtons = document.querySelector('#confirm-btns');
if (!$photoURL) throw new Error('no photoURL input found');
if (!$newEntryImage) throw new Error('no image found');
if (!$newEntryForm) throw new Error('no form element found');
if (!$cardList) throw new Error('no card list found');
if (!$entryFormContainer) throw new Error('no entry form container found');
if (!$entryContainer) throw new Error('no entry container found');
if (!$entriesAnchor) throw new Error('no entries anchor found');
if (!$newEntryBtn) throw new Error('no new entry button found');
if (!$noEntry) throw new Error('no no entry li element found');
if (!$titleInput) throw new Error('no title input element found');
if (!$notesTextArea) throw new Error('no notes textarea element found');
if (!$pageHeader) throw new Error('no page header found');
if (!$deleteAnchor) throw new Error('no delete anchor found');
if (!$confirmationModal) throw new Error('no delete modal found');
if (!$confirmationButtons) throw new Error('no confirmation buttons found');
function renderEntry(entry) {
  const $listElement = document.createElement('li');
  $listElement.setAttribute('class', 'card-wrapper');
  $listElement.setAttribute('data-entry-id', `${entry.entryId}`);
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
function deleteEntry(entry) {
  let indexToRemove = null;
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entry.entryId) {
      indexToRemove = i;
    }
  }
  if (indexToRemove !== null) {
    data.entries.splice(indexToRemove, 1);
  }
  if (data.entries.length === 0) {
    toggleNoEntries();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  viewSwap(data.view);
  toggleNoEntries();
  for (let i = 0; i < data.entries.length; i++) {
    $cardList.appendChild(renderEntry(data.entries[i]));
  }
});
$photoURL.addEventListener('input', () => {
  let photoURL = $photoURL.value;
  if (photoURL === '') {
    photoURL = 'images/placeholder-image-square.jpg';
  }
  $newEntryImage.setAttribute('src', photoURL);
});
$newEntryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $newEntryForm.elements;
  if (data.editing === null) {
    const entry = {
      title: $formElements.title.value,
      photoURL: $formElements.photoURL.value,
      notes: $formElements.notes.value,
      entryId: data.nextEntryId,
    };
    data.entries.unshift(entry);
    data.nextEntryId++;
    $cardList.prepend(renderEntry(data.entries[0]));
  } else if (data.editing) {
    const entry = {
      title: $formElements.title.value,
      photoURL: $formElements.photoURL.value,
      notes: $formElements.notes.value,
      entryId: data.editing.entryId,
    };
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = entry;
        const $listElementToReplace = document.querySelector(
          `li[data-entry-id="${data.editing.entryId}"]`,
        );
        $listElementToReplace.replaceWith(renderEntry(data.entries[i]));
      }
    }
  }
  data.editing = null;
  $newEntryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntryForm.reset();
  viewSwap('entries');
  toggleNoEntries();
});
$entriesAnchor.addEventListener('click', () => {
  viewSwap('entries');
});
$newEntryBtn.addEventListener('click', () => {
  $newEntryForm.reset();
  $newEntryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $pageHeader.innerText = 'New Entry';
  viewSwap('entry-form');
});
$cardList.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  viewSwap('entry-form');
  const $eventTargetLi = $eventTarget.closest('li');
  for (let i = 0; i < data.entries.length; i++) {
    if ($eventTargetLi.dataset.entryId === data.entries[i].entryId.toString()) {
      const entry = data.entries[i];
      data.editing = entry;
      $titleInput.value = entry.title;
      $photoURL.value = entry.photoURL;
      $notesTextArea.value = entry.notes;
      $newEntryImage.setAttribute('src', entry.photoURL);
      $pageHeader.textContent = 'Edit Entry';
    }
  }
});
$deleteAnchor.addEventListener('click', () => {
  // $confirmationModal.classList.add('flex');
  $confirmationModal.showModal();
});
$confirmationButtons.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  const entry = data.editing;
  if ($eventTarget.id === 'confirm') {
    if (entry !== null) {
      const $listElementToDelete = document.querySelector(
        `li[data-entry-id="${entry.entryId}"]`,
      );
      $listElementToDelete.remove();
      // $confirmationModal.classList.remove('flex');
      $confirmationModal.close();
      viewSwap('entries');
      deleteEntry(entry);
    }
  } else if ($eventTarget.id === 'cancel') {
    $confirmationModal.classList.remove('flex');
    $confirmationModal.close();
  }
});
