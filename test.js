const {createList, deleteList, getListName, addListData, getListData, removeListData} = require('./lib/list.js')

addListData('21313132', 'mantap', ['enak']).then( _ => {
    console.log(`add ${_}`)
})

getListData('21313132', 'tugas').then(_ => {
    console.log(`get ${_}`)
})

removeListData('123132213', 'mantap', 1).then(_ => {
    console.log(`remove ${_}`)
})