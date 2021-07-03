/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-06-22 13:40:17
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-03 19:17:27
 * @ Description:
 */

import cvs from "canvas"
const { createCanvas } = cvs

const ttp = (text, color = `white`, color2 = null) => new Promise((resolve, reject) => {
    try {
        text = text.replace(/\s/g, '\n')
        const canvas = createCanvas(512, 512)
        const ctx = canvas.getContext('2d')
        let textData = text.split('\n')

        // Gabungkan kata yang pendek
        let s = 0
        do {
            s = textData.findIndex(n => {
                if (n.length < 5)
                    return n
            })
            let isDepan = false
            if (s > 0 && s != textData.length - 1 && s != -1) {
                isDepan = textData[s - 1].length < textData[s + 1] ? true : false
            }
            if (s > 0 && s != textData.length - 1 && isDepan && s != -1) {
                const gabungan = `${textData[s - 1]} ${textData[s]}`
                textData.splice(s - 1, 2, gabungan)
            } else if (s != textData.length - 1 && !isDepan && s != -1) {
                const gabungan = `${textData[s]} ${textData[s + 1]}`
                textData.splice(s, 2, gabungan)
            } else if (s == textData.length - 1) {
                s = -1
            }
        } while (s != -1)

        // Pisahkan kata yang panjang
        let p = -1
        do {
            p = textData.findIndex(n => {
                if (n.length > 15)
                    return n
            })
            if (p != -1) {
                const pisahan = textData[p].match(/.{1,14}/g)
                textData.splice(p, 1, pisahan[0], pisahan[1])
            }
        } while (p != -1)

        let posisiY = 256
        let longest = textData.reduce((a, b) => {
            return a.length > b.length ? a : b
        })
        let inpText = ctx.measureText(longest)
        let ukuranFont = 170 - inpText.width - (textData.length * 5)
        const lineHeight = inpText.emHeightAscent + ukuranFont
        posisiY = posisiY - (textData.length - 1) * lineHeight / 2
        ctx.font = `${ukuranFont}px Comic Sans MS`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        if (color2) {
            var grd = ctx.createLinearGradient(0, 0, 500, 0)
            grd.addColorStop(0, color)
            grd.addColorStop(1, color2)
            ctx.fillStyle = grd
        } else {
            ctx.fillStyle = color
        }
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 8;
        textData.forEach((data, i) => {
            ctx.strokeText(data, 256, posisiY + (i * lineHeight), 500)
            ctx.fillText(data, 256, posisiY + (i * lineHeight), 500)
        })

        resolve(canvas.toBuffer())
    } catch (err) {
        reject(err)
    }
})


export default {
    ttp
}