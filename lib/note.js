/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-06-13 17:24:58
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-28 20:19:16
 * @ Description: Note crud bos pake lowdb
 */

import appRoot from 'app-root-path'
import { LowSync, JSONFileSync } from 'lowdb'
import lodash from 'lodash'

const adapter = new JSONFileSync(appRoot + '/data/notes.json')
const db = new LowSync(adapter)
db.read()
db.data || (db.data = { chats: [] })
db.write()
db.chain = lodash.chain(db.data)

const inArray = (needle, haystack, element) => {
	if (haystack == undefined) return 0
	let length = haystack.length
	for (let i = 0; i < length; i++) {
		if (eval(`haystack[i].${element}`) == needle) return i
	}
	return 0
}

/**
 * Create note.
 * @param {String} chatId 
 * @param {String} noteName
 * @param {String} content
 * @returns {Promise} `Promise` that resolve `true` if success
 */
const createNote = (chatId, noteName, content) => new Promise((resolve, reject) => {
	try {
        db.read()
		const find = db.chain.get('chats').find({ id: chatId }).value()
		if (find && find.id === chatId) {
			const getNote = db.chain.get('chats').filter({ id: chatId }).map('note').value()[0]
			const isIn = inArray(noteName, getNote, 'name')
			if (isIn) {
				resolve(false)
			} else {
				getNote.push({ name: noteName, content: content})
				db.chain.get('chats').find({ id: chatId }).set('note', getNote).value()
				db.data = db.chain
				db.write()
				resolve(true)
			}
		} else {
			db.chain.get('chats').push({ id: chatId, note: [{ name: noteName, content: content }] }).value()
			db.data = db.chain
			db.write()
			resolve(true)
		}
	} catch (err) {
		reject(err)
	}
})

/**
 * Delete note.
 * @param {String} chatId 
 * @param {String} noteName
 * @returns {Promise} `Promise` that resolve `true` if success
 */
const deleteNote = (chatId, noteName) => new Promise((resolve, reject) => {
	try {
        db.read()
		const find = db.chain.get('chats').find({ id: chatId }).value()
		if (find && find.id === chatId) {
			const getNote = db.chain.get('chats').filter({ id: chatId }).map('note').value()[0]
			const isIn = inArray(noteName, getNote, 'name')
			if (isIn) {
				getNote.splice(isIn, 1)
				db.chain.get('chats').find({ id: chatId }).set('note', getNote).value()
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
 * Get all chats noteName.
 * @param {String} chatId 
 * @returns {Promise} Promise that resolve `noteName[]`
 */
const getNoteName = (chatId) => new Promise((resolve, reject) => {
	try {
        db.read()
		const find = db.chain.get('chats').find({ id: chatId }).value()
		if (find && find.id === chatId) {
			let res = []
			const getNote = db.chain.get('chats').filter({ id: chatId }).map('note').value()[0]
			getNote.forEach(_ => {
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
 * Get note content.
 * @param {String} chatId 
 * @param {String} noteName
 * @returns {Promise} `Data` object
 */
const getNoteData = (chatId, noteName) => new Promise((resolve, reject) => {
	try {
        db.read()
		const getNote = db.chain.get('chats').filter({ id: chatId }).map('note').value()[0]
		const isIn = inArray(noteName, getNote, 'name')
		if (isIn) {
			let data = db.chain.get('chats').filter({ id: chatId }).map(`note[${isIn}]`)
				.find({ name: noteName }).value()
			resolve(data)
		} else {
			resolve(false)
		}
	} catch (err) {
		reject(err)
	}
})
// BY SEROBOT => https://github.com/dngda/bot-whatsapp

export default {
	createNote,
	deleteNote,
	getNoteName,
	getNoteData,
}