/* eslint-disable no-async-promise-executor */
/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-05-01 19:29:50
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-19 09:55:14
 * @ Description: Scrape tipis-tipis lah daripada pake api
 */

import lodash from "lodash"
const { sample } = lodash

import axios from "axios"
import cheerio from "cheerio"

// BY SEROBOT => https://github.com/dngda/bot-whatsapp


/**
 * Search KBBI
 *
 * @param  {String} query
 * @returns {Promise} <String> arti
 */
const kbbi = async (query) => new Promise((resolve, reject) => {
	const url = 'https://kbbi.web.id/'

	axios.get(url + query).then(res => {
		const $ = cheerio.load(res.data)
		const arti = $('div#d1').text().trim()
		resolve(arti)
	}).catch(reject)
})

/**
 * Search Pinterest using puppeteer
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} `Promise` resolve url
 */
const pinterest = (browser, query) => new Promise(async (resolve, reject) => {
	const url = "https://id.pinterest.com/search/pins/?rs=typed&q="
	let page = await browser.newPage()
	await page.goto(url + encodeURIComponent(query)).catch((e) => reject(e))
	await page.waitForSelector(".Collection", {
		visible: true,
	})
	let resu = await page.$$eval(`img.GrowthUnauthPinImage__Image`, (e) => {
		return e.map(el => {
			return el.getAttribute("src").replace("236x", "originals")
		})
	})
	resolve(resu)
	await page.close()
})
// By RA awokoawk
const pinterestLight = (querry) => new Promise((resolve, reject) => {
	let ress = {}
	axios.get(`https://id.pinterest.com/search/pins/?q=` + querry, {
		headers: {
			"sec-ch-ua": "\"Chromium\";v=\"90\", \"Opera GX\";v=\"76\", \";Not A Brand\";v=\"99\"",
			"sec-ch-ua-mobile": "?0",
			"upgrade-insecure-requests": "1",
			"cookie": "csrftoken=ebe0be3a93cea6072be18633add953a2; _b=\"AVezvd6F4UtE24FUsA6INxipyZZDoSpyCc5vaJK4QDYXmExosVEc4h6WkiKhlVtQ430=\"; cm_sub=denied; fba=True; _ga=GA1.2.862909259.1620474446; g_state={\"i_l\":0}; _auth=1; _pinterest_sess=TWc9PSZ0VEZqZmdDSlJYaGU5REIvNklIcVlnMjE5b0ZraTE5REJVQ0JiMUwxTkZZaGFoVk1sRDVhOFlwQzhkQnQ0YkMwRlNyV0lIWUFlK0ZVTkVxYUhKNmlvZ0R1UXlQYTBRRVVhMU1yYkpmcXpHK3UyNjNhckRqUFFOYVJVa3RnVmJtVzd2MmRGaHFMZUpLNVhtaHptTDhWSnBSdXhZY0FhRnRTN3J1S0V4cGtsVTBxeE54NkF2blVNSFV3R0NTQTR1bVVNRURGVGdnYlN5UjdBbk9YcHVGbGI3a1kwd1dEZDgrZVM1SDc3V0pJMm00OWxKUDVNQjBLVlFocTB4Mjg1M1RnbGxBaFAxbS9MTnVzei91cEQvcjBtakp6N0ZnU2t1Y3NxWW1DRDV1Q3h0ankvQ3FEWGh3MXczcXBHNXJpYVNCMHB6dUoxMGF6ZzVxN2VqQVBoSElSd0tiQk41ZVRPQXlOaGNpNzVQMWJSeVZJbCtYYVMxQ1ZRUFUwalU3eGVzMGRySlNzdWo1NG5uaXNFM3ZpT0o0TkZHR1daUXlwaXFQclMwa04raW9xVnVaTTRSVGEzTE03TVlZcmZYVDd5UmVPd2lZaGw4aE9VMHJBd0tidEsrcHdPWk96RlFMekVLTzY3VU1PL0tIYUdwUE1IWVdJNnJXalBkU09Sb3dEaHlQVVR1T1RqNW5Sc2FRdmVkZmhkMk9HNHBCL0ZpZ3NMdmZvVW9ReVltTFBCTlNLWHpray9LNWJ2UTNvTlBzVm9aZjRvYWRvRFhla0dBNzdveWJVYXZmVFp2cnFFNU5DYUVwSHhxeDlIajNIVTlHaEVYdGptWm5mSGVSRmtIMmQwVVVVZlVCVEh6UHB3TnBtdWV0b2l6L3VTc3pXMXFGN3lHS3ZJM3BwL0NrWVJDMm1HY2tROGxuQVFRNS9OUW45R3dtSk8zeFJidVFSTG1qTG5PelAvKzd3T3lrN1NoKzBHVGNTY1pGSEY0bW8xcGVmc3NtclBhTWE2QUMxOXNpQWUwRmo4UHl0ZGpwUzhUQXVhbjYwT0ZJeHhHai8yOWFUVTA1Wkx2czN4VSttLzMvbkFVQ2svWnZvNC9xZ3E4VkhYSFZ5elo4TzhtU0o5c3ZDcEJyYjE3QVI1WHlmTTFhWThvWHQ1T0tSTWRsWnI3a1lpU245dEVLd1lZSXRremtkTUZmcVA2YUg0c1UrSk1JOWJVRzZpcWd3T0NVaFZkdUh3UUdURi9sbDBqT2pBZVV2ZnlTQzc5ZnBMYkFMQ1ZsWjdIYWcmaDc1Uk5kK2I4MjFMUXBaVUthci9rVHpCUWRvPQ==; _pinterest_cm=\"TWc9PSYxZnpkMS9XN29Rd2R0TnpBN0RzVktja1J4NUtINUJqRzNGODFXS0xES1pndWlNVm52a0d3V0JocmVIS3p5eDdnNXNZa0hGelNQNDBSTFRId3ZhTFFIQjRGOW1lNlJZMzFiVlg1MHhSOFpmMGhRZUoySUpJZDIyWlVYMjRXNHRaL1lodFl4eW1jWjNyTklpbytYbHZyd29nRm5DY0pQOGgyUWpDdk9zQ1craXR5VEZoNHV4ZzRnOXV4SUFFSStYZCsmT08zMFI1bktXa3pwSDFtK3NNRWpxWWNpQzNzPQ==\"; _routing_id=\"595f24cd-7f4c-4495-aa67-37212d099cd8\"; sessionFunnelEventLogged=1"
		}
	}).then(res => {
		const $ = cheerio.load(res.data)
		let hasil = []
		$('body > div > div > div > div > div > div > div > div > div > div > div').each(function (a, b) {
			$(b).find('div').each(function (c, d) {
				let Link = $(d).find('div > div > div > div > a').find('img').attr('src')
				hasil.push(Link)
			})
		})
		let Data = new Set()
		hasil.forEach(h => {
			if (h === undefined) return
			Data.add(h.replace('236x', 'originals'))
		})
		ress = {
			status: res.status,
			author: "RA",
			result: Array.from(Data)
		}
		resolve(ress.result)
	}).catch(reject)
})

