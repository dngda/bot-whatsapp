const url = 'https://www.google.com/search?tbm=isch&q='
const _ = require('underscore')
// BY SEROBOT => https://github.com/dngda/bot-whatsapp
/**
 * Search Google image
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} <String> url
 */
module.exports = gimage = (browser, query) => new Promise(async(resolve, reject) => {
	let page = await browser.newPage()
	await page.goto(url+query).catch(e => reject(e))
	await page.content().then((html) => {
		pattrn = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*(jpg|png))/g
		res = html.match(pattrn)
		resolve(_.sample(res))
	}).catch(e => reject(e))
	page.close()
})