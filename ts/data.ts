/* exported data */
interface Credentials {
  username: string;
  email: string;
  password: string;
  entries: Entry[];
  userId: number;
}

interface Data {
  view: string;
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
  users: Credentials[];
  currentUser: null | Credentials;
  nextUserId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
  users: [],
  currentUser: null,
  nextUserId: 1,
};

const testUser: Credentials = {
  username: 'user',
  password: '1',
  email: 'user@user.com',
  entries: [],
  userId: 0,
};

const testUser2: Credentials = {
  username: 'user2',
  password: '1',
  email: 'user@user.com',
  entries: [],
  userId: -1,
};

data.users.push(testUser);
data.users.push(testUser2);

// localStorage.clear();
window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-data', dataJSON);
});

const previousJSON = localStorage.getItem('code-journal-data');
if (previousJSON) {
  const parsedDataJSON = JSON.parse(previousJSON);
  data = parsedDataJSON;
  console.log(data);
}
