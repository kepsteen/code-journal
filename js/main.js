'use strict';
const $photoURL = document.querySelector('#photo-url');
const $newEntryImage = document.querySelector('.entry-image');
const $newEntryForm = document.querySelector('#new-entry-form');
const $cardList = document.querySelector('.card-list');
const $entryFormContainer = document.querySelector('#entry-form');
const $entryContainer = document.querySelector('#entry-container');
const $entriesAnchor = document.querySelector('#entries-link');
const $newEntryBtn = document.querySelector('#new-btn');
const $noEntry = document.querySelector('#no-entries-added');
const $titleInput = document.querySelector('#title');
const $notesTextArea = document.querySelector('#notes');
const $pageHeader = document.querySelector('#new-edit-entry');
const $deleteAnchor = document.querySelector('#delete-a');
const $confirmationModal = document.querySelector('#delete-entry-modal');
const $confirmationButtons = document.querySelector('#confirm-btns');
const $searchBar = document.querySelector('#search-bar');
const $noEntriesFound = document.querySelector('#no-entries-found');
const $loginFormContainer = document.querySelector('#login-form-container');
const $loginForm = document.querySelector('#login-form');
const $logoutAnchor = document.querySelector('#login-link');
const $signupFormContainer = document.querySelector('#signup-form-container');
const $redirectSignupBtn = document.querySelector('#redirect-signup-btn');
const $signupForm = document.querySelector('#signup-form');
const $invalidPassword = document.querySelector('#invalid-password');
const $passwordsDontMatch = document.querySelector('#passwords-dont-match');
const $passwordInput = document.querySelector('#password');
const $confirmPasswordInput = document.querySelector('#confirm-password');
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
if (!$loginFormContainer) throw new Error('no login form container found');
if (!$loginForm) throw new Error('No login form element found');
if (!$logoutAnchor) throw new Error('No login anchor found');
if (!$signupFormContainer) throw new Error('No signup form container found');
if (!$redirectSignupBtn) throw new Error('no redirect signup btn found');
if (!$signupForm) throw new Error('No signup form found');
if (!$invalidPassword) throw new Error('no invalid password p found');
if (!$passwordsDontMatch) throw new Error('no pwdsdntmatch found');
if (!$passwordInput || !$confirmPasswordInput)
  throw new Error('pwd inputs not found');
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
  if (
    !$noEntry.classList.contains('hidden') &&
    data.currentUser !== null &&
    data.currentUser.entries.length !== 0
  ) {
    $noEntry.classList.add('hidden');
  } else if (
    data.currentUser !== null &&
    data.currentUser.entries.length === 0 &&
    $noEntry.classList.contains('hidden')
  ) {
    $noEntry.classList.remove('hidden');
  }
}
function viewSwap(view) {
  console.log('view', data.view);
  if ($entryFormContainer.dataset.view === view) {
    $entryFormContainer.setAttribute('class', '');
    $entryContainer.setAttribute('class', 'hidden');
    $loginFormContainer.setAttribute('class', 'hidden');
    $signupFormContainer.setAttribute('class', 'hidden');
  } else if ($entryContainer.dataset.view === view) {
    $entryContainer.setAttribute('class', '');
    $entryFormContainer.setAttribute('class', 'hidden');
    $loginFormContainer.setAttribute('class', 'hidden');
    $signupFormContainer.setAttribute('class', 'hidden');
  } else if ($loginFormContainer.dataset.view === view) {
    $loginFormContainer.setAttribute('class', '');
    $entryFormContainer.setAttribute('class', 'hidden');
    $entryContainer.setAttribute('class', 'hidden');
    $signupFormContainer.setAttribute('class', 'hidden');
  } else if ($signupFormContainer.dataset.view === view) {
    $signupFormContainer.setAttribute('class', '');
    $loginFormContainer.setAttribute('class', 'hidden');
    $entryFormContainer.setAttribute('class', 'hidden');
    $entryContainer.setAttribute('class', 'hidden');
  }
  data.view = view;
}
function deleteEntry(entry) {
  let dataIndexToRemove = null;
  let userIndexToRemove = null;
  if (data.currentUser) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entry.entryId) {
        dataIndexToRemove = i;
      }
    }
    for (let i = 0; i < data.currentUser.entries.length; i++) {
      if (data.currentUser.entries[i].entryId === entry.entryId) {
        userIndexToRemove = i;
      }
    }
  }
  if (dataIndexToRemove !== null && userIndexToRemove !== null) {
    data.entries.splice(dataIndexToRemove, 1);
    data.currentUser?.entries.splice(userIndexToRemove, 1);
    console.log('user entries', data.currentUser.entries);
  }
  if (data.currentUser?.entries.length === 0) {
    toggleNoEntries();
  }
}
function clearList(list) {
  while (list.firstChild) {
    list.firstChild.remove();
  }
}
function checkPassword(password, confirmPassword) {
  let validPassword = false;
  for (let i = 0; i < password.length; i++) {
    if (!isNaN(password[i]) && password.length > 8) {
      console.log('valid password');
      validPassword = true;
      $invalidPassword.classList.remove('hidden');
    }
  }
  if (!validPassword) {
    $invalidPassword.classList.remove('hidden');
  }
  if (password === confirmPassword) {
    validPassword = true;
    $passwordsDontMatch.classList.remove('hidden');
  } else {
    validPassword = false;
    $passwordsDontMatch.classList.add('hidden');
  }
  if (validPassword) return true;
  else return false;
}
document.addEventListener('DOMContentLoaded', () => {
  if (data.currentUser === null) {
    viewSwap('login-form');
  } else {
    viewSwap(data.view);
    toggleNoEntries();
    for (let i = 0; i < data.currentUser.entries.length; i++) {
      $cardList.appendChild(renderEntry(data.currentUser.entries[i]));
    }
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
  const $newEntryFormElements = $newEntryForm.elements;
  if (data.editing === null && data.currentUser !== null) {
    const entry = {
      title: $newEntryFormElements.title.value,
      photoURL: $newEntryFormElements.photoURL.value,
      notes: $newEntryFormElements.notes.value,
      entryId: data.nextEntryId,
      author: data.currentUser.username,
    };
    data.currentUser.entries.unshift(entry); // Need to make sure only logged in users can make new posts
    data.entries.unshift(entry);
    data.nextEntryId++;
    $cardList.prepend(renderEntry(data.entries[0]));
  } else if (data.editing && data.currentUser !== null) {
    const entry = {
      title: $newEntryFormElements.title.value,
      photoURL: $newEntryFormElements.photoURL.value,
      notes: $newEntryFormElements.notes.value,
      entryId: data.editing.entryId,
      author: data.currentUser.username,
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
    for (let i = 0; i < data.currentUser.entries.length; i++) {
      if (data.currentUser.entries[i].entryId === data.editing.entryId) {
        data.currentUser.entries[i] = entry;
      }
    }
  }
  console.log('current user', data.currentUser);
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
  console.log('current user', data.currentUser);
  const $eventTarget = event.target;
  if ($eventTarget.tagName === 'I') {
    viewSwap('entry-form');
    const $eventTargetLi = $eventTarget.closest('li');
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
$confirmationButtons.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  const entry = data.editing;
  if ($eventTarget.id === 'confirm') {
    if (entry !== null) {
      const $listElementToDelete = document.querySelector(
        `li[data-entry-id="${entry.entryId}"]`,
      );
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
  const $listElementCollection = $cardList.children;
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
$loginForm.addEventListener('submit', (event) => {
  console.log('event.target', event.target);
  event.preventDefault();
  clearList($cardList);
  const $loginFormElements = $loginForm.elements;
  const usernameInput = $loginFormElements.username.value;
  const passwordInput = $loginFormElements.password.value;
  for (let user of data.users) {
    if (user.username === usernameInput) {
      console.log('username matches user in the system');
      if (user.password === passwordInput) {
        $loginForm.reset();
        data.currentUser = user;
        console.log('user logged in', data.currentUser);
        for (let entry of data.currentUser.entries) {
          $cardList.appendChild(renderEntry(entry));
        }
        viewSwap('entries');
        toggleNoEntries();
        return;
      } else {
        console.log('password is incorrect');
      }
    }
  }
  console.log('account not found');
});
$logoutAnchor.addEventListener('click', () => {
  if (data.currentUser === null) {
    console.log('you need to log in');
    viewSwap('login-form');
  } else if (data.currentUser) {
    clearList($cardList);
    data.currentUser = null;
    viewSwap('login-form');
    console.log(data);
  }
});
$redirectSignupBtn.addEventListener('click', (event) => {
  console.log('event target', event.target);
  console.log(data.view);
  viewSwap('signup-form');
});
$signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $signupFormElements = $signupForm.elements;
  let user = {
    username: $signupFormElements.username.value,
    email: $signupFormElements.email.value,
    password: $signupFormElements.password.value,
    userId: data.nextUserId,
    entries: [],
  };
  if (
    checkPassword(
      $signupFormElements.password.value,
      $signupFormElements.confirmPassword.value,
    )
  ) {
    data.nextUserId++;
    data.users.push(user);
    data.currentUser = user;
    viewSwap('entries');
  } else {
    return;
  }
});
$passwordInput.addEventListener('input', () => {
  checkPassword($passwordInput.value, $confirmPasswordInput.value);
});
$confirmPasswordInput.addEventListener('input', () => {
  checkPassword($passwordInput.value, $confirmPasswordInput.value);
});
