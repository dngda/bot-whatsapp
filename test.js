(async () => {
const puppeteer = require('puppeteer')
const scraper = require('./lib/scraper')

const browser = await puppeteer.launch({
    headless: true,
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

url = 'https://www.tiktok.com/@mieayamthebstt/video/6964342416849538305'
scraper.tiktok(browser, url)
.then((result) => {
    console.log(result)
})


})()