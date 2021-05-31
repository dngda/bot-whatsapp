import fs from 'fs-extra'
const { readFileSync } = fs
const kataKasar = JSON.parse(readFileSync('./settings/katakasar.json'))

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
            if (inArray(word, kataKasar)) {
                resolve(true)
            }
        }
        resolve(false)
    }
})

export default cariKasar