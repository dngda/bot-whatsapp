/**
 * @ Author: ArugaZ
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-28 19:51:47
 * @ Description:
 */

import axios from 'axios'
import Crypto from 'crypto'
const  { get } = axios

const resep = async (menu) => new Promise((resolve, reject) => {
    get('https://masak-apa.tomorisakura.vercel.app/api/search/?q=' + menu)
        .then(async (res) => {
            const { results } = await res.data
            const random = Crypto.randomInt(0, 16)
            get('https://masak-apa.tomorisakura.vercel.app/api/recipe/' + results[random].key)
                .then(async (result) => {
                    const { results: resData } = await result.data
                    const bahannya = `${resData.ingredient}`
                    const bahan = bahannya.replace(/,/g, '\n')
                    const tutornya = `${resData.step}`
                    const tutornih = tutornya.replace(/,/g, '\n')
                    const tutor = tutornih.replace(/.,/g, '\n')
                    const hasil = `*Judul:* ${resData.title}\n*Penulis:* ${resData.author.user}\n*Rilis:* ${resData.author.datePublished}\n*Level:* ${resData.dificulty}\n*Waktu:* ${resData.times}\n*Porsi:* ${resData.servings}\n\n*Bahan-bahan:*\n${bahan}\n\n*Step-by-step:*\n${tutor}`
                    resolve(hasil)
                })
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
})

export default resep
