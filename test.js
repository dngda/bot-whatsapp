const gimage = require('./lib/gimage.js')
const puppeteer = require('puppeteer')
const path = require('chrome-launcher').Launcher.getInstallations()[0];

(async () => {
	const browser = await puppeteer.launch({
		executablePath: path,
	    killProcessOnBrowserClose: true,
	    args: [
	        '--no-sandbox',
	        '--disable-setuid-sandbox',
	        '--aggressive-cache-discard',
	        '--disable-cache',
	        '--disable-application-cache',
	        '--disable-offline-load-stale-cache',
	        '--disk-cache-size=0'
	    ]
	})

	gimage(browser, 'heejin').then(n => {
		console.log(n)
	})
	gimage(browser, 'valorant').then(n => {
		console.log(n)
	})

})()