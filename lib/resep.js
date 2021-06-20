/**
 * @ Author: ArugaZ
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-21 00:46:18
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
                    const { results } = await result.data
                    const bahannya = `${results.ingredient}`
                    const bahan = bahannya.replace(/,/g, '\n')
                    const tutornya = `${results.step}`
                    const tutornih = tutornya.replace(/,/g, '\n')
                    const tutor = tutornih.replace(/.,/g, '\n')
                    const hasil = `*Judul:* ${results.title}\n*Penulis:* ${results.author.user}\n*Rilis:* ${results.author.datePublished}\n*Level:* ${results.dificulty}\n*Waktu:* ${results.times}\n*Porsi:* ${results.servings}\n\n*Bahan-bahan:*\n${bahan}\n\n*Step-by-step:*\n${tutor}`
                    resolve(hasil)
                })
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
})

export default resep
