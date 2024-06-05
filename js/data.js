"use strict";
/* exported data */
let data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
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
