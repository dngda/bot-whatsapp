const gimage = require('./lib/gimage.js')
const pint = require('./lib/pinterest.js')
const puppeteer = require('puppeteer')
const path = require('chrome-launcher').Launcher.getInstallations()[0];

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
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

	pint(browser, 'heejin').then(n => {
		console.log(n)
	})

})()