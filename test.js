const { editListData, addListData, removeListData } = require('./lib/list')

editListData('231231212313@c.us', 'namaListnyaCOK', 'asucuk', 3).then(n => console.log(n))
// addListData('231231212313@c.us', 'namaListnyaCOK', 'asu').then(n => console.log(n))
// removeListData('231231212313@c.us', 'namaListnyaCOK', 1).then(n => console.log(n))