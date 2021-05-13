const tiktok = require('tiktok-scraper-without-watermark')
const url = 'https://www.tiktok.com/@youneszarou/video/6942436555692805381'


tiktok.keeptiktok(url)
     .then(result => {
          console.log(result)
     })
     .catch(e => console.log(e))