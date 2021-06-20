/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-21 00:38:53
 * @ Description: Search Kbbi
 */

import ns from 'node-scrapy'
import fetch from 'node-fetch'
const { extract } = ns

/**
 * Search KBBI
 *
 * @param  {String} query
 * @returns {Promise} <String> arti
 */
const kbbi = async (query) => new Promise((resolve, reject) => {
  const url = 'https://kbbi.web.id/'
  const kata = query

  const model = {
    arti: 'div#d1 ($ | trim)'
  }

  fetch(url + kata)
    .then((res) => res.text())
    .then((body) => {
      const data = extract(body, model)
      resolve(data.arti)
    })
    .catch(err => {
      reject(err)
    })
})

export default kbbi