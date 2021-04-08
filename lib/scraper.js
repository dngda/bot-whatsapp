const scrapy = require('node-scrapy')
const _ = require('underscore')

// BY SEROBOT => https://github.com/dngda/bot-whatsapp

/**
 * Search Pinterest
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} <String> url
 */
const pinterest = (browser, query) => new Promise(async(resolve, reject) => {
	const url = 'https://id.pinterest.com/search/pins/?q='
	const pintModel = {
		lists: [
		'.Collection .Collection-Item',
			{
				img: 'img.GrowthUnauthPinImage__Image (src)'
			}
		]
	}
	let res = []
	let page = await browser.newPage()
	await page.goto(url+query).catch(e => reject(e))
	await page.waitForSelector('.Collection', {
	  visible: true,
	})
	await page.content().then((html) => {
		const data = scrapy.extract(html, pintModel)
		if (data.lists === null) return resolve(null)
		else{
			data.lists.forEach(n => {
				res.push(n.img.replace('236x', 'originals'))
			})
		}
		resolve(_.sample(res))
	}).catch(e => reject(e))
	await page.close()
})

/**
 * Search Google image
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} <String> url
 */
const gimage = (browser, query) => new Promise(async(resolve, reject) => {
const url = 'https://www.google.com/search?tbm=isch&q='
	let page = await browser.newPage()
	await page.goto(url+query).catch(e => reject(e))
	await page.content().then((html) => {
		pattrn = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*(jpg|png))/g
		res = html.match(pattrn)
		resolve(_.sample(res))
	}).catch(e => reject(e))
	await page.close()
})

/**
 * Screenshot web
 *
 * @param  {Object} puppeteer browser
 * @param  {String} url
 * @returns {Promise} <Boolean> true
 */
const ssweb = (browser, path, url) => new Promise(async(resolve, reject) => {
	const page = await browser.newPage()
	await page.setViewport({
	    width: 1024,
	    height: 768,
	})
	await page.goto(url)
	await page.screenshot({ path: path}).catch(e => reject(e))

	await page.close()
	resolve(true)
})

module.exports = {
	pinterest,
	gimage,
	ssweb
}