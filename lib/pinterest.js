const puppeteer = require('puppeteer')
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
let browser
let page
/**
 * Search Pinterest
 *
 * @param  {String} query
 */
module.exports = pint = (query) => new Promise(async(resolve, reject) => {
	// let res = []
	// browser = await puppeteer.launch()
	// page = await browser.newPage()
	// await page.goto(url+query).catch(e => reject(e))
	// await page.content().then((html) => {
	// 	const data = scrapy.extract(html, model)
	// 	if (data.lists === null) return resolve(null)
	// 	else{
	// 		data.lists.forEach(n => {
	// 			res.push(n.img.replace('236x', 'originals'))
	// 		})
	// 	}
	// 	resolve(_.sample(res))
	// }).catch(e => reject(e))
	// browser.close()
})