const scrapy = require('node-scrapy')
const fetch = require('node-fetch')

const url = 'https://kbbi.web.id/'
const kata = 'asdasd'

const model = {
  arti: 'div#d1 ($ | trim)'
}

fetch(url+kata)
  .then((res) => res.text())
  .then((body) => {
    console.log(scrapy.extract(body, model))
  })
  .catch(console.error)