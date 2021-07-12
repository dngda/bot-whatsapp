/* eslint-disable no-async-promise-executor */
/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-06-22 13:40:17
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-12 12:40:14
 * @ Description:
 */

import cvs from "canvas"
const { createCanvas, registerFont, loadImage } = cvs

const ttp = (text, color1 = `white`, color2 = null, strokeColor = `black`) => new Promise((resolve, reject) => {
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
            grd.addColorStop(0, color1)
            grd.addColorStop(1, color2)
            ctx.fillStyle = grd
        } else {
            ctx.fillStyle = color1
        }
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = 8
        textData.forEach((data, i) => {
            ctx.strokeText(data, 256, posisiY + (i * lineHeight), 500)
            ctx.fillText(data, 256, posisiY + (i * lineHeight), 500)
        })

        resolve(canvas.toBuffer())
    } catch (err) {
        reject(err)
    }
})

const welcome = (
    photoUrl = './src/png/ava.png',
    groupPhoto = './src/png/group.png',
    pushname = 'Unknown Name',
    groupName = 'Unknown Group',
    memberKe = 0
) => new Promise(async (resolve, reject) => {
    try {
        registerFont('./src/font/ChakraPetch-Regular.ttf', { family: 'Chakra Petch' })
        registerFont('./src/font/ChakraPetch-Bold.ttf', { family: 'Chakra Petch', weight: 'bold' })

        const canvas = createCanvas(1000, 500)
        const canvasGroup = createCanvas(160, 160)
        const canvasPhoto = createCanvas(250, 250)
        const ctx = canvas.getContext("2d")
        const ctxGroup = canvasGroup.getContext("2d")
        const ctxPhoto = canvasPhoto.getContext("2d")

        let bgPath = (new Date()).getHours() >= 18 || (new Date()).getHours() <= 5 ? './src/png/bgnight.png' : './src/png/bg.png'
        const bgImg = await loadImage(bgPath)
        
        const photoImg = await loadImage(photoUrl)
        const groupImg = await loadImage(groupPhoto)
        ctx.drawImage(bgImg, 0, 0)

        const groupImgSize = 160
        const size = 80, x = 80, y = 80
        ctxGroup.drawImage(groupImg, 0, 0, groupImgSize, groupImgSize)
        ctxGroup.globalCompositeOperation = "destination-in"
        ctxGroup.fillStyle = "#000"
        ctxGroup.beginPath()
        ctxGroup.moveTo(x + size * Math.cos(0), y + size * Math.sin(0))
        let side = 0
        for (side; side < 11; side++) {
            ctxGroup.lineTo(x + size * Math.cos(side * 2 * Math.PI / 10), y + size * Math.sin(side * 2 * Math.PI / 10))
        }
        ctxGroup.fill()

        const photoImgSize = 250
        const sizeP = 125, xP = 125, yP = 125
        ctxPhoto.drawImage(photoImg, 0, 0, photoImgSize, photoImgSize)
        ctxPhoto.globalCompositeOperation = "destination-in"
        ctxPhoto.fillStyle = "#000"
        ctxPhoto.beginPath()
        ctxPhoto.moveTo(xP + sizeP * Math.cos(0), yP + sizeP * Math.sin(0))
        let sideP = 0
        for (sideP; sideP < 11; sideP++) {
            ctxPhoto.lineTo(xP + sizeP * Math.cos(sideP * 2 * Math.PI / 10), yP + sizeP * Math.sin(sideP * 2 * Math.PI / 10))
        }
        ctxPhoto.fill()

        ctx.drawImage(canvasGroup, 90, 100)
        ctx.drawImage(canvasPhoto, 130, 145)

        ctx.textBaseline = 'middle'
        ctx.fillStyle = (new Date()).getHours() >= 18 || (new Date()).getHours() <= 5 ? 'white' : 'black'
        ctx.font = `bold 24px Chakra Petch`
        ctx.fillText(`Member #${memberKe}`, 430, 135)
        ctx.fillStyle = 'white'
        ctx.font = `bold 36px Chakra Petch`
        ctx.fillText(`Halo, ${pushname.trim().length > 17 ? pushname.trim().substring(0, 16) + '...' : pushname.trim()}`, 430, 190)
        ctx.font = `36px Chakra Petch`
        ctx.fillText(`Selamat datang di Group`, 430, 230)
        ctx.font = `bold 36px Chakra Petch`
        ctx.fillText(`${groupName.trim().length > 24 ? groupName.trim().substring(0, 23) + '...' : groupName.trim()}`, 430, 270)
        ctx.font = `30px Chakra Petch`
        ctx.fillStyle = (new Date()).getHours() >= 18 || (new Date()).getHours() <= 5 ? 'white' : 'black'
        ctx.fillText(`Jangan lupa perkenalan`, 430, 340)
        ctx.fillText(`dan baca aturan group!`, 430, 380)

        resolve(canvas.toDataURL())
    } catch (err) {
        reject(err)
    }

})
export default {
    welcome,
    ttp
}