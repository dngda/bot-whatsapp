const appRoot = require('app-root-path')
const low = require('lowdb')
const axios = require('axios')
const FileSync = require('lowdb/adapters/FileSync')
const db_tgb = new FileSync(appRoot + '/data/tebakgb.json')
const db = low(db_tgb)
db.defaults({ group: [] }).write()

/**
 * Get Tebak Gambar object from api and store ans match groupId.
 * @param {String} groupId 
 * @returns {Promise} <TebakGambar> object
 */
const getTebakGambar = (groupId) => new Promise((resolve, reject) => {
	try {
		axios.get(`https://videfikri.com/api/tebakgambar/`).then((res) => {
			ans = res.data.result.jawaban
			const find = db.get('group').find({ id: groupId }).value()
			if (find && find.id === groupId) {
				db.get('group').find({ id: groupId }).set('ans', ans).write()
				resolve(res.data.result)
			} else {
				db.get('group').push({ id: groupId, ans: ans }).write()
				resolve(res.data.result)
			}
		}).catch((err) => {
			reject(err)
		})
	} catch (err) { reject(err) }
})

/**
 * Get Ans of Tebak Gambar from database match groupId.
 * @param {String} groupId 
 * @returns {Promise} <Ans> object | Boolean
 */
const getAns = (groupId) => new Promise((resolve, reject) => {
	try {
		const find = db.get('group').find({ id: groupId }).value()
		if (find && find.id === groupId) {
			const ans = db.get('group').find({ id: groupId }).value()
			resolve(ans)
		} else {
			resolve(false)
		}
	} catch (err) { reject(err) }
})

/**
 * Delete data from database match groupId.
 * @param {String} groupId 
 * @returns {Promise} Boolean
 */
const delData = (groupId) => new Promise((resolve, reject) => {
	try {
		const res = db.get('group').remove({ id: groupId }).write()
		if (res.length === 0) resolve(false)
		else resolve(true)
	} catch (err) { reject(err) }
})

// BY SEROBOT -> https://github.com/dngda/bot-whatsapp

module.exports = {
	getTebakGambar,
	getAns,
	delData
}