/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-18 17:45:57
 * @ Description: Fun room crud
 */

import appRoot from 'app-root-path'
import lodash from 'lodash'
import { LowSync, JSONFileSync } from 'lowdb'
import axios from 'axios'
import Crypto from 'crypto'
import cheerio from 'cheerio'
import fs from 'fs'

const { get } = axios
const { apiLol } = JSON.parse(fs.readFileSync(appRoot + '/settings/api.json'))
const adapter = new JSONFileSync(appRoot + '/data/tebak.json')
const db = new LowSync(adapter)
db.read()
db.data = { chats: [] } // refresh every session
db.write()
db.chain = lodash.chain(db.data)

// eslint-disable-next-line no-unused-vars
const scrapeTebakGambar = () => new Promise((resolve, reject) => {
	let baseUrl = 'https://jawabantebakgambar.net'
	let random = Crypto.randomInt(0, 2000)
	let endpoint = `${baseUrl}/id-${random}.html`

	get(endpoint).then(res => {
		let $ = cheerio.load(res.data)
		let imgUrl = $('div.content > ul.images').find('img').attr('src')
		let ans = $('div.content > ul.images').find('img').attr('alt')?.replace('Jawaban ', '')

		resolve({
			result: {
				image: baseUrl + imgUrl,
				answer: ans
			}
		})
	}).catch(err => reject(err))
})

/**
 * Get Tebak Gambar object from api
 * @param {String} chatId 
 * @returns {Promise} `TebakGambar` object
 */
const getTebakGambar = (chatId) => new Promise((resolve, reject) => {
	try {
		// axios.get(`https://lolhuman.herokuapp.com/api/tebak/gambar2?apikey=${apiLol}`)
		scrapeTebakGambar()
			.then((res) => {
				let ans = res.data.result.answer
				saveRoom(chatId, ans)
				resolve(res.data.result)
			}).catch((err) => {
				reject(err)
			})
	} catch (err) { reject(err) }
})

const getTebakKata = (chatId) => new Promise((resolve, reject) => {
	try {
		axios.get(`https://lolhuman.herokuapp.com/api/tebak/kata?apikey=${apiLol}`)
			.then((res) => {
				let ans = res.data.result.jawaban
				saveRoom(chatId, ans)
				resolve(res.data.result)
			})
	} catch (e) {
		reject(e)
	}
})

const getTebakLirik = (chatId) => new Promise((resolve, reject) => {
	try {
		axios.get(`https://lolhuman.herokuapp.com/api/tebak/lirik?apikey=${apiLol}`)
			.then((res) => {
				let ans = res.data.result.answer
				saveRoom(chatId, ans)
				resolve(res.data.result)
			})
	} catch (e) {
		reject(e)
	}
})

const getTebakJenaka = (chatId) => new Promise((resolve, reject) => {
	try {
		axios.get(`https://lolhuman.herokuapp.com/api/tebak/jenaka?apikey=${apiLol}`)
			.then((res) => {
				let ans = res.data.result.answer
				saveRoom(chatId, ans)
				resolve(res.data.result)
			})
	} catch (e) {
		reject(e)
	}
})

/**
 * Save ans of Tebak Room to database match chatId.
 * @param {String} chatId 
 * @returns {Promise} true
 */
const saveRoom = (chatId, ans) => new Promise((resolve, reject) => {
	try {
		const find = db.chain.get('chats').find({ id: chatId }).value()
		if (find && find.id === chatId) {
			db.chain.get('chats').find({ id: chatId }).set('ans', ans).value()
			db.write()
			resolve(true)
		} else {
			db.chain.get('chats').push({ id: chatId, ans: ans }).value()
			db.write()
			resolve(true)
		}
	} catch (e) {
		reject(e)
	}
})

/**
 * Get Ans of Tebak Room from database match chatId.
 * @param {String} chatId 
 * @returns {Promise} `Ans` object | `false`
 */
const getAns = (chatId) => new Promise((resolve, reject) => {
	try {
		const find = db.chain.get('chats').find({ id: chatId }).value()
		if (find && find.id === chatId) {
			const ans = db.chain.get('chats').find({ id: chatId }).value()
			resolve(ans)
		} else {
			resolve(false)
		}
	} catch (err) { reject(err) }
})

/**
 * Check room if exist from database match chatId.
 * @param {String} chatId 
 * @returns {Promise<Boolean>} true/false
 */
const isRoomExist = async (chatId) => !!(await getAns(chatId))

/**
 * Delete Room data from database match chatId.
 * @param {String} chatId 
 * @returns {Promise} Promise resolve `true` if success
 */
const delRoom = (chatId) => new Promise((resolve, reject) => {
	try {
		const res = db.chain.get('chats').remove({ id: chatId }).value()
		db.write()
		if (res.length === 0) resolve(false)
		else resolve(true)
	} catch (err) { reject(err) }
})

// BY SEROBOT -> https://github.com/dngda/bot-whatsapp

export default {
	getTebakGambar,
	getTebakJenaka,
	getTebakLirik,
	getTebakKata,
	isRoomExist,
	delRoom,
	getAns
}