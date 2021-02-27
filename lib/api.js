const axios = require('axios')
const fs = require('fs-extra')
const {apiTobz, apiVH, apiFarzain} = JSON.parse(fs.readFileSync('./settings/api.json'))

const quote = async () => new Promise((resolve, reject) => {
    axios.get(`https://tobz-api.herokuapp.com/api/randomquotes?apikey=${apiTobz}`)
    .then((res) => {
        const text = `Author: ${res.data.author}\n\nQuote: ${res.data.quotes}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const qrcode = async (url, size) => new Promise((resolve, reject) => {
	axios.get(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
		.then((res) => {
			resolve(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
		})
		.catch((err) => {
            reject(err)
        })
})

const artinama = async (nama) => new Promise((resolve, reject) => {
	axios.get(`https://tobz-api.herokuapp.com/api/artinama?nama=${nama}&apikey=${apiTobz}`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

const cuaca = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://rest.farzain.com/api/cuaca.php?id=${url}&apikey=${apiFarzain}`)
    .then((res) => {
		if (res.data.respon.cuaca == null) resolve('Maaf daerah kamu tidak tersedia')
        const text = `Cuaca di: ${res.data.respon.tempat}\n\nCuaca: ${res.data.respon.cuaca}\nAngin: ${res.data.respon.angin}\nDesk: ${res.data.respon.deskripsi}\nKelembapan: ${res.data.respon.kelembapan}\nSuhu: ${res.data.respon.suhu}\nUdara: ${res.data.respon.udara}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const tulis = async (teks) => new Promise((resolve, reject) => {
    axios.get(`https://alfians-api.herokuapp.com/nulis?text=${teks}`)
    .then((res) => {
        resolve(`${res.data.result}`)
    })
    .catch((err) => {
        reject(err)
    })
})

module.exports = {
    quote,
    qrcode,
    artinama,
    cuaca,
    tulis
}