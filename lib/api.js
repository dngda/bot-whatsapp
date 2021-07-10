/**
 * @ Author: AirMineral Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-10 22:28:15
 * @ Description: Tempat consume api
 */

import axios from 'axios'
import { load } from 'cheerio'
import fs from 'fs-extra'
import lodash from 'lodash'
const { sample } = lodash
import yts from 'yt-search'

const { get } = axios
const { readFileSync } = fs

// eslint-disable-next-line no-unused-vars
const { apiFarzain, apiItech, apiZeks, apiLol, apiZenz, apiGenius, apiOcr } = JSON.parse(readFileSync('./settings/api.json'))

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

const lirik = (query) => new Promise((resolve, reject) => {
    get(`https://scrap.terhambar.com/lirik?word=${encodeURIComponent(query)}`)
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
            if (hits[0].result.url) {
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
                resolve(`Error! Lirik tidak ditemukan.`)
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
const sreddit = (reddit) => new Promise((resolve, reject) => {
    get('https://meme-api.herokuapp.com/gimme/' + reddit + '/')
        .then((rest) => {
            resolve(rest.data)
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
const pinterest = (wall) => new Promise((resolve, reject) => {
    get('https://fdciabdul.tech/api/pinterest?keyword=' + encodeURIComponent(wall))
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
 * @returns {object} { result }
 */
const fbdl = (url) => new Promise((resolve, reject) => {
    get(`https://lolhuman.herokuapp.com/api/facebook2?apikey=${apiLol}&url=${url}`)
        .then(res => {
            if (res.data.status !== 200) reject(res.data.status)
            else resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

/**
 *
 * @param  {String} query
 * @returns {object} { [270p, 360p, 720p] }
 */
const twdl = (url) => new Promise((resolve, reject) => {
    get(`https://lolhuman.herokuapp.com/api/twitter?apikey=${apiLol}&url=${url}`)
        .then(res => {
            if (res.data.status !== 200) reject(res.data.status)
            else resolve(res.data.result)
        })
        .catch(err => {
            reject(err)
        })
})

/**
 *
 * @param  {String} query
 * @returns {object} { url }
 */
const igdl = (url) => new Promise((resolve, reject) => {
    get(`https://lolhuman.herokuapp.com/api/instagram?apikey=${apiLol}&url=${url}`)
        .then(res => {
            if (res.data.status !== 200) reject(res.data.status)
            else resolve(res.data.result)
        })
        .catch(err => {
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
            reject(`Simi error: ` + e.data || e.message)
        })
})

/**
 *
 * @param  {String} query
 * @returns {String} msg
 */
const simiZens = (inp) => new Promise((resolve, reject) => {
    get(`https://zenzapi.xyz/api/simih?apikey=${apiZenz}&text=${encodeURIComponent(inp)}`)
        .then(res => {
            resolve(res.data.result.message)
        })
        .catch((e) => {
            reject(`Simi error: ` + e.data || e.message)
        })
})

const ocr = (url) => new Promise((resolve, reject) => {
    get(`https://api.ocr.space/parse/imageurl?apikey=${apiOcr}&url=${url}`)
        .then(res => {
            if (res.data?.IsErroredOnProcessing == true) resolve(res.data?.ErrorMessage)
            else resolve(res.data?.ParsedResults?.ParsedText)
        })
        .catch(err => {
            reject(err)
        })
})


export default {
    pinterest,
    artinama,
    ytsearch,
    simiZens,
    simiLol,
    sreddit,
    quote,
    cuaca,
    tulis,
    lirik,
    lyric,
    fbdl,
    twdl,
    igdl,
    ocr
}