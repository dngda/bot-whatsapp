/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-25 13:48:13
 * @ Description: Cron not cron job message wkwkw
 */

import { scheduleJob } from 'node-schedule'
import appRoot from 'app-root-path'
import { LowSync, JSONFileSync } from 'lowdb'
import lodash from 'lodash'

// Use JSON file for storage
const adapter = new JSONFileSync(appRoot + '/data/schedule.json')
const db = new LowSync(adapter)
db.read()
db.data || (db.data = { jobs: [] })
db.write()
db.chain = lodash.chain(db.data)

const futureMilis = (client, msg, content, milis, isQuoted) => new Promise((resolve, reject) => {
	const when = new Date(Date.now() + milis)
	if (when == null || when == 'null') reject(`futureMilis returned` + false)
	scheduleJob(when, async function (txt) {
		await sendMsg(client, isQuoted, msg.from, txt, isQuoted ? msg.quotedMsgObj.id : null).catch(e => reject(e))
		delJob(msg.from, when)

	}.bind(null, content))
	const quotedId = isQuoted ? msg.quotedMsgObj.id : null
	saveJob(msg.from, quotedId, content, when, isQuoted)
	resolve(true)
})

const loadJob = (client, from, quotedId, content, date, isQuoted) => new Promise((resolve, reject) => {
	var now = new Date()
	var dateJob = new Date(date)
	if (dateJob === null) reject(`loadJob returned` + false)
	if (dateJob <= now || dateJob === null) {
		delJob(from, date)
		resolve(true)
	}
	scheduleJob(dateJob, async function (txt) {
		await sendMsg(client, isQuoted, from, txt, quotedId).catch(e => reject(e))
		delJob(from, date)

	}.bind(null, content))
	resolve(true)
})

const sendMsg = (client, isQuoted, from, txt, quotedId) => new Promise((resolve, reject) => {
	var content = txt.replace(/@\d+/g, '')
	if (!isQuoted) {
		client.sendText(from, content).catch(e => reject(e))
	} else {
		client.reply(from, content, quotedId).catch(e => reject(e))
	}
	const mentions = txt.trim().match(/@\d+/g) ?? 0
	if (mentions !== 0) {
		let res = 'Mentions: '
		mentions.forEach(m => {
			res += `${m} `
		})
		client.sendTextWithMentions(from, res).catch(e => reject(e))
	}
	console.log(color('[LOGS]', 'grey'), `ScheduledJob from ${from} Launched`)
	resolve(true)
})

const delJob = (from, date) => new Promise((resolve, reject) => {
	try {
		const res = db.chain.get('jobs').remove({ from: from, date: date }).value()
		db.write()
		resolve(res)
	} catch (e) {
		reject(e)
	}
})

const saveJob = (from, quotedId, content, date, isQuoted) => new Promise((resolve, reject) => {
	try {
		const res = db.chain.get('jobs').push({
			from: from,
			quotedId: quotedId,
			content: content,
			date: date,
			isQuoted: isQuoted
		}).value()
		db.write()
		resolve(res)
	} catch (e) {
		reject(e)
	}
})

export default {
	futureMilis,
	loadJob
}