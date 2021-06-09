import ns from 'node-scrapy'
import lodash from 'lodash'
const { sample } = lodash

import fetch from 'node-fetch'
import cheerio from 'cheerio'
import FormData from 'form-data'

const {
	extract
} = ns

// BY SEROBOT => https://github.com/dngda/bot-whatsapp

/**
 * Search Pinterest
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} `Promise` resolve url
 */
const pinterest = (browser, query) => new Promise(async (resolve, reject) => {
	const url = 'https://id.pinterest.com/search/pins/?q='
	const pintModel = {
		lists: [
			'.Collection .Collection-Item', {
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
		const data = extract(html, pintModel)
		if (data.lists === null) return resolve(null)
		else {
			data.lists.forEach(n => {
				res.push(n.img.replace('236x', 'originals'))
			})
		}
		resolve(sample(res))
	}).catch(e => reject(e))
	await page.close()
})

/**
 * Search Google image
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} `Promise` that resolve url of image
 */
const gimage = (browser, query) => new Promise(async (resolve, reject) => {
	const url = 'https://www.google.com/search?tbm=isch&q='
	let page = await browser.newPage()
	await page.goto(url + encodeURIComponent(query)).catch(e => reject(e))
	await page.content().then((html) => {
		let pattrn = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*(jpg|jpeg))/g
		let res = html.match(pattrn)
		resolve(sample(res))
	}).catch(e => reject(e))
	await page.close()
})

/**
 * Screenshot web
 *
 * @param  {Object} puppeteer browser
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve `true`
 */
const ssweb = (browser, path, url) => new Promise(async (resolve, reject) => {
	const page = await browser.newPage()
	await page.setViewport({
		width: 1366,
		height: 1080,
	})
	await page.goto(url)
	setTimeout(async () => {
		await page.screenshot({
			path: path
		}).catch(e => reject(e))
		await page.close()
		resolve(true)
	}, 5000)
})

/**
 * Ssstik scraper
 *
 * @param  {Object} puppeteer browser
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve obj
 */
const ssstik = (browser, url) => new Promise(async (resolve, reject) => {
	try {
		const page = await browser.newPage()
		let baseUrl = 'https://ssstik.io'

		await page.goto(baseUrl)
		await page.type('#main_page_text', `${url}`)
		await page.click('#submit', {
			delay: 300
		})

		await page.waitForSelector('#target > div > div.result_overlay', {
			delay: 300
		})
		let mp4 = await page.$eval('#target > div > div.result_overlay > a.without_watermark', (element) => {
			return element.getAttribute('href')
		})
		let mp3 = await page.$eval('#target > div > div.result_overlay > a.music', (element) => {
			return element.getAttribute('href')
		})

		resolve({
			mp4: baseUrl + mp4,
			mp3: mp3
		})
		page.close()
	} catch (err) {
		reject(err)
	}
})

/**
 * Snaptik scraper
 *
 * @param  {Object} puppeteer browser instance
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve obj
 */
const snaptik = (browser, url) => new Promise(async (resolve, reject) => {
	try {
		const page = await browser.newPage()
		await page.goto('https://snaptik.app/')
		await page.type('#url', `${url}`)
		await page.click('#send', {
			delay: 300
		})

		await page.waitForSelector('#download-block > div > a:nth-child(3)', {
			delay: 300
		})
		let mp4direct = await page.$eval("#download-block > div > a:nth-child(3)", (element) => {
			return element.getAttribute("href")
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
	} catch (err) {
		reject(err)
	}
})

/**
 * Snaptik scraper
 *
 * @param {String} url
 * @param {Object} options - Options (optional), not recommended. example {"user_agent": "GoogleBot"}.
 * @returns {Promise} `Promise` that resolve obj
 */
const snaptikLight = (url, options = {}) => new Promise(async (resolve, reject) => {
	!options.user_agent ?
		(options.user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36") :
		options.user_agent
	const form = new FormData()
	form.append("url", encodeURI(url))

	const scrape = await fetch("https://snaptik.app/action.php", {
		method: "POST",
		headers: {
			Accept: "/",
			"Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,da;q=0.6,mt;q=0.5",
			"User-Agent": options.user_agent,
			origin: "https://snaptik.app",
			referer: "https://snaptik.app/",
			...form.getHeaders(),
		},
		body: form.getBuffer(),
	}).catch(e => reject(e))

	let html = await scrape.text()
	let $ = cheerio.load(html)

	let d1 = $("div[class=abuttons]").find("a").attr("href");
	let d2 = $("div[class=abuttons]")
		.find("a[title='Download Server 02']")
		.attr("href")
	let d3 = $("div[class=abuttons]")
		.find("a[title='Download Server 03']")
		.attr("href")
	let d4 = $("div[class=abuttons]")
		.find("a[target='_blank']")
		.attr("href")

	let res = new Object()
	if (d1 == undefined || d2 == undefined) reject(undefined)
	res.server1 = 'https://snaptik.app' + d1
	res.server2 = 'https://snaptik.app' + d2
	res.server3 = d3
	res.source = d4
	resolve(res)
})

export default {
	pinterest,
	gimage,
	ssweb,
	ssstik,
	snaptik,
	snaptikLight
}