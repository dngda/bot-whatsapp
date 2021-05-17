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

/**
 * Create list.
 * @param {String} groupId 
 * @param {String} listName
 * @param {String} desc
 * @returns {Promise} <Boolean>
 */
const createList = (groupId, listName, desc) => new Promise((resolve, reject) => {
	try {
		const find = db.get('group').find({ id: groupId }).value()
		if (find && find.id === groupId) {
			const getList = db.get('group').filter({ id: groupId }).map('list').value()[0]
			const isIn = inArray(listName, getList, 'name')
			if (isIn !== false) {
				resolve(false)
			} else {
				getList.push({ name: listName, desc: desc, listData: [] })
				db.get('group').find({ id: groupId }).set('list', getList).write()
				resolve(true)
			}
		} else {
			db.get('group').push({ id: groupId, list: [{ name: listName, desc: desc, listData: [] }] }).write()
			resolve(true)
		}
	} catch (err) {
		reject(err)
	}
})

/**
 * Delete list.
 * @param {String} groupId 
 * @param {String} listName
 * @returns {Promise} <Boolean>
 */
const deleteList = (groupId, listName) => new Promise((resolve, reject) => {
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
		} else {
			resolve(false)
		}
	} catch (err) {
		reject(err)
	}
})

/**
 * Get all group listName.
 * @param {String} groupId 
 * @returns {Promise} <listName[]>
 */
const getListName = (groupId) => new Promise((resolve, reject) => {
	try {
		const find = db.get('group').find({ id: groupId }).value()
		if (find && find.id === groupId) {
			let res = []
			const getList = db.get('group').filter({ id: groupId }).map('list').value()[0]
			getList.forEach(_ => {
				res.push(_.name)
			})
			resolve(res)
		} else {
			resolve(false)
		}
	} catch (err) {
		reject(err)
	}
})

/**
 * Manipulate list.
 * @param {String} groupId 
 * @param {String} listName
 * @param {Array} newData
 * @param {Integer} Index?
 * @param {String} action
 * @returns {Promise} <Data> object
 */
const ListData = (groupId, listName, newData, index, action) => new Promise((resolve, reject) => {
	try {
		const getList = db.get('group').filter({ id: groupId }).map('list').value()[0]
		const isIn = inArray(listName, getList, 'name')
		if (isIn !== false) {
			let data = db.get('group').filter({ id: groupId }).map(`list[${isIn}]`)
				.find({ name: listName }).update('listData', n => {
					switch (action) {
						case 'add': {
							return n.concat(newData)
						}
						case 'delete': {
							let data = n
							data.splice(index, 1)
							return data
						}
						case 'edit': {
							let data = n
							data.splice(index, 1, newData)
							return data
						}
					}
				}).write()
			resolve(data)
		} else {
			resolve(false)
		}
	} catch (err) {
		reject(err)
	}
})

/**
 * Add list content to list data.
 * @param {String} groupId
 * @param {String} listName
 * @param {Array} newData[]
 * @returns {Promise} <listData> object or <Boolean> false if not exist
 */
const addListData = (groupId, listName, newData) => new Promise((resolve, reject) => {
	let res = ListData(groupId, listName, newData, null, 'add').catch(err => {
		reject(err)
	})
	resolve(res)
})

/**
 * get list content of list data.
 * @param {String} groupId
 * @param {String} listName
 * @returns {Promise} <listContentData[]> or <Boolean> false if not exist
 */
const getListData = (groupId, listName) => new Promise((resolve, reject) => {
	let res = ListData(groupId, listName, [], null, 'add').catch(err => {
		reject(err)
	})
	resolve(res)
})

/**
 * remove list content of list data.
 * @param {String} groupId
 * @param {String} listName
 * @param {Number} index
 * @returns {Promise} <listContentData[]> or <Boolean> false if not exist
 */
const removeListData = (groupId, listName, index) => new Promise((resolve, reject) => {
	let res = ListData(groupId, listName, null, index, 'delete').catch(err => {
		reject(err)
	})
	resolve(res)
})

/**
 * edit list content of list data.
 * @param {String} groupId
 * @param {String} listName
 * @param {Number} index
 * @returns {Promise} <listContentData[]> or <Boolean> false if not exist
 */
const editListData = (groupId, listName, newData, index) => new Promise((resolve, reject) => {
	let res = ListData(groupId, listName, newData, index, 'edit').catch(err => {
		reject(err)
	})
	resolve(res)
})

// BY SEROBOT => https://github.com/dngda/bot-whatsapp

module.exports = {
	createList,
	deleteList,
	getListName,
	addListData,
	getListData,
	editListData,
	removeListData
}