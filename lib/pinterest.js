const url = 'https://id.pinterest.com/search/pins/?q='
const scrapy = require('node-scrapy')
const _ = require('underscore')
const model = {
	lists: [
	'.Collection .Collection-Item',
		{
			img: 'img.GrowthUnauthPinImage__Image (src)'
		}
	]
}

// BY SEROBOT => https://github.com/dngda/bot-whatsapp

/**
 * Search Pinterest
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} <String> url
 */
module.exports = pint = (browser, query) => new Promise(async(resolve, reject) => {
	let res = []
	let page = await browser.newPage()
	await page.goto(url+query).catch(e => reject(e))
	await page.waitForSelector('.Collection', {
	  visible: true,
	})
	await page.content().then((html) => {
		const data = scrapy.extract(html, model)
		if (data.lists === null) return resolve(null)
		else{
			data.lists.forEach(n => {
				res.push(n.img.replace('236x', 'originals'))
			})
		}
		resolve(_.sample(res))
	}).catch(e => reject(e))
	page.close()
})