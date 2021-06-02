import axios from 'axios'
import fs from 'fs-extra'
import { fetchJson } from '../utils/fetcher.js'
import { sample } from 'underscore'
import yts from 'yt-search'

const { get } = axios
const { readFileSync } = fs

const { apiFarzain, apiItech, apiZeks } = JSON.parse(readFileSync('./settings/api.json'))

const quote = () => new Promise((resolve, reject) => {
    let slash = sample(["quotes", "quotes2", "quotes3"])
    get(`https://api.i-tech.id/tools/${slash}?key=${apiItech}`)
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
    yts(query)
        .then((res) => {
            let data = res.all.slice(0, 1)[0]
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
    fetchJson('https://meme-api.herokuapp.com/gimme/' + reddit + '/')
        .then((rest) => {
            resolve(rest)
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

export default {
    artinama,
    ytsearch,
    quote,
    cuaca,
    tulis,
    lirik,
    sreddit,
    pinterest
}