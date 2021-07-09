/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-09 07:38:36
 * @ Description: Search kata kotor dan nsfw
 */

import fs from 'fs-extra'
const { readFileSync } = fs
const kataKasar = JSON.parse(readFileSync('./settings/katakasar.json'))
const nsfwQuery = JSON.parse(readFileSync('./settings/nsfwquery.json'))

const inArray = (needle, haystack) => {
    let length = haystack.length
    for (let i = 0; i < length; i++) {
        if (haystack[i] == needle) return true
    }
    return false
}

const cariKasar = (sentence) => new Promise((resolve) => {
    if (sentence !== undefined) {
        let words = sentence.split(/\s/g)
        for (let word of words) {
            if (inArray(word.toLowerCase(), kataKasar)) {
                resolve(true)
            }
        }
        resolve(false)
    }
})

const cariNsfw = (sentence) => new Promise((resolve) => {
    if (sentence !== undefined) {
        let words = sentence.split(/\s/g)
        for (let word of words) {
            if (inArray(word.toLowerCase(), nsfwQuery)) {
                resolve(true)
            }
        }
        resolve(false)
    }
})

export default cariKasar
export { cariNsfw }