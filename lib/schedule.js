const schedule = require('node-schedule')

const futureMilis = (client, msg, content, milis) => new Promise(async (resolve, reject) => {
	const when = new Date(Date.now() + milis)
	const job = schedule.scheduleJob(when, function(n) {
		client.sendText(msg.from, n)
	}.bind(null, content))
	resolve(true)
})

module.exports = {
	futureMilis
}