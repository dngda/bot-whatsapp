const scrapy = require('node-scrapy')
const fetch = require('node-fetch')

/**
 * Search KBBI
 *
 * @param  {String} query
 */
module.exports = kbbi = async (query) => new Promise((resolve, reject) => {
const url = 'https://kbbi.web.id/'
const kata = query

const model = {
  arti: 'div#d1 ($ | trim)'
}

fetch(url+kata)
  .then((res) => res.text())
  .then((body) => {
  	const data = scrapy.extract(body, model)
    resolve(data.arti)
  })
  .catch(err => {
  	reject(err)
  })
})