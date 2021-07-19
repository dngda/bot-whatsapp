/**
 * @ Author: AirMineral Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-19 11:01:14
 * @ Description: Tempat consume api
 */

import axios from 'axios'
import { load } from 'cheerio'
import fs from 'fs-extra'
import lodash from 'lodash'
import { Agent } from 'https'
const { sample } = lodash
import yts from 'yt-search'
const agent = new Agent({
    rejectUnauthorized: false
})
const { get } = axios
const { readFileSync } = fs

// eslint-disable-next-line no-unused-vars
const { apiFarzain, apiItech, apiZeks, apiLol, apiGenius, apiOcr } = JSON.parse(readFileSync('./settings/api.json'))

const quote = () => new Promise((resolve, reject) => {
    let slash = sample(["quotes", "quotes2", "quotes3"])
    get(`https://api.i-tech.id/tools/${slash}?key=${apiItech}`)
        .then((res) => {
            let text = ''
            let hasAuthorProperty = Object.prototype.hasOwnProperty.call(res.data, 'author')
            if (hasAuthorProperty) {
                text = `Author: ${res.data.author}\n\nQuote: ${res.data.result}`
            } else {
                text = res.data.result
            }
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const ytsearch = (query) => new Promise((resolve, reject) => {
    yts(query)
        .then((res) => {
            let data = res.all.slice(0, 5)
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
})

const artinama = (nama) => new Promise((resolve, reject) => {
    get(`https://api.zeks.xyz/api/artinama?apikey=${apiZeks}&nama=${encodeURIComponent(nama)}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const lyric = (query) => new Promise((resolve, reject) => {
    get(`https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=${apiGenius}`)
        .then(res => {
            if (res.data.meta.status != 200) reject(res.data.meta.status + res.data.meta.message)
            const { hits } = res.data.response
            if (hits[0]) {
                get(hits[0].result.url).then(resu => {
                    const $ = load(resu.data)
                    let lyrics = $('div[class="lyrics"]').text().trim()
                    if (!lyrics) {
                        lyrics = ''
                        $('div[class^="Lyrics__Container"]').each((i, elem) => {
                            if ($(elem).text().length !== 0) {
                                let snippet = $(elem).html()
                                    .replace(/<br>/g, '\n')
                                    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '')
                                lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n'
                            }
                        })
                    }
                    if (!lyrics) return resolve(`Error! Lirik tidak ditemukan.`)
                    resolve(`${hits[0]?.result.full_title}\n\n${lyrics.trim()}`)
                }).catch(reject)
            } else {
                get(`https://scrap.terhambar.com/lirik?word=${encodeURIComponent(query)}`, { httpsAgent: agent })
                    .then((res) => {
                        resolve(res.data?.result?.lirik)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            }
        }).catch(reject)
})

const cuaca = (daerah) => new Promise((resolve, reject) => {
    get(`https://rest.farzain.com/api/cuaca.php?id=${encodeURIComponent(daerah)}&apikey=${apiFarzain}`)
        .then((res) => {
            if (res.data.respon.cuaca == null) resolve('Maaf daerah kamu tidak tersedia')
            const text = `Cuaca di: ${res.data.respon.tempat}\n\nCuaca: ${res.data.respon.cuaca}\nAngin: ${res.data.respon.angin}\nDesk: ${res.data.respon.deskripsi}\nKelembapan: ${res.data.respon.kelembapan}\nSuhu: ${res.data.respon.suhu}\nUdara: ${res.data.respon.udara}`
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const tulis = (teks) => new Promise((resolve, reject) => {
    get(`https://arugaz.herokuapp.com/api/nulis?text=${encodeURIComponent(teks)}`)
        .then((res) => {
            resolve(`${res.data.result}`)
        })
        .catch((err) => {
            reject(err)
        })
})

/**
*
* @param  {String} query
*
*/
const random = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'AdviceAnimals', 'MemeEconomy', 'memes', 'terriblefacebookmemes', 'historymemes', 'okbuddyretard', 'nukedmemes']
const sreddit = (reddit = false) => new Promise((resolve, reject) => {
    if (!reddit) reddit = sample(random)
    get('https://meme-api.herokuapp.com/gimme/' + reddit)
        .then((rest) => {
            resolve(rest.data)
        })
        .catch((err) => {
            reject(err)
        })
})

/**
 * create custom meme
 * @param  {String} imageUrl
 * @param  {String} topText
 * @param  {String} bottomText
 */
const memegen = (imageUrl, top, bottom) => {
    let topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/%/g, '~p').replace(/#/g, '~h').replace(/\//g, '~s')
    let bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/%/g, '~p').replace(/#/g, '~h').replace(/\//g, '~s')
    return `https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`
}

/**
 *
 * @param  {String} query
 *
 */
const pinterest = (wall) => new Promise((resolve, reject) => {
    get('https://fdciabdul.tech/api/pinterest?keyword=' + encodeURIComponent(wall), { httpsAgent: agent })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
})

/**
 *
 * @param  {String} query
 * @returns {String} msg
 */
const simiLol = (inp) => new Promise((resolve, reject) => {
    get(`https://lolhuman.herokuapp.com/api/simi?apikey=${apiLol}&text=${encodeURIComponent(inp)}`)
        .then(res => {
            resolve(res.data.result)
        })
        .catch((e) => {
            reject(`SimiLol error: ` + e.message)
        })
})

/**
 *
 * @param  {String} query
 * @returns {String} msg
 */
const simiPais = (inp) => new Promise((resolve, reject) => {
    get(`https://pencarikode.xyz/api/simsimii?apikey=pais&text=${encodeURIComponent(inp)}`)
        .then(res => {
            resolve(res.data.result)
        })
        .catch((e) => {
            reject(`SimiPais error: ` + e.message)
        })
})

/**
 *
 * @param  {String} query
 * @returns {String} msg
 */
const simiZeks = (inp) => new Promise((resolve, reject) => {
    get(`https://api.zeks.xyz/api/simi?apikey=${apiZeks}&text=${encodeURIComponent(inp)}`)
        .then(res => {
            resolve(res.data.result)
        })
        .catch((e) => {
            reject(`SimiZeks error: ` + e.message)
        })
})

/**
 *
 * @param  {String} query
 * @returns {String} msg
 */
const simiSumi = (inp) => new Promise((resolve, reject) => {
    get(`https://simsumi.herokuapp.com/api?text=${encodeURIComponent(inp)}`)
        .then(res => {
            resolve(res.data.success)
        })
        .catch((e) => {
            reject(`Simisumi error: ` + e.message)
        })
})


/**
 *
 * @param  {String} url
 * @returns {String} msg
 */
const ocr = (url) => new Promise((resolve, reject) => {
    get(`https://api.ocr.space/parse/imageurl?apikey=${apiOcr}&url=${url}`)
        .then(res => {
            if (res.data?.IsErroredOnProcessing == true) resolve(res.data?.ErrorMessage)
            else resolve(res.data?.ParsedResults[0]?.ParsedText)
        })
        .catch(err => {
            reject(err)
        })
})

const ttdl = (url) => new Promise((resolve, reject) => {
    get(`https://hardianto-chan.herokuapp.com/api/download/tiktok?apikey=hardianto&url=${encodeURIComponent(url)}`)
        .then(res => {
            resolve(res.data)
        }).catch(reject)
})

export default {
    pinterest,
    artinama,
    ytsearch,
    simiPais,
    simiSumi,
    simiZeks,
    simiLol,
    sreddit,
    memegen,
    quote,
    cuaca,
    tulis,
    lyric,
    ttdl,
    ocr
}