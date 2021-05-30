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
const pinterest = (browser, query) => new Promise(async (resolve, reject) => {
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
	await page.goto(url + encodeURIComponent(query)).catch(e => reject(e))
	await page.waitForSelector('.Collection', {
		visible: true,
	})
	await page.content().then((html) => {
		const data = scrapy.extract(html, pintModel)
		if (data.lists === null) return resolve(null)
		else {
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
const gimage = (browser, query) => new Promise(async (resolve, reject) => {
	const url = 'https://www.google.com/search?tbm=isch&q='
	let page = await browser.newPage()
	await page.goto(url + encodeURIComponent(query)).catch(e => reject(e))
	await page.content().then((html) => {
		pattrn = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*(jpg|jpeg))/g
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
const ssweb = (browser, path, url) => new Promise(async (resolve, reject) => {
	const page = await browser.newPage()
	await page.setViewport({
		width: 1024,
		height: 768,
	})
	await page.goto(url)
	setTimeout(async () => {
		await page.screenshot({ path: path }).catch(e => reject(e))
		await page.close()
		resolve(true)
	}, 5000)
})

/**
 * Snaptik scraper
 *
 * @param  {Object} puppeteer browser
 * @param  {String} url
 * @returns {Promise} <Object>
 */
const tiktok = (browser, url) => new Promise(async (resolve, reject) => {
	try {
    const page = await browser.newPage()
    await page.goto('https://snaptik.app/')
    await page.type('#url', `${url}`)
    await page.click('#send', { delay: 300 })

    await page.waitForSelector('#download-block > div > a:nth-child(3)', {delay: 300})
    let mp4direct = await page.$eval("#download-block > div > a:nth-child(3)", (element) => {
    return element.getAttribute("href");
    })
    let image = await page.$eval("#div_download > section > div > div > div > article > div.zhay-left.left > img", (element) => {
    return element.getAttribute("src")
    })
    let textInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > p:nth-child(2) > span', el => el.innerText)
    let nameInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > h1 > a', el => el.innerText)
    let timeInfo = await page.$eval('#div_download > section > div > div > div > article > div.zhay-middle.center > p:nth-child(3) > b', el => el.innerText)
    page.close()
    resolve({
        infoname: nameInfo,
        published: timeInfo,
        hastag: textInfo,
        video: mp4direct,
        thumbnail: image,
    })
	}
    catch (err) {reject(err)}
})

module.exports = {
	pinterest,
	gimage,
	ssweb,
	tiktok
}