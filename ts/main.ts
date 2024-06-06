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
  '.entry-image',
) as HTMLImageElement;
const $newEntryForm = document.querySelector(
  '#new-entry-form',
) as HTMLFormElement;
const $cardList = document.querySelector('.card-list') as HTMLUListElement;
const $entryFormContainer = document.querySelector(
  '#entry-form',
) as HTMLDivElement;
const $entryContainer = document.querySelector(
  '#entry-container',
) as HTMLDivElement;
const $entriesAnchor = document.querySelector(
  '#entries-link',
) as HTMLAnchorElement;
const $newEntryBtn = document.querySelector('#new-btn') as HTMLAnchorElement;
const $noEntry = document.querySelector(
  '#no-entries-added',
) as HTMLParagraphElement;
const $titleInput = document.querySelector('#title') as HTMLInputElement;
const $notesTextArea = document.querySelector('#notes') as HTMLTextAreaElement;
const $pageHeader = document.querySelector(
  '#new-edit-entry',
) as HTMLHeadingElement;
const $deleteAnchor = document.querySelector('#delete-a') as HTMLAnchorElement;
const $confirmationModal = document.querySelector(
  '#delete-entry-modal',
) as HTMLDialogElement;
const $confirmationButtons = document.querySelector(
  '#confirm-btns',
) as HTMLDivElement;
const $searchBar = document.querySelector('#search-bar') as HTMLInputElement;
const $noEntriesFound = document.querySelector(
  '#no-entries-found',
) as HTMLParagraphElement;

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
if (!$searchBar) throw new Error('no search bar found');
if (!$noEntriesFound) throw new Error('no no entries found li found');

function renderEntry(entry: Entry): HTMLLIElement {
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

function toggleNoEntries(): void {
  if (!$noEntry.classList.contains('hidden') && data.entries.length !== 0) {
    $noEntry.classList.add('hidden');
  } else if (
    data.entries.length === 0 &&
    $noEntry.classList.contains('hidden')
  ) {
    $noEntry.classList.remove('hidden');
  }
}

function viewSwap(view: string): void {
  if ($entryFormContainer.dataset.view === view) {
    $entryFormContainer.setAttribute('class', '');
    $entryContainer.setAttribute('class', 'hidden');
  } else if ($entryContainer.dataset.view === view) {
    $entryContainer.setAttribute('class', '');
    $entryFormContainer.setAttribute('class', 'hidden');
  }
  data.view = view;
}

function deleteEntry(entry: Entry): void {
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

$newEntryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const $formElements = $newEntryForm.elements as FormElements;
  if (data.editing === null) {
    const entry: Entry = {
      title: $formElements.title.value,
      photoURL: $formElements.photoURL.value,
      notes: $formElements.notes.value,
      entryId: data.nextEntryId,
    };
    data.entries.unshift(entry);
    data.nextEntryId++;
    $cardList.prepend(renderEntry(data.entries[0]));
  } else if (data.editing) {
    const entry: Entry = {
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
        ) as HTMLLIElement;
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

$cardList.addEventListener('click', (event: Event): void => {
  const $eventTarget = event.target as HTMLElement;
  if ($eventTarget.tagName === 'I') {
    viewSwap('entry-form');
    const $eventTargetLi = $eventTarget.closest('li') as HTMLLIElement;
    for (let i = 0; i < data.entries.length; i++) {
      if (
        $eventTargetLi.dataset.entryId === data.entries[i].entryId.toString()
      ) {
        const entry = data.entries[i];
        data.editing = entry;
        $titleInput.value = entry.title;
        $photoURL.value = entry.photoURL;
        $notesTextArea.value = entry.notes;
        $newEntryImage.setAttribute('src', entry.photoURL);
        $pageHeader.textContent = 'Edit Entry';
      }
    }
  }
});

$deleteAnchor.addEventListener('click', () => {
  $confirmationModal.showModal();
});

$confirmationButtons.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
  const entry: null | Entry = data.editing;
  if ($eventTarget.id === 'confirm') {
    if (entry !== null) {
      const $listElementToDelete = document.querySelector(
        `li[data-entry-id="${entry.entryId}"]`,
      ) as HTMLLIElement;
      $listElementToDelete.remove();
      $confirmationModal.close();
      viewSwap('entries');
      deleteEntry(entry);
    }
  } else if ($eventTarget.id === 'cancel') {
    $confirmationModal.classList.remove('flex');
    $confirmationModal.close();
  }
});

$searchBar.addEventListener('input', () => {
  const keyword = $searchBar.value.toLowerCase();
  const $listElementCollection =
    $cardList.children as HTMLCollectionOf<HTMLLIElement>;
  if (keyword === '') {
    for (let i = 0; i < $listElementCollection.length; i++) {
      $listElementCollection[i].classList.remove('hidden');
    }
    $noEntriesFound.classList.add('hidden');
  } else {
    let matchesFound = false;
    for (let i = 0; i < $listElementCollection.length; i++) {
      if (
        !$listElementCollection[i].innerText.toLowerCase().includes(keyword)
      ) {
        $listElementCollection[i].classList.add('hidden');
      } else if (
        $listElementCollection[i].innerText.toLowerCase().includes(keyword)
      ) {
        matchesFound = true;
      }
    }
    if (!matchesFound) {
      $noEntriesFound.classList.remove('hidden');
    }
  }
});
