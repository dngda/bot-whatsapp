const {createList, deleteList, getListName, addListData, getListData, removeListData} = require('./lib/list.js')

getListName('213131132').then( _ => {
    console.log(_)
})