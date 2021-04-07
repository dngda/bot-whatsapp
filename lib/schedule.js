const schedule = require('node-schedule')
const appRoot = require('app-root-path')
const low = require('lowdb')
const { color } = require('../utils')
const FileSync = require('lowdb/adapters/FileSync')
const db_job = new FileSync(appRoot + '/data/schedule.json')
const db = low(db_job)
db.defaults({ job: [] }).write()

const futureMilis = (client, msg, content, milis, isQuoted) => new Promise(async (resolve, reject) => {
	const when = new Date(Date.now() + milis)
	const job = schedule.scheduleJob(when, async function(txt) {
		await sendMsg(client, isQuoted, msg.from, txt, isQuoted ? msg.quotedMsgObj.id : null).catch(e => reject(e))
		delJob(msg.from, when)

	}.bind(null, content))
	const quotedId = isQuoted ? msg.quotedMsgObj.id : null
	saveJob(msg.from, quotedId, content, when, isQuoted)
	resolve(true)
})

const loadJob = (client, from, quotedId, content, date, isQuoted) => new Promise(async (resolve, reject) => {
	var now = new Date()
	var dateJob = new Date(date)
	if (dateJob <= now) {
		delJob(from, date)
		resolve(true)
	}
	const job = schedule.scheduleJob(dateJob, async function(txt) {
		await sendMsg(client, isQuoted, from, txt, quotedId).catch(e => reject(e))
		await delJob(from, date)

	}.bind(null, content))
	resolve(true)
})

const sendMsg = (client, isQuoted, from, txt, quotedId) => new Promise(async (resolve, reject) => {
		if (!isQuoted) {
			await client.sendText(from, txt).catch(e => reject(e))
		} else {
			await client.reply(from, txt, quotedId).catch(e => reject(e))
		}
		console.log(color('[LOGS]', 'grey'), `ScheduledJob from ${from} Launched`)

		const mentions = txt.match(/@\w+/g) | []
		if(mentions.length !== 0){
			let res = '╔══✪〘 Mentions 〙✪\n'
			mentions.forEach(m => {
				res += '╠➥'
				res += ` ${m}\n`
			})
			res += '╚═〘 *SeroBot* 〙'
			await client.sendTextWithMentions(from, res)
		}
})

const delJob = (from, date) => new Promise((resolve, reject) => {
	try{
		const res = db.get('job').remove({ from:from, date: date }).write()
		resolve(res)
	}catch (e) {
		reject(e)
	}
})

const saveJob = (from, quotedId, content, date, isQuoted) => new Promise((resolve, reject) => {
	try{
		const res = db.get('job').push({
			from: from,
			quotedId: quotedId,
			content: content,
			date: date,
			isQuoted: isQuoted
		}).write()
		resolve(res)
	}catch (e) {
		reject(e)
	}
})

module.exports = {
	futureMilis,
	loadJob
}