/**
 * Search Google image
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} `Promise` that resolve url of image
 */
const gimage = (browser, query) => new Promise(async (resolve, reject) => {
	const url = "https://www.google.com/search?tbm=isch&q="
	let page = await browser.newPage()
	await page.goto(url + encodeURIComponent(query)).catch((e) => reject(e))
	await page
		.content()
		.then((html) => {
			let pattrn =
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*(jpg|jpeg))/g
			let res = html.match(pattrn)
			resolve(sample(res))
		})
		.catch((e) => reject(e))
	await page.close()
})

/**
 * Screenshot web
 *
 * @param  {Object} puppeteer browser
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve `true`
 */
const ssweb = (
	browser,
	path,
	url,
	viewPort = {
		width: 1366,
		height: 1080,
	}
) => new Promise(async (resolve, reject) => {
	const page = await browser.newPage()
	await page.setViewport(viewPort)
	await page.goto(url)
	setTimeout(async () => {
		await page
			.screenshot({
				path: path,
			})
			.catch((e) => reject(e))
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
		let baseUrl = "https://ssstik.io"

		await page.goto(baseUrl)
		await page.type("#main_page_text", `${url}`)
		await page.click("#submit", {
			delay: 300,
		})

		await page.waitForSelector("#target > div > div.result_overlay", {
			delay: 300,
		})
		let mp4 = await page.$eval(
			"#target > div > div.result_overlay > a.without_watermark",
			(element) => {
				return element.getAttribute("href")
			}
		)
		let mp3 = await page.$eval(
			"#target > div > div.result_overlay > a.music",
			(element) => {
				return element.getAttribute("href")
			}
		)

		resolve({
			mp4: baseUrl + mp4,
			mp3: mp3,
		})
		page.close()
	} catch (err) {
		if (err.name == 'TimeoutError') resolve(null)
		else reject(err)
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
		await page.goto("https://snaptik.app/")
		await page.type("#url", `${url}`)
		await page.click("#submiturl", {
			delay: 300,
		})

		await page.waitForSelector("div.snaptik-right", {
			delay: 300,
		})
		let d1 = await page.$eval(
			"div.snaptik-right > div > a",
			(element) => {
				return element.getAttribute("href")
			})
		let d2 = await page.$eval(
			"div.snaptik-right > div > a:nth-child(2)",
			(element) => {
				return element.getAttribute("href")
			}
		)
		let d3 = await page.$eval(
			"div.snaptik-right > div > a:nth-child(3)",
			(element) => {
				return element.getAttribute("href")
			}
		)
		if (d1 == undefined || d3 == undefined) reject(undefined)
		page.close()
		resolve({
			server1: "https://snaptik.app" + d1,
			server2: d2,
			source: "https://snaptik.app" + d3,
		})
	} catch (err) {
		if (err.name == 'TimeoutError') resolve(null)
		else reject(err)
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
		let baseUrl = "https://qload.info/tiktok-audio?link="
		let respon = await axios.get(baseUrl + url)
		let $ = cheerio.load(respon.data)
		let mp3 = $("#download-track-btn").attr("href")
		resolve({ mp3: mp3 })
	} catch (err) {
		reject(err)
	}
})

/**
 * saveFrom scraper
 *
 * @param  {Object} puppeteer browser instance
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve obj
 */
const saveFrom = (browser, url, isIG = false) => new Promise(async (resolve, reject) => {
	try {
		const page = await browser.newPage()
		await page.goto("https://en.savefrom.net/20/", { timeout: 10000, waitUntil: 'load' })
		await page.waitForSelector("#sf_url", {
			delay: 300,
		})
		await page.type("#sf_url", `${url}`)
		await page.click("#sf_submit", {
			delay: 300,
		})

		await page.waitForSelector("div.media-result", {
			delay: 300,
		})

		if (isIG) {
			let res = await page.$eval(
				`#sf_result > div > div > div.info-box > div.link-box > div.def-btn-box > a`,
				(a) => {
					return a.getAttribute('href')
				}
			)
			page.close()
			resolve(res)
		} else {
			let res = await page.$$eval(
				"#sf_result > div > div.result-box.video > div.info-box > div.link-box > div.drop-down-box > div.list > div > div > div > a",
				(a) => {
					let resu = a.map(el => {
						let data = {}
						data.url = el.getAttribute("href")
						data.quality = el.getAttribute("data-quality")
						data.type = el.getAttribute("data-type")
						return data
					})
					return resu
				})
			page.close()
			resolve(res)
		}
	} catch (e) {
		if (e.name == 'TimeoutError') resolve(null)
		else reject(e)
	}
})

/**
 * saveFrom scraper
 *
 * @param  {Object} puppeteer browser instance
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve obj
 */
const saveFromStory = (browser, username) => new Promise(async (resolve, reject) => {
	try {
		const page = await browser.newPage()
		await page.goto("https://en.savefrom.net/20-download-instagram-stories.html")
		await page.waitForSelector("#sf_url", {
			delay: 300,
		})
		await page.type("#sf_url", `${username}`)
		await page.click("#sf_submit", {
			delay: 300,
		})

		await page.waitForSelector("#ig-stories-root > div > div > div.ig-stories__content > ul", {
			delay: 300,
		})

		let res = await page.$$eval(
			"#ig-stories-root > div > div > div.ig-stories__content > ul > li",
			(li) => {
				let resu = li.map(el => {
					return el.querySelector('a').href
				})
				return resu
			})
		page.close()
		resolve(res)
	} catch (e) {
		if (e.name == 'TimeoutError') resolve(null)
		else reject(e)
	}
})

export default {
	pinterestLight,
	saveFromStory,
	pinterest,
	saveFrom,
	snaptik,
	gimage,
	ssstik,
	ssweb,
	qload,
	kbbi
}
