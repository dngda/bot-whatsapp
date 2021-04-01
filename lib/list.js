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
 * @returns {Promise} <Boolean>
 */
const createList = (groupId, listName) => new Promise((resolve, reject) => {
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
		}
		else {
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
		}
		else {
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
 * @param {Array | Number} listContentData[] | index
 * @param {Boolean} is action either remove or not
 * @returns {Promise} <listData> object
 */
const ListData = (groupId, listName, listContentDataOrIndex, isRemove) => new Promise((resolve, reject) => {
	try {
		const getList = db.get('group').filter({ id: groupId }).map('list').value()[0]
		const isIn = inArray(listName, getList, 'name')
		if (isIn !== false) {
			let data = db.get('group').filter({ id: groupId }).map(`list[${isIn}]`)
				.find({ name: listName }).update('listData', n => {
					if (isRemove) {
						let data = n
						data.splice(listContentDataOrIndex, 1)
						return data
					} else return n.concat(listContentDataOrIndex)
				}).write()
			resolve(data.listData)
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
 * @param {Array} listContentData[]
 * @returns {Promise} <listData> object or <Boolean> false if not exist
 */
const addListData = (groupId, listName, listContentData) => new Promise((resolve, reject) => {
	let res = ListData(groupId, listName, listContentData, false).catch(err => {
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
	let res = ListData(groupId, listName, [], false).catch(err => {
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
	let res = ListData(groupId, listName, index, true).catch(err => {
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
	removeListData
}