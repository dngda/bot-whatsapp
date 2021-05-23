const axios = require('axios')
const fs = require('fs-extra')
const { fetchJson } = require('../utils/fetcher')
const { apiTobz, apiVH, apiFarzain, apiItech } = JSON.parse(fs.readFileSync('./settings/api.json'))
const _ = require('underscore')

const quote = () => new Promise((resolve, reject) => {
    slash = _.sample(["quotes", "quotes2", "quotes3"])
    axios.get(`https://api.i-tech.id/tools/${slash}?key=${apiItech}`)
        .then((res) => {
            let text
            if (res.data.hasOwnProperty('author')) {
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
    axios.get(`https://videfikri.com/api/ytsearch/?query=${encodeURIComponent(query)}`)
        .then((res) => {
            const result = res.data.result.data[0]
            resolve(result)

        }).catch((err) => {
            reject(err)
        })
})

const artinama = (nama) => new Promise((resolve, reject) => {
    axios.get(`http://zekais-api.herokuapp.com/artinama?nama=${encodeURIComponent(nama)}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const lirik = (query) => new Promise((resolve, reject) => {
    axios.get(`https://scrap.terhambar.com/lirik?word=${encodeURIComponent(query)}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const cuaca = (daerah) => new Promise((resolve, reject) => {
    axios.get(`https://rest.farzain.com/api/cuaca.php?id=${encodeURIComponent(daerah)}&apikey=${apiFarzain}`)
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
    axios.get(`https://arugaz.herokuapp.com/api/nulis?text=${encodeURIComponent(teks)}`)
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
    fetchJson('https://meme-api.herokuapp.com/gimme/' + reddit + '/')
        .then((rest) => {
            resolve(rest.url)
        })
        .catch((errr) => {
            reject(errr)
        })
})

/**
 *
 * @param  {String} query
 *
 */

const pinterest = (wall) => new Promise((resolve, reject) => {
    fetchJson('http://fdciabdul.tech/api/pinterest?keyword=' + encodeURIComponent(wall))
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err)
        })
})

module.exports = {
    artinama,
    ytsearch,
    quote,
    cuaca,
    tulis,
    lirik,
    sreddit,
    pinterest
}