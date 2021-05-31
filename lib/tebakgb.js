import appRoot from 'app-root-path'
import lodash from 'lodash'
import {LowSync, JSONFileSync} from 'lowdb'
import axios from 'axios'
import Crypto from 'crypto'
import cheerio from 'cheerio'

const { get } = axios
const adapter = new JSONFileSync(appRoot + '/data/tebakgb.json')
const db = new LowSync(adapter)
db.read()
db.data || (db.data = { group: []})
db.chain = lodash.chain(db.data)

const scrapeTebakGambar = () => new Promise((resolve, reject) => {
	let baseUrl = 'https://jawabantebakgambar.net'
	let random = Crypto.randomInt(0, 2000)
	let endpoint = `${baseUrl}/id-${random}.html`

    get(endpoint).then(res => {
        let $ = cheerio.load(res.data)
        let imgUrl = $('div.content > ul.images').find('img').attr('src')
        let ans = $('div.content > ul.images').find('img').attr('alt')?.replace('Jawaban ', '')

        resolve({url : baseUrl+imgUrl, ans: ans})
    }).catch(err => reject(err))
})

/**
 * Get Tebak Gambar object from api and store ans match groupId.
 * @param {String} groupId 
 * @returns {Promise} `TebakGambar` object
 */
const getTebakGambar = (groupId) => new Promise((resolve, reject) => {
	try {
		scrapeTebakGambar().then((res) => {
			let ans = res.ans
			const find = db.chain.get('group').find({ id: groupId }).value()
			if (find && find.id === groupId) {
				db.chain.get('group').find({ id: groupId }).set('ans', ans).value()
				db.write()
				resolve(res)
			} else {
				db.chain.get('group').push({ id: groupId, ans: ans }).value()
				db.write()
				resolve(res)
			}
		}).catch((err) => {
			reject(err)
		})
	} catch (err) { reject(err) }
})

/**
 * Get Ans of Tebak Gambar from database match groupId.
 * @param {String} groupId 
 * @returns {Promise} `Ans` object | `false`
 */
const getAns = (groupId) => new Promise((resolve, reject) => {
	try {
		const find = db.chain.get('group').find({ id: groupId }).value()
		if (find && find.id === groupId) {
			const ans = db.chain.get('group').find({ id: groupId }).value()
			resolve(ans)
		} else {
			resolve(false)
		}
	} catch (err) { reject(err) }
})

/**
 * Delete data from database match groupId.
 * @param {String} groupId 
 * @returns {Promise} Promise resolve `true` if success
 */
const delData = (groupId) => new Promise((resolve, reject) => {
	try {
		const res = db.chain.get('group').remove({ id: groupId }).value()
		db.write()
		if (res.length === 0) resolve(false)
		else resolve(true)
	} catch (err) { reject(err) }
})

// BY SEROBOT -> https://github.com/dngda/bot-whatsapp

export default {
	getTebakGambar,
	getAns,
	delData
}