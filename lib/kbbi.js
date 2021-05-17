const scrapy = require('node-scrapy')
const fetch = require('node-fetch')

// BY SEROBOT => https://github.com/dngda/bot-whatsapp

/**
 * Search KBBI
 *
 * @param  {String} query
 * @returns {Promise} <String> arti
 */
module.exports = kbbi = async (query) => new Promise((resolve, reject) => {
  const url = 'https://kbbi.web.id/'
  const kata = query

  const model = {
    arti: 'div#d1 ($ | trim)'
  }

  fetch(url + kata)
    .then((res) => res.text())
    .then((body) => {
      const data = scrapy.extract(body, model)
      resolve(data.arti)
    })
    .catch(err => {
      reject(err)
    })
})