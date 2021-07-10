/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-04-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-11 00:14:53
 * @ Description: List crud bos pake lowdb
 */

import appRoot from 'app-root-path'
import { LowSync, JSONFileSync } from 'lowdb'
import lodash from 'lodash'

const adapter = new JSONFileSync(appRoot + '/data/list.json')
const db = new LowSync(adapter)
db.read()
db.data || (db.data = { chats: [] })
db.write()
db.chain = lodash.chain(db.data)

/**
 * Create list.
 * @param {String} chatId 
 * @param {String} listName
 * @param {String} desc
 * @returns {Promise} `Promise` that resolve `true` if success
 */
const createList = (chatId, listName, desc) => new Promise((resolve, reject) => {
	try {
		const find = db.chain.get('chats').find({ id: chatId }).value()
		if (find && find.id === chatId) {
			const getList = db.chain.get('chats').find({ id: chatId }).value()?.list || []
			const isIn = lodash.findIndex(getList, { name: listName })
			if (isIn != -1) {
				resolve(false)
			} else {
				getList.push({ name: listName, desc: desc, listData: [] })
				db.chain.get('chats').find({ id: chatId }).set('list', getList).value()
				db.data = db.chain
				db.write()
				resolve(true)
			}
		} else {
			db.chain.get('chats').push({ id: chatId, list: [{ name: listName, desc: desc, listData: [] }] }).value()
			db.data = db.chain
			db.write()
			resolve(true)
		}
	} catch (err) {
		reject(err)
	}
})

/**
 * Delete list.
 * @param {String} chatId 
 * @param {String} listName
 * @returns {Promise} `Promise` that resolve `true` if success
 */
const deleteList = (chatId, listName) => new Promise((resolve, reject) => {
	try {
		const find = db.chain.get('chats').find({ id: chatId }).value()
		if (find && find.id === chatId) {
			const getList = db.chain.get('chats').find({ id: chatId }).value()?.list || []
			const isIn = lodash.findIndex(getList, { name: listName })
			if (isIn != -1) {
				getList.splice(isIn, 1)
				db.chain.get('chats').find({ id: chatId }).set('list', getList).value()
				db.data = db.chain
				db.write()
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
 * Get all chat listName.
 * @param {String} chatId 
 * @returns {Promise} Promise that resolve `listName[]`
 */
const getListName = (chatId) => new Promise((resolve, reject) => {
	try {
		const find = db.chain.get('chats').find({ id: chatId }).value()
		if (find && find.id === chatId) {
			let res = []
			const getList = db.chain.get('chats').find({ id: chatId }).value()?.list || []
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
 * @param {String} chatId 
 * @param {String} listName
 * @param {Array} newData
 * @param {Number} Index required if using `delete` action
 * @param {String} action can be `add` or `delete` or `edit`
 * @returns {Promise} `Data` object
 */
const ListData = (chatId, listName, newData, index, action) => new Promise((resolve, reject) => {
	try {
		const getList = db.chain.get('chats').find({ id: chatId }).value()?.list || []
		const isIn = lodash.findIndex(getList, { name: listName })
		if (isIn != -1) {
			let data = db.chain.get('chats').filter({ id: chatId }).map(`list[${isIn}]`)
				.find({ name: listName }).update('listData', n => {
					switch (action) {
						case 'add': {
							return n.concat(newData)
						}
						case 'delete': {
							let temp = n
							temp.splice(index, 1)
							return temp
						}
						case 'edit': {
							let temp = n
							temp.splice(index, 1, newData)
							return temp
						}
					}
				}).value()
				db.data = db.chain
				db.write()
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
 * @param {String} chatId
 * @param {String} listName
 * @param {Array} newData[]
 * @returns {Promise} `Promise` that resolve `listData[]` or `false` if not exist
 */
const addListData = (chatId, listName, newData) => new Promise((resolve, reject) => {
	let res = ListData(chatId, listName, newData, null, 'add').catch(err => {
		reject(err)
	})
	resolve(res)
})

/**
 * get list content of list data.
 * @param {String} chatId
 * @param {String} listName
 * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
 */
const getListData = (chatId, listName) => new Promise((resolve, reject) => {
	let res = ListData(chatId, listName, [], null, 'add').catch(err => {
		reject(err)
	})
	resolve(res)
})

/**
 * remove list content of list data.
 * @param {String} chatId
 * @param {String} listName
 * @param {Number} index
 * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
 */
const removeListData = (chatId, listName, index) => new Promise((resolve, reject) => {
	let res = ListData(chatId, listName, null, index, 'delete').catch(err => {
		reject(err)
	})
	resolve(res)
})

/**
 * edit list content of list data.
 * @param {String} chatId
 * @param {String} listName
 * @param {Number} index
 * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
 */
const editListData = (chatId, listName, newData, index) => new Promise((resolve, reject) => {
	let res = ListData(chatId, listName, newData, index, 'edit').catch(err => {
		reject(err)
	})
	resolve(res)
})

// BY SEROBOT => https://github.com/dngda/bot-whatsapp

export default {
	createList,
	deleteList,
	getListName,
	addListData,
	getListData,
	editListData,
	removeListData
}