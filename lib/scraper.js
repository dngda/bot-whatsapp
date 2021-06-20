/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-05-01 19:29:50
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-21 00:47:14
 * @ Description: Scrape tipis-tipis lah daripada pake api
 */

import ns from 'node-scrapy'
import lodash from 'lodash'
const { sample } = lodash

import axios from 'axios'
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
		await page.click('#submiturl', {
			delay: 300
		})

		await page.waitForSelector('div.snaptik-right', {
			delay: 300
		})
		let d1 = await page.$eval('div.snaptik-right > div > a', (element) => {
			return element.getAttribute("href")
		})
		let d2 = await page.$eval('div.snaptik-right > div > a:nth-child(2)', (element) => {
			return element.getAttribute("href")
		})
		let d3 = await page.$eval('div.snaptik-right > div > a:nth-child(3)', (element) => {
			return element.getAttribute("href")
		})
		if (d1 == undefined) reject(undefined)
		page.close()
		resolve({
			server1: 'https://snaptik.app' + d1,
			server2: d2,
			source: d3
		})
	} catch (err) {
		reject(err)
	}
})

/**
 * Qload scraper/Tiktok mp3
 *
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve obj
 */
const qload = (url) => new Promise(async (resolve, reject) => {
	try {
		let baseUrl = 'https://qload.info/tiktok-audio?link='
		let respon = await axios.get(baseUrl + url)
		let $ = cheerio.load(respon.data)
		let mp3 = $('#download-track-btn').attr('href')
		resolve({ mp3: mp3 })
	} catch (err) {
		reject(err)
	}
})

export default {
	pinterest,
	gimage,
	ssweb,
	ssstik,
	snaptik,
	qload
}