let {
	createList,
	deleteList,
	getListName,
	addListData,
	getListData,
	removeListData
} = require('./lib/list.js')

addListData('231231212313@c.us', 'namaListnyaCOK', ['isi listnya 1', 'isi listnya 2', 'isi listnya 3']).then(n => {
	console.log(n)
})