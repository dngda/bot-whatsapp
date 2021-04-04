const schedule = require('node-schedule')

const futureMilis = (client, msg, content, milis, isQuoted) => new Promise(async (resolve, reject) => {
	const when = new Date(Date.now() + milis)
	const job = schedule.scheduleJob(when, function(n) {
		if (!isQuoted) client.sendText(msg.from, n)
			else client.reply(msg.from, n, msg.quotedMsgObj.id)
	}.bind(null, content))
	resolve(true)
})

module.exports = {
	futureMilis
}