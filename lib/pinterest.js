const puppeteer = require('puppeteer')
const url = 'https://id.pinterest.com/search/pins/?q='
const scrapy = require('node-scrapy')
const _ = require('underscore')
const path = require('chrome-launcher').Launcher.getInstallations()[0]
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
 * @param  {String} query
 * @returns {Promise} <String> url
 */
module.exports = pint = (query) => new Promise(async(resolve, reject) => {
	let res = []
	let browser = await puppeteer.launch({
		executablePath: path,
        killProcessOnBrowserClose: true,
        chromiumArgs: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ]
	})
	let page = await browser.newPage()
	await page.goto(url+query).catch(e => reject(e))
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
	browser.close()
})