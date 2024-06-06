/* exported data */

interface Data {
  view: string;
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
  currentUser: null | string;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
  currentUser: null,
};

window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-data', dataJSON);
});

const previousJSON = localStorage.getItem('code-journal-data');
if (previousJSON) {
  const parsedDataJSON = JSON.parse(previousJSON);
  data = parsedDataJSON;
}
