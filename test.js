(async () => {
const puppeteer = require('puppeteer')
const scraper = require('./lib/scraper')

const browser = await puppeteer.launch({
    headless: false,
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

url = 'https://vt.tiktok.com/ZSJmK8BBX/'
// gsearch = 'https://www.google.com/search?q='
scraper.tiktok(browser, url)
.then((result) => {
    console.log(result)
})

// path = './media/ssweb.png'
// scraper.ssweb(browser, path, gsearch+url).catch(e => console.log(e))


})()