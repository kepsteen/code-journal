'use strict';
/* exported data */
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  console.log('dataJSON', dataJSON);
  localStorage.setItem('code-journal-data', dataJSON);
});
const previousJSON = localStorage.getItem('code-journal-data');
if (previousJSON) {
  let parsedDataJSON = JSON.parse(previousJSON);
  console.log(parsedDataJSON);
  data = parsedDataJSON;
}
