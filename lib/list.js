const appRoot = require('app-root-path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db_list = new FileSync(appRoot + '/data/list.json')
const db = low(db_list)
db.defaults({ group: [] }).write()

const inArray = (needle, haystack, element) => {
	let length = haystack.length;
	for (let i = 0; i < length; i++) {
		if (eval(`haystack[i].${element}`) == needle) return i
	}
	return false
}

const createList = async (groupId, listName) => new Promise((resolve, reject) => {
	try {
		const find = db.get('group').find({ id: groupId }).value()
		if (find && find.id === groupId) {
			const getList = db.get('group').filter({ id: groupId }).map('list').value()[0]
			const isIn = inArray(listName, getList, 'name')
			if (isIn !== false) {
				resolve(false)
			} else {
				getList.push({ name: listName, listData: [] })
				db.get('group').find({ id: groupId }).set('list', getList).write()
				resolve(true)
			}
		}
		else {
			db.get('group').push({ id: groupId, list: [{ name: listName, listData: [] }] }).write()
			resolve(true)
		}
	} catch (err) {
		reject(err)
	}
})

const deleteList = async (groupId, listName) => new Promise((resolve, reject) => {
	try {
		const find = db.get('group').find({ id: groupId }).value()
		if (find && find.id === groupId) {
			const getList = db.get('group').filter({ id: groupId }).map('list').value()[0]
			const isIn = inArray(listName, getList, 'name')
			if (isIn !== false) {
				getList.splice(isIn, 1)
				db.get('group').find({ id: groupId }).set('list', getList).write()
				resolve(true)
			} else {
				resolve(false)
			}
		}
		else {
			resolve(false)
		}
	} catch (err) {
		reject(err)
	}
})

const getListName = async (groupId) => new Promise((resolve, reject) => {
	try {
		const find = db.get('group').find({ id: groupId }).value()
		if (find && find.id === groupId) {
			let res = ''
			const getList = db.get('group').filter({ id: groupId }).map('list').value()[0]
			getList.forEach(_ => {
				res = res + `${_.name} `
			})
			resolve(res)
		}
		else {
			resolve(false)
		}
	} catch (err) {
		reject(err)
	}
})

const ListData = async (groupId, listName, listDataOrIndex, isRemove) => new Promise((resolve, reject) => {
	try {
		const getList = db.get('group').filter({ id: groupId }).map('list').value()[0]
		const isIn = inArray(listName, getList, 'name')
		if (isIn !== false) {
			let data = db.get('group').filter({ id: groupId }).map(`list[${isIn}]`)
				.find({ name: listName }).update('listData', n => {
					if (isRemove) {
						let data = n
						data.splice(listDataOrIndex, 1)
						return data
					} else return n.concat(listDataOrIndex)
				}).write()
			resolve(data.listData)
		} else {
			resolve(false)
		}
	} catch (err) {
		reject(err)
	}
})

const addListData = async (groupId, listName, listData) => new Promise((resolve, reject) => {
	let res = ListData(groupId, listName, listData, false).catch(err => {
		reject(err)
	})
	resolve(res)
})

const getListData = async (groupId, listName) => new Promise((resolve, reject) => {
	let res = ListData(groupId, listName, [], false).catch(err => {
		reject(err)
	})
	resolve(res)
})

const removeListData = async (groupId, listName, index) => new Promise((resolve, reject) => {
	let res = ListData(groupId, listName, index, true).catch(err => {
		reject(err)
	})
	resolve(res)
})

module.exports = {
	createList,
	deleteList,
	getListName,
	addListData,
	getListData,
	removeListData
}