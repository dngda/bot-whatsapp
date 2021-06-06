'use strict'
import { removeBackgroundFromImageBase64 } from 'remove.bg'
import { decryptMedia } from '@open-wa/wa-automate'
import { exec, spawn } from 'child_process'
import { translate } from 'free-translate'
import moment from 'moment-timezone'
import appRoot from 'app-root-path'
import { sample } from 'underscore'
import ffmpeg from 'fluent-ffmpeg'
import toPdf from 'office-to-pdf'
import fetch from 'node-fetch'
import ytdl from 'ytdl-core'
import Crypto from 'crypto'
import jimp from 'jimp'
import fs from 'fs-extra'
import axios from 'axios'
import gTTS from 'gtts'

//Common-Js
const { existsSync, writeFileSync, readdirSync, readFileSync, writeFile, unlinkSync } = fs
const { get } = axios
const { tz } = moment
const { read } = jimp

//lowdb
import { LowSync, JSONFileSync } from 'lowdb'
import lodash from 'lodash'
const adapter = new JSONFileSync(appRoot + '/data/denda.json')
const db = new LowSync(adapter)
db.read()
db.data || (db.data = { group: [] })
db.write()
db.chain = lodash.chain(db.data)

//file modules
import { createReadFileSync, processTime, commandLog, receivedLog, isFiltered, addFilter, color, isUrl } from './utils/index.js'
import { getLocationData, urlShortener, cariKasar, schedule, cekResi, tebakgb, scraper, menuId, meme, kbbi, list, api } from './lib/index.js'
import { uploadImages } from './utils/fetcher.js'

tz.setDefault('Asia/Jakarta').locale('id')

const sleep = (delay) => new Promise((resolve) => {
    setTimeout(() => { resolve(true) }, delay)
})

//Load user data
if (!existsSync('./data/stat.json')) {
    writeFileSync('./data/stat.json', `{ "todayHits" : 0, "received" : 0 }`)
}
const setting = JSON.parse(createReadFileSync('./settings/setting.json'))
const kataKasar = JSON.parse(createReadFileSync('./settings/katakasar.json'))
const { apiNoBg } = JSON.parse(createReadFileSync('./settings/api.json'))
const banned = JSON.parse(createReadFileSync('./data/banned.json'))
const ngegas = JSON.parse(createReadFileSync('./data/ngegas.json'))
const welcome = JSON.parse(createReadFileSync('./data/welcome.json'))
const antiLinkGroup = JSON.parse(createReadFileSync('./data/antilinkgroup.json'))
const groupPrem = JSON.parse(createReadFileSync('./data/premiumgroup.json'))
const readMore = '͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏' //its 2000 characters so that makes whatsapp add 'readmore' button
let {
    ownerNumber,
    memberLimit,
    groupLimit,
    prefix
} = setting

//Helper Functions
function formatin(duit) {
    let reverse = duit.toString().split('').reverse().join('')
    let ribuan = reverse.match(/\d{1,3}/g)
    ribuan = ribuan.join('.').split('').reverse().join('')
    return ribuan
}

const inArray = (needle, haystack) => {
    let length = haystack.length
    for (let i = 0; i < length; i++) {
        if (haystack[i].id == needle) return i
    }
    return -1
}

const last = (array, n) => {
    if (array == null) return void 0
    if (n == null) return array[array.length - 1]
    return array.slice(Math.max(array.length - n, 0))
}

//Main functions
const HandleMsg = async (client, message, browser) => {
    //Count received
    receivedLog(false)
    //default msg response
    const resMsg = {
        wait: sample([
            'Sedang diproses! Silahkan tunggu sebentar...',
            'Okey siap, sedang diproses!',
            'Shap, silakan tunggu!',
            'Okey oke bentar!',
            'Okey, tunggu sebentar...',
            'Baiklah, sabar ya!'
        ]),
        error: {
            norm: 'Maaf, Ada yang error! Coba lagi beberapa menit kemudian.',
            admin: 'Perintah ini hanya untuk admin group!',
            owner: 'Perintah ini hanya untuk owner bot!',
            group: 'Maaf, perintah ini hanya dapat dipakai didalam group!',
            botAdm: 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin'
        },
        success: {
            join: 'Berhasil join group via link!',
            sticker: 'Here\'s your sticker'
        },
        badw: sample([
            'Astaghfirullah...',
            'Jaga ketikanmu sahabat!',
            'Yo rasah nggo misuh cuk!',
            'Istighfar dulu sodaraku',
            'Hadehh...',
            'Ada masalah apasih?'
        ])
    }

    try {
        if (message.body === '..' && message.quotedMsg && ['chat', 'image', 'video'].includes(message.quotedMsg.type)) message = message.quotedMsg // inject quotedMsg as Msg
        let { body, type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        var { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await client.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''

        if (type === 'chat') var chats = body
        else var chats = (type === 'image' || type === 'video') ? caption : ''

        const pengirim = sender.id
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const stickerMetadata = { pack: 'Created with', author: 'SeroBot', keepScale: true }
        const stickerMetadataCircle = { pack: 'Created with', author: 'SeroBot', circle: true }
        const stickerMetadataCrop = { pack: 'Created with', author: 'SeroBot' }

        // Bot Prefix
        const regex = /(^\/|^!|^\$|^%|^&|^\+|^\.|^,|^<|^>|^-)(?=\w+)/g

        if (type === 'chat' && body.replace(regex, prefix).startsWith(prefix)) body = body.replace(regex, prefix)
        else body = ((type === 'image' && caption || type === 'video' && caption) && caption.replace(regex, prefix).startsWith(prefix)) ? caption.replace(regex, prefix) : ''

        let realBody = null
        if (type === 'chat') realBody = message.body
        else realBody = (type === 'image' && caption || type === 'video' && caption) ? caption : null

        const croppedRealBody = (realBody?.length > 20) ? realBody?.substring(0, 20) + '...' : realBody
        const command = body.trim().replace(prefix, '').split(/\s/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const arg1 = arg.trim().substring(arg.indexOf(' ') + 1)
        const args = body.trim().split(/\s/).slice(1)
        const url = args.length !== 0 ? args[0] : ''

        // Avoid large body
        if (realBody?.length > 2000) {
            let _whenGroup = ''
            if (isGroupMsg) _whenGroup = `in ${color(name || formattedTitle)}`
            return console.log(color('[LARG]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(croppedRealBody, 'grey'), 'from', color(pushname), _whenGroup)
        }

        // [IDENTIFY]
        var isKasar = false
        const isCmd = body.startsWith(prefix)
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedChat = quotedMsg && quotedMsg.type === 'chat'
        const isQuotedLocation = quotedMsg && quotedMsg.type === 'location'
        const isQuotedDocs = quotedMsg && quotedMsg.type === 'document'
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedPtt = quotedMsg && quotedMsg.type === 'ptt'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedPng = isQuotedDocs && quotedMsg.filename.includes('.png')
        const isQuotedWebp = isQuotedDocs && quotedMsg.filename.includes('.webp')
        const isAntiLinkGroup = antiLinkGroup.includes(chatId)
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isBanned = banned.includes(pengirim)
        const isNgegas = ngegas.includes(chatId)

        const sfx = readdirSync('./random/sfx/').map(item => {
            return item.replace('.mp3', '')
        })

        // Helper Functions
        const sendText = async (_text) => {
            return await client.sendText(from, _text)
                .catch(e => {
                    console.log(e)
                })
        }

        const reply = async (_text) => {
            return await client.reply(from, _text, id)
                .catch(e => {
                    console.log(e)
                })
        }

        // Command that banned people can access
        if (isCmd) {
            // Typing
            client.simulateTyping(chat.id, true)
            switch (command) {
                case 'owner':
                    return await client.sendContact(from, ownerNumber)
                        .then(() => sendText('Jika ada pertanyaan tentang bot silahkan chat nomor di atas'))
                case 'rules':
                case 'tnc':
                    return await sendText(menuId.textTnC())
                case 'donate':
                case 'donasi':
                    return await sendText(menuId.textDonasi())
            }
        }

        // Filter Banned People
        if (isBanned && !isGroupMsg && isCmd) {
            return sendText(`Maaf anda telah dibanned oleh bot karena melanggar Rules atau Term and Condition (${prefix}tnc).\nSilakan chat /owner untuk unban.`).then(() => {
                console.log(color('[BANd]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command}[${args.length}]`), 'from', color(pushname))
            })
        }
        else if (isBanned && isCmd) {
            return console.log(color('[BANd]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command}[${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
        }
        else if (isBanned) return null

        if (isNgegas) isKasar = await cariKasar(chats)

        // [BETA] Avoid command spam
        if (isCmd && isFiltered(from)) {
            let _whenGroup = ''
            if (isGroupMsg) _whenGroup = `in ${color(name || formattedTitle)}`
            console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command}[${args.length}]`), 'from', color(pushname), _whenGroup)
            return reply('Mohon untuk perintah diberi jeda!')
        }

        // Spam cooldown
        if (isFiltered(from + 'isCooldown')) {
            if (isCmd) return reply(`Belum 15 detik`)
                else return null
        }
        // Notify repetitive msg
        if (realBody != undefined && isFiltered(from + croppedRealBody)) {
            let _whenGroup = ''
            if (isGroupMsg) _whenGroup = `in ${color(name || formattedTitle)}`
            console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(croppedRealBody, 'grey'), 'from', color(pushname), _whenGroup)
            client.sendText(ownerNumber, `Ada yang spam cuy:\n-> Nomor : ${pengirim.replace('@c.us', '')}\n-> Username : ${pushname}\n-> Group : ${name || formattedName}\n\n-> _${croppedRealBody}_`)
            addFilter(from + 'isCooldown', 15000)
            return reply(`SPAM detected! Pesan selanjutnya akan diproses setelah 15 detik`)
        }

        // Avoid repetitive sender spam
        if (isFiltered(pengirim) && !isCmd && realBody != undefined) {
            let _whenGroup = ''
            if (isGroupMsg) _whenGroup = `in ${color(name || formattedTitle)}`
            console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(croppedRealBody, 'grey'), 'from', color(pushname), _whenGroup)
            return null
        }

        // Avoid kata kasar spam
        if (isFiltered(from) && isGroupMsg && isKasar) {
            console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command}[${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
            return reply('Mohon untuk tidak melakukan spam kata kasar!')
        }
        // Log Kata kasar
        if (!isCmd && isKasar && isGroupMsg) { console.log(color('[BADW]', 'orange'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'from', color(pushname), 'in', color(name || formattedTitle)) }

        // Log Commands
        if (args.length === 0) var argsLog = color('with no args', 'grey')
        else var argsLog = (arg.length > 15) ? `${arg.substring(0, 15)}...` : arg

        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command}[${args.length}]`), ':', color(argsLog, 'magenta'), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command}[${args.length}]`), ':', color(argsLog, 'magenta'), 'from', color(pushname), 'in', color(name || formattedTitle)) }

        //[BETA] Avoid Spam Message
        if (isCmd) addFilter(from, 2000) // 2 sec delay before proessing commands
        if (realBody != undefined) addFilter(pengirim, 300) // 0.3 sec delay before receiving message from same sender
        if (realBody != undefined) addFilter(from + croppedRealBody, 700) // 0.7 sec delay repetitive msg

        //[AUTO READ] Auto read message 
        client.sendSeen(chatId)

        //Tebak gambar
        if (!isCmd) {
            tebakgb.getAns(from).then(res => {
                if (res != false) {
                    if (res.ans?.toLowerCase() === realBody?.toLowerCase()) {
                        reply(`✅ Jawaban benar! : *${res.ans}*`)
                        tebakgb.delData(from)
                    } else {
                        reply(`❌ Salah!`)
                    }
                }
            })
        }

        // Respon to real body of msg contain this case
        switch (true) {
            case /^(menu|start|help)$/i.test(realBody): {
                return await sendText(`Untuk menampilkan menu, kirim pesan *${prefix}menu*`)
            }
            case /assalamualaikum|assalamu\'alaikum|asalamualaikum|assalamu\'alaykum/i.test(realBody): {
                await reply('Wa\'alaikumussalam Wr. Wb.')
                break
            }
            case /^=/.test(realBody): {
                if (realBody.match(/\d[\=\+\-\*\/\^e]/g)) await reply(`${eval(realBody.slice(1).replace('^', '**'))}`)
                break
            }
            case /\bping\b/i.test(realBody): {
                return await sendText(`Pong!!!\nSpeed: _${processTime(t, moment())} Seconds_`)
            }
            case new RegExp(`\\b(${sfx.join("|")})\\b`).test(realBody?.toLowerCase()): {
                const theSFX = realBody?.toLowerCase().match(new RegExp(sfx.join("|")))
                const path = `./random/sfx/${theSFX}.mp3`
                const _id = (quotedMsg != null) ? quotedMsgObj.id : id
                await client.sendPtt(from, path, _id).catch(err => reply(resMsg.error.norm).then(() => console.log(err)))
                break
            }
            default:
        }
        // Jika bot dimention maka akan merespon pesan
        if (message.mentionedJidList && message.mentionedJidList.includes(botNumber)) reply(`Iya, ada apa?`)

        // Ini Command nya
        if (isCmd) {
            // Hits count
            commandLog(false)
            let { todayHits, received } = JSON.parse(readFileSync('./data/stat.json'))
            // Typing
            client.simulateTyping(chat.id, true)
            // Begin of Switch case
            switch (command) {
                case 'notes':
                case 'menu':
                case 'help':
                case 'start':
                    await sendText(menuId.textMenu(pushname, t))
                        .then(() => ((isGroupMsg) && (isGroupAdmins)) ? sendText(`Menu Admin Grup: *${prefix}menuadmin*`) : null)
                    break
                case 'menuadmin':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    await sendText(menuId.textAdmin())
                    break
                case 'join':
                    if (args.length == 0) return reply(`Jika kalian ingin mengundang bot ke group silakan kontak owner atau gunakan perintah ${prefix}join (link_group) jika slot masih tersedia`)
                    const linkgrup = args[0]
                    let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
                    let chekgrup = await client.inviteInfo(linkgrup)
                        .catch(err => {
                            console.log(err.name, err.message)
                            return sendText(resMsg.error.norm)
                        })
                    if (!islink) return reply('Maaf link group-nya salah! silahkan kirim link yang benar')
                    if (isOwnerBot) {
                        await client.joinGroupViaLink(linkgrup)
                            .then(async () => {
                                await sendText(resMsg.success.join)
                                setTimeout(async () => {
                                    await client.sendText(chekgrup.id, `Hai guys 👋 perkenalkan saya SeroBot. Untuk melihat perintah atau menu yang tersedia pada bot, kirim *${prefix}menu*. Tapi sebelumnya pahami dulu *${prefix}tnc*`)
                                }, 2000)
                            }).catch(async () => {
                                return reply('Gagal! Sepertinya Bot pernah dikick dari group itu ya? Yah, Bot gabisa masuk lagi dong')
                            })
                    } else {
                        let cgrup = await client.getAllGroups()
                        if (cgrup.length > groupLimit) return reply(`Mohon maaf, untuk mencegah overload, group pada bot dibatasi.\nTotal group: ${cgrup.length}/${groupLimit}\nChat /owner untuk negosiasi`)
                        if (cgrup.size < memberLimit) return reply(`Maaf, Bot tidak akan masuk group yang anggotanya tidak lebih dari ${memberLimit} orang`)
                        await client.joinGroupViaLink(linkgrup)
                            .then(async () => {
                                await reply(resMsg.success.join)
                                await client.sendText(chekgrup.id, `Hai guys 👋 perkenalkan saya SeroBot. Untuk melihat perintah atau menu yang tersedia pada bot, kirim *${prefix}menu*. Tapi sebelumnya pahami dulu *${prefix}tnc*`)
                            })
                            .catch(async () => {
                                return reply('Gagal! Sepertinya Bot pernah dikick dari group itu ya? Yah, Bot gabisa masuk lagi dong')
                            })
                    }
                    break
                case 'stat':
                case 'status':
                case 'botstat': {
                    let loadedMsg = await client.getAmountOfLoadedMessages()
                    let chatIds = await client.getAllChatIds()
                    let groups = await client.getAllGroups()
                    let time = process.uptime()
                    let uptime = (time + "").toDHms()
                    sendText(`Status :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats\n\n- *${todayHits}* Total Commands Today\n- *${received}* Total Received Msgs Today\n\nSpeed: _${processTime(t, moment())} Seconds_\nUptime: _${uptime}_`)
                    break
                }

                //Sticker Converter to img
                case 'getimage':
                case 'stikertoimg':
                case 'stickertoimg':
                case 'toimg': {
                    if (isQuotedSticker) {
                        let mediaData = await decryptMedia(quotedMsg)
                        reply(resMsg.wait)
                        let imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await client.sendFile(from, imageBase64, 'imgsticker.jpg', 'Berhasil convert Sticker to Image!', id)
                            .then(() => {
                                console.log(color('[LOGS]', 'grey'), `Sticker to Image Processed for ${processTime(t, moment())} Seconds`)
                            })
                    } else if (!quotedMsg) return reply(`Silakan tag/reply sticker yang ingin dijadikan gambar dengan command!`)
                    break
                }

                // Sticker Creator
                case 'stickergif':
                case 'stikergif':
                case 'sticker':
                case 'stiker':
                case 's': {
                    if (
                        ((isMedia && mimetype !== 'video/mp4') || isQuotedImage || isQuotedPng || isQuotedWebp)
                        &&
                        (args.length === 0 || args[0] === 'crop' || args[0] === 'circle' || args[0] !== 'nobg')
                    ) {
                        reply(resMsg.wait)
                        try {
                            const encryptMedia = (isQuotedImage || isQuotedDocs) ? quotedMsg : message
                            if (args[0] === 'crop') var _metadata = stickerMetadataCrop
                            else var _metadata = (args[0] === 'circle') ? stickerMetadataCircle : stickerMetadata
                            let mediaData = await decryptMedia(encryptMedia)
                                .catch(err => {
                                    console.log(err.name, err.message)
                                    return sendText(resMsg.error.norm)
                                })
                            if (mediaData) {
                                if (isQuotedWebp) {
                                    await client.sendRawWebpAsSticker(from, mediaData.toString('base64'), true)
                                        .then(() => {
                                            sendText(resMsg.success.sticker)
                                            console.log(color('[LOGS]', 'grey'), `Sticker from webp Processed for ${processTime(t, moment())} Seconds`)
                                        }).catch(err => {
                                            console.log(err.name, err.message)
                                            return sendText(resMsg.error.norm)
                                        })
                                } else {
                                    await client.sendImageAsSticker(from, mediaData, _metadata)
                                        .then(() => {
                                            sendText(resMsg.success.sticker)
                                            console.log(color('[LOGS]', 'grey'), `Sticker Processed for ${processTime(t, moment())} Seconds`)
                                        }).catch(err => {
                                            console.log(err.name, err.message)
                                            return sendText(resMsg.error.norm)
                                        })
                                }
                            }
                        } catch (err) {
                            console.log(err.name, err.message)
                            return sendText(resMsg.error.norm)
                        }

                    } else if (args[0] === 'nobg') {
                        if (isMedia || isQuotedImage) {
                            reply(resMsg.wait)
                            try {
                                let encryptedMedia = isQuotedImage ? quotedMsg : message
                                let _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype

                                let mediaData = await decryptMedia(encryptedMedia)
                                    .catch(err => {
                                        console.log(err)
                                        return sendText(resMsg.error.norm)
                                    })
                                if (mediaData === undefined) return sendText(resMsg.error.norm)
                                let base64img = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                                let outFile = './media/noBg.png'
                                // kamu dapat mengambil api key dari website remove.bg dan ubahnya difolder settings/api.json
                                let selectedApiNoBg = sample(apiNoBg)
                                let resultNoBg = await removeBackgroundFromImageBase64({ base64img, apiKey: selectedApiNoBg, size: 'auto', type: 'auto', outFile })
                                await writeFile(outFile, resultNoBg.base64img)
                                await client.sendImageAsSticker(from, `data:${_mimetype};base64,${resultNoBg.base64img}`, stickerMetadata)
                                    .then(() => {
                                        sendText(resMsg.success.sticker)
                                        console.log(color('[LOGS]', 'grey'), `Sticker nobg Processed for ${processTime(t, moment())} Seconds`)
                                    }).catch(err => {
                                        console.log(err)
                                        return sendText(resMsg.error.norm)
                                    })

                            } catch (err) {
                                console.log(err)
                                if (err[0].code === 'unknown_foreground') reply('Maaf batas objek dan background tidak jelas!')
                                else await reply('Maaf terjadi error atau batas penggunaan sudah tercapai!')
                            }
                        }
                    } else if (args.length === 1) {
                        try {
                            if (!isUrl(url)) { return reply('Maaf, link yang kamu kirim tidak valid.') }
                            client.sendStickerfromUrl(from, url).then((r) => (!r && r != undefined)
                                ? sendText('Maaf, link yang kamu kirim tidak memuat gambar.')
                                : reply(resMsg.success.sticker)).then(() => console.log(`Sticker Processed for ${processTime(t, moment())} Second`))
                        } catch (e) {
                            console.log(`Sticker url err: ${e}`)
                            return sendText(resMsg.error.norm)
                        }
                    } else if ((isMedia && mimetype === 'video/mp4') || isQuotedVideo) {
                        reply(resMsg.wait)
                        let encryptedMedia = isQuotedVideo ? quotedMsg : message
                        let mediaData = await decryptMedia(encryptedMedia)
                            .catch(err => {
                                console.log(err)
                                return sendText(resMsg.error.norm)
                            })
                        await client.sendMp4AsSticker(from, mediaData, { endTime: '00:00:09.0', log: true }, stickerMetadata)
                            .then(() => {
                                sendText(resMsg.success.sticker)
                                console.log(color('[LOGS]', 'grey'), `Sticker Processed for ${processTime(t, moment())} Seconds`)
                            })
                            .catch(() => {
                                return reply('Maaf terjadi error atau filenya terlalu besar!')
                            })
                    } else {
                        await reply(`Tidak ada gambar/video!\nUntuk menggunakan ${prefix}sticker, kirim gambar/reply gambar atau *file png/webp* dengan caption\n*${prefix}sticker* (biasa uncrop)\n*${prefix}sticker crop* (square crop)\n*${prefix}sticker circle* (circle crop)\n*${prefix}sticker nobg* (tanpa background)\n\natau Kirim pesan dengan\n*${prefix}sticker <link_gambar>*\n\nUntuk membuat *sticker animasi.* Kirim video/gif atau reply/quote video/gif dengan caption *${prefix}sticker* max 8 detik`)
                    }
                    break
                }

                case 'stikergiphy':
                case 'stickergiphy': {
                    if (args.length != 1) return reply(`Maaf, format pesan salah.\nKetik pesan dengan ${prefix}stickergiphy <link_giphy> (don't include <> symbol)`)
                    const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
                    const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
                    if (isGiphy) {
                        const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                        if (!getGiphyCode) { return reply('Gagal mengambil kode giphy') }
                        const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                        const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                        client.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                            reply(resMsg.success.sticker)
                            console.log(color('[LOGS]', 'grey'), `Sticker Processed for ${processTime(t, moment())} Seconds`)
                        }).catch((err) => console.log(err))
                    } else if (isMediaGiphy) {
                        const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                        if (!gifUrl) { return reply('Gagal mengambil kode giphy') }
                        const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                        client.sendGiphyAsSticker(from, smallGifUrl)
                            .then(() => {
                                reply(resMsg.success.sticker)
                                console.log(color('[LOGS]', 'grey'), `Sticker Processed for ${processTime(t, moment())} Seconds`)
                            })
                            .catch(() => {
                                return reply(resMsg.error.norm)
                            })
                    } else {
                        await reply('Maaf, perintah sticker giphy hanya bisa menggunakan link dari giphy.  [Giphy Only]')
                    }
                    break
                }

                case 'qr':
                case 'qrcode': {
                    if (args.length == 0) return reply(`Untuk membuat kode QR, ketik ${prefix}qrcode <kata>\nContoh:  ${prefix}qrcode nama saya SeroBot`)
                    reply(resMsg.wait);
                    await client.sendFileFromUrl(from, `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(arg)}&size=500x500`, '', '', id)
                    break
                }

                case 'flip': {
                    if (!isMedia && args.length === 0 && !isQuotedImage) return reply(`Flip gambar secara vertical atau horizontal. Kirim gambar dengan caption:\n${prefix}flip h -> untuk flip horizontal\n${prefix}flip v -> untuk flip vertical`)
                    const _enc = isQuotedImage ? quotedMsg : message
                    const _img = await decryptMedia(_enc)
                        .catch(e => {
                            console.log(e)
                            return reply(resMsg.error.norm)
                        })
                    let image = await read(_img)
                    let path = './media/flipped.png'
                    if (args[0] === 'v') image.flip(false, true).write(path)
                    else if (args[0] === 'h') image.flip(true, false).write(path)
                    else return reply(`Argumen salah`)

                    await client.sendImage(from, path, '', '', id)
                        .catch(e => {
                            console.log(e)
                            return reply(resMsg.error.norm)
                        })
                    break
                }

                case 'meme':
                case 'memefy': {
                    if ((isMedia || isQuotedImage) && args.length >= 1 && body.match("|")) {
                        try {
                            let top = arg.split('|')[0]
                            let bottom = arg.split('|')[1]
                            let encryptMedia = isQuotedImage ? quotedMsg : message
                            let mediaData = await decryptMedia(encryptMedia)
                            let getUrl = await uploadImages(mediaData, false)
                            let ImageBase64 = await meme.custom(getUrl, top, bottom)
                            client.sendFile(from, ImageBase64, 'image.png', 'Here you\'re', id)
                                .catch(() => {
                                    reply(resMsg.error.norm)
                                })
                        } catch (err) {
                            console.log(err)
                            await reply(resMsg.error.norm)
                        }

                    } else {
                        await reply(`Tidak ada gambar/format salah! Silahkan kirim gambar dengan caption ${prefix}memefy <teks_atas> | <teks_bawah>\ncontoh: ${prefix}memefy ini teks atas | ini teks bawah`)
                    }
                    break
                }

                case 'nulis': {
                    if (args.length == 0 && !isQuotedChat) return reply(`Membuat bot menulis teks yang dikirim menjadi gambar\nPemakaian: ${prefix}nulis [teks]\n\ncontoh: ${prefix}nulis i love you 3000`)
                    const content = isQuotedChat ? quotedMsgObj.content.toString() : arg
                    const ress = await api.tulis(content)
                        .catch((e) => {
                            console.log(e)
                            return reply(resMsg.error.norm)
                        })
                    await client.sendImage(from, ress, '', ``, id)
                        .catch((e) => {
                            console.log(e)
                            return reply(resMsg.error.norm)
                        })
                    break
                }

                //required to install libreoffice
                case 'doctopdf':
                case 'pdf': {
                    if (!isQuotedDocs) return reply(`Convert doc/docx/ppt/pptx menjadi pdf.\n\nKirim dokumen kemudian reply dokumen/filenya dengan ${prefix}pdf`)
                    if (/\.docx|\.doc|\.pptx|\.ppt/g.test(quotedMsg.filename) && isQuotedDocs) {
                        sendText(resMsg.wait)
                        const encDocs = await decryptMedia(quotedMsg)
                        toPdf(encDocs).then(
                            (pdfBuffer) => {
                                writeFileSync("./media/result.pdf", pdfBuffer)

                                client.sendFile(from, "./media/result.pdf", quotedMsg.filename.replace(/\.docx|\.doc|\.pptx|\.ppt/g, '.pdf'), id)
                            }, (err) => {
                                console.log(err)
                                sendText(resMsg.error.norm)
                            }
                        )
                    } else {
                        reply('Maaf format file tidak sesuai')
                    }
                    break
                }

                //Islam Command
                case 'listsurah': {
                    try {
                        get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                            .then((response) => {
                                let listsrh = '╔══✪〘 List Surah 〙✪\n'
                                response.data.data.forEach((data, i) => {
                                    listsrh += `╠ ${data[i].number}. `
                                    listsrh += data[i].name.transliteration.id.toLowerCase() + '\n'
                                })
                                listsrh += '╚═〘 *SeroBot* 〙'
                                reply(listsrh)
                            })
                    } catch (err) {
                        return reply(err)
                    }
                    break
                }

                case 'infosurah': {
                    if (args.length == 0) return reply(`*_${prefix}infosurah <nama surah>_*\nMenampilkan informasi lengkap mengenai surah tertentu. Contoh penggunan: ${prefix}infosurah al-baqarah`)
                    var responseh = await get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                        .catch(err => {
                            console.log(err)
                            return sendText(resMsg.error.norm)
                        })
                    var { data } = responseh.data
                    let idx = data.findIndex(function (post) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true
                    })
                    if (data[idx] === undefined) return reply(`Maaf format salah atau nama surah tidak sesuai`)
                    var pesan = ""
                    pesan = pesan + "Nama : " + data[idx].name.transliteration.id + "\n" + "Asma : " + data[idx].name.short + "\n" + "Arti : " + data[idx].name.translation.id + "\n" + "Jumlah ayat : " + data[idx].numberOfVerses + "\n" + "Nomor surah : " + data[idx].number + "\n" + "Jenis : " + data[idx].revelation.id + "\n" + "Keterangan : " + data[idx].tafsir.id
                    reply(pesan)
                    break
                }

                case 'surah': {
                    if (args.length == 0) return reply(`*_${prefix}surah <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1\n\n*_${prefix}surah <nama/nomor surah> <ayat> en/id_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Inggris / Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1 id\n${prefix}surah 1 1 id`)
                    let nmr = 0
                    if (isNaN(args[0])) {
                        let res = await get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                            .catch(err => {
                                console.log(err)
                                return sendText(resMsg.error.norm)
                            })
                        var { data } = res.data
                        let idx = data.findIndex(function (post) {
                            if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                                return true
                        })
                        if (data[idx] === undefined) return reply(`Maaf format salah atau nama surah tidak sesuai`)
                        nmr = data[idx].number
                    } else {
                        nmr = args[0]
                    }
                    var ayat = args[1] | 1

                    if (!isNaN(nmr)) {
                        var responseh2 = await get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                            .catch(err => {
                                console.log(err)
                                return sendText(resMsg.error.norm)
                            })
                        if (responseh2 === undefined) return reply(`Maaf error/format salah`)
                        var { data } = responseh2.data
                        let bhs = last(args)
                        let pesan = ""
                        pesan = pesan + data.text.arab + "\n\n"
                        if (bhs == "en") {
                            pesan = pesan + data.translation.en
                        } else {
                            pesan = pesan + data.translation.id
                        }
                        pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + ayat + ")"
                        await reply(pesan.trim())
                    }
                    break
                }

                case 'tafsir': {
                    if (args.length == 0) return reply(`*_${prefix}tafsir <nama/nomor surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahan dan tafsirnya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}tafsir al-baqarah 1`)
                    let nmr = 0
                    if (isNaN(args[0])) {
                        let res = await get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                            .catch(err => {
                                console.log(err)
                                return sendText(resMsg.error.norm)
                            })
                        var { data } = res.data
                        let idx = data.findIndex(function (post) {
                            if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                                return true
                        })
                        if (data[idx] === undefined) return reply(`Maaf format salah atau nama surah tidak sesuai`)
                        nmr = data[idx].number
                    } else {
                        nmr = args[0]
                    }
                    var ayat = args[1] | 1
                    console.log(nmr)
                    if (!isNaN(nmr)) {
                        var responsih = await get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                            .catch(err => {
                                console.log(err)
                                return sendText(resMsg.error.norm)
                            })
                        var { data } = responsih.data
                        pesan = ""
                        pesan = pesan + "Tafsir Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + "\n\n"
                        pesan = pesan + data.text.arab + "\n\n"
                        pesan = pesan + "_" + data.translation.id + "_" + "\n\n" + data.tafsir.id.long
                        reply(pesan)
                    }
                    break
                }

                case 'alaudio': {
                    if (args.length == 0) return reply(`*_${prefix}ALaudio <nama/nomor surah>_*\nMenampilkan tautan dari audio surah tertentu. Contoh penggunaan : ${prefix}ALaudio al-fatihah\n\n*_${prefix}ALaudio <nama/nomor surah> <ayat>_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1\n\n*_${prefix}ALaudio <nama/nomor surah> <ayat> en_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Inggris. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1 en`)
                    let nmr = 0
                    if (isNaN(args[0])) {
                        let res = await get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                            .catch(err => {
                                console.log(err)
                                return sendText(resMsg.error.norm)
                            })
                        var { data } = res.data
                        let idx = data.findIndex(function (post) {
                            if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                                return true
                        })
                        if (data[idx] === undefined) return reply(`Maaf format salah atau nama surah tidak sesuai`)
                        nmr = data[idx].number
                    } else {
                        nmr = args[0]
                    }
                    var ayat = args[1]
                    console.log(nmr)
                    if (!isNaN(nmr)) {
                        if (args.length > 2) {
                            ayat = args[1]
                        }
                        if (args.length == 2) {
                            ayat = last(args)
                        }
                        pesan = ""
                        if (isNaN(ayat)) {
                            let responsih2 = await get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah/' + nmr + '.json')
                                .catch(err => {
                                    console.log(err)
                                    sendText(resMsg.error.norm)
                                })
                            var { name, name_translations, number_of_ayah, number_of_surah, recitations } = responsih2.data
                            pesan = pesan + "Audio Quran Surah ke-" + number_of_surah + " " + name + " (" + name_translations.ar + ") " + "dengan jumlah " + number_of_ayah + " ayat\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[0].name + " :\n" + recitations[0].audio_url + "\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[1].name + " :\n" + recitations[1].audio_url + "\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[2].name + " :\n" + recitations[2].audio_url + "\n"
                            reply(pesan)
                        } else {
                            let responsih2 = await get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                                .catch(err => {
                                    console.log(err)
                                    return sendText(resMsg.error.norm)
                                })
                            var { data } = responsih2.data
                            let bhs = last(args)
                            let pesan = ""
                            pesan = pesan + data.text.arab + "\n\n"
                            if (bhs == "en") {
                                pesan = pesan + data.translation.en
                            } else {
                                pesan = pesan + data.translation.id
                            }
                            pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
                            await client.sendFileFromUrl(from, data.audio.secondary[0], '', '', id)
                            await reply(pesan)
                        }
                    }
                    break
                }

                case 'jsholat':
                case 'jsolat': {
                    if (args.length === 0) return reply(`ketik *${prefix}jsholat <nama kabupaten>* untuk melihat jadwal sholat\nContoh: *${prefix}jsholat sleman*\nUntuk melihat daftar daerah, ketik *${prefix}jsholat daerah*`)
                    if (args[0] == 'daerah') {
                        var datad = await get('https://api.banghasan.com/sholat/format/json/kota')
                            .catch(err => {
                                console.log(err)
                                return sendText(resMsg.error.norm)
                            })
                        var datas = datad.data.kota
                        let hasil = '╔══✪〘 Daftar Kota 〙✪\n'
                        for (let d of datas) {
                            var kota = d.nama
                            hasil += '╠➥ '
                            hasil += `${kota}\n`
                        }
                        hasil += '╚═〘 *SeroBot* 〙'
                        await reply(hasil)
                    } else {
                        var datak = await get('https://api.banghasan.com/sholat/format/json/kota/nama/' + args[0])
                            .catch(err => {
                                console.log(err)
                                return sendText(resMsg.error.norm)
                            })
                        try {
                            var kodek = datak.data.kota[0].id
                        } catch (err) {
                            return reply('Kota tidak ditemukan')
                        }
                        var tgl = moment(t * 1000).format('YYYY-MM-DD')
                        var datas = await get('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + kodek + '/tanggal/' + tgl)
                        var jadwals = datas.data.jadwal.data
                        let jadwal = `╔══✪〘 Jadwal Sholat di ${args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n`
                        jadwal += `╠> \`\`\`Imsak    : ` + jadwals.imsak + '\`\`\`\n'
                        jadwal += `╠> \`\`\`Subuh    : ` + jadwals.subuh + '\`\`\`\n'
                        jadwal += `╠> \`\`\`Dzuhur   : ` + jadwals.dzuhur + '\`\`\`\n'
                        jadwal += `╠> \`\`\`Ashar    : ` + jadwals.ashar + '\`\`\`\n'
                        jadwal += `╠> \`\`\`Maghrib  : ` + jadwals.maghrib + '\`\`\`\n'
                        jadwal += `╠> \`\`\`Isya\'    : ` + jadwals.isya + '\`\`\`\n'
                        jadwal += '╚═〘 *SeroBot* 〙'
                        reply(jadwal)
                    }
                    break
                }
                //Group All User
                case 'grouplink': {
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    if (isGroupMsg) {
                        const inviteLink = await client.getGroupInviteLink(groupId)
                        client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name || formattedTitle}* Gunakan *${prefix}revoke* untuk mereset Link group`)
                    } else {
                        reply(resMsg.error.group)
                    }
                    break
                }
                case "revoke": {
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    if (isBotGroupAdmins) {
                        client.revokeGroupInviteLink(from)
                            .then(() => {
                                reply(`Berhasil Revoke Grup Link gunakan *${prefix}grouplink* untuk mendapatkan group invite link yang terbaru`)
                            })
                            .catch((err) => {
                                return console.log(`[ERR] ${err}`)
                            })
                    }
                    break
                }

                //Media
                case 'ytmp3': {
                    if (args.length == 0) return reply(`Untuk mendownload audio dari youtube\nketik: ${prefix}ytmp3 <link yt> (don't include <> symbol)`)
                    if (arg.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/) === null) return reply(`Link youtube tidak valid.`)
                    sendText(resMsg.wait)
                    let ytid = args[0].substr((args[0].indexOf('=')) != -1 ? (args[0].indexOf('=') + 1) : (args[0].indexOf('be/') + 3))
                    try {
                        ytid = ytid.replace(/&.+/g, '')
                        let time = moment(t * 1000).format('mmss')
                        let path = `./media/temp_${time}.mp3`

                        let stream = ytdl(ytid, { quality: 'highestaudio' })

                        ffmpeg({ source: stream })
                            .setFfmpegPath('./bin/ffmpeg')
                            .on('error', (err) => {
                                console.log('An error occurred: ' + err.message)
                                reply(resMsg.error.norm)
                            })
                            .on('end', () => {
                                client.sendFile(from, path, `${ytid}.mp3`, '').then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                            })
                            .saveToFile(path)
                        if (existsSync(path)) unlinkSync(path)
                    } catch (err) {
                        console.log(err)
                        reply(resMsg.error.norm)
                    }
                    break
                }

                case 'play': { //silahkan kalian custom sendiri jika ada yang ingin diubah
                    if (args.length == 0) return reply(`Untuk mencari lagu dari youtube\n\nPenggunaan: ${prefix}play <judul lagu>\nContoh: ${prefix}play radioactive but im waking up`)
                    let ytresult = await api.ytsearch(arg).catch(err => {
                        console.log(err)
                        return reply(resMsg.error.norm)
                    })

                    if (!ytresult.hasOwnProperty('duration')) return reply(`Maaf fitur sedang dalam perbaikan`)

                    try {
                        if (ytresult.seconds > 600) return reply(`Error. Durasi video lebih dari 10 menit!`)
                        let estimasi = ytresult.seconds / 100
                        let est = estimasi.toFixed(0)

                        await client.sendFileFromUrl(from, `${ytresult.thumbnail}`, ``, `Video ditemukan\n\nJudul: ${ytresult.title}\nDurasi: ${ytresult.timestamp}\nUploaded: ${ytresult.ago}\nView: ${ytresult.views}\nUrl: ${ytresult.url}\n\nAudio sedang dikirim ± ${est} menit`, id)

                        //Download video and save as MP3 file
                        let time = moment(t * 1000).format('mmss')
                        let path = `./media/temp_${time}.mp3`

                        let stream = ytdl(ytresult.videoId, { quality: 'highestaudio' })
                        ffmpeg({ source: stream })
                            .setFfmpegPath('./bin/ffmpeg')
                            .on('error', (err) => {
                                console.log('An error occurred: ' + err.message)
                                reply(resMsg.error.norm)
                            })
                            .on('end', () => {
                                client.sendFile(from, path, `audio.mp3`, '', id).then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                            })
                            .saveToFile(path)
                        if (existsSync(path)) unlinkSync(path)
                    } catch (err) {
                        console.log(err)
                        reply(resMsg.error.norm)
                    }
                    break
                }

                case 'earrape': {
                    if (!isQuotedPtt && !isQuotedAudio) return reply(`Menambah volume suara tinggi. Silakan quote/balas audio atau voice notes dengan perintah ${prefix}earrape`)
                    const _inp = await decryptMedia(quotedMsg)

                    let time = moment(t * 1000).format('mmss')
                    let inpath = `./media/inearrape_${time}.mp3`
                    let outpath = `./media/outearrape_${time}.mp3`
                    writeFileSync(inpath, _inp)

                    ffmpeg(inpath)
                        .setFfmpegPath('./bin/ffmpeg')
                        .complexFilter('acrusher=level_in=2:level_out=6:bits=8:mode=log:aa=1,lowpass=f=3500')
                        .on('error', (err) => {
                            console.log('An error occurred: ' + err.message)
                            reply(resMsg.error.norm)
                        })
                        .on('end', () => {
                            client.sendFile(from, outpath, 'earrape.mp3', '', id).then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                        })
                        .saveToFile(outpath)
                    if (existsSync(inpath)) unlinkSync(inpath)
                    if (existsSync(outpath)) unlinkSync(outpath)
                    break
                }

                case 'robot': {
                    if (!isQuotedPtt && !isQuotedAudio) return reply(`Mengubah suara seperti robot. Silakan quote/balas audio atau voice notes dengan perintah ${prefix}robot`)
                    const _inp = await decryptMedia(quotedMsg)

                    let time = moment(t * 1000).format('mmss')
                    let inpath = `./media/inrobot_${time}.mp3`
                    let outpath = `./media/outrobot_${time}.mp3`
                    writeFileSync(inpath, _inp)

                    ffmpeg(inpath)
                        .setFfmpegPath('./bin/ffmpeg')
                        .complexFilter(`afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75`)
                        .on('error', (err) => {
                            console.log('An error occurred: ' + err.message)
                            reply(resMsg.error.norm)
                        })
                        .on('end', () => {
                            client.sendFile(from, outpath, 'robot.mp3', '', id).then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                        })
                        .saveToFile(outpath)
                    if (existsSync(inpath)) unlinkSync(inpath)
                    if (existsSync(outpath)) unlinkSync(outpath)
                    break
                }

                case 'reverse': {
                    if (!isQuotedPtt && !isQuotedAudio) return reply(`Memutar balik suara. Silakan quote/balas audio atau voice notes dengan perintah ${prefix}reverse`)
                    const _inp = await decryptMedia(quotedMsg)

                    let time = moment(t * 1000).format('mmss')
                    let inpath = `./media/inreverse_${time}.mp3`
                    let outpath = `./media/outreverse_${time}.mp3`
                    writeFileSync(inpath, _inp)

                    ffmpeg(inpath)
                        .setFfmpegPath('./bin/ffmpeg')
                        .complexFilter(`areverse`)
                        .on('error', (err) => {
                            console.log('An error occurred: ' + err.message)
                            reply(resMsg.error.norm)
                        })
                        .on('end', () => {
                            client.sendFile(from, outpath, 'reverse.mp3', '', id).then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                        })
                        .saveToFile(outpath)
                    if (existsSync(inpath)) unlinkSync(inpath)
                    if (existsSync(outpath)) unlinkSync(outpath)
                    break
                }

                case 'samarkan': {
                    if (!isQuotedPtt && !isQuotedAudio) return reply(`Samarkan suara ala investigasi. Silakan reply audio atau voice notes dengan perintah ${prefix}samarkan`)
                    const _inp = await decryptMedia(quotedMsg)

                    let time = moment(t * 1000).format('mmss')
                    let inpath = `./media/insamarkan_${time}.mp3`
                    let outpath = `./media/outsamarkan_${time}.mp3`
                    writeFileSync(inpath, _inp)

                    ffmpeg(inpath)
                        .setFfmpegPath('./bin/ffmpeg')
                        .complexFilter(`rubberband=pitch=1.5`)
                        .on('error', (err) => {
                            console.log('An error occurred: ' + err.message)
                            reply(resMsg.error.norm)
                        })
                        .on('end', () => {
                            client.sendFile(from, outpath, 'samarkan.mp3', '', id).then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                        })
                        .saveToFile(outpath)
                    if (existsSync(inpath)) unlinkSync(inpath)
                    if (existsSync(outpath)) unlinkSync(outpath)
                    break
                }

                case 'vibrato': {
                    if (!isQuotedPtt && !isQuotedAudio) return reply(`Mengubah suara menjadi bergetar. Silakan quote/balas audio atau voice notes dengan perintah ${prefix}vibrato`)
                    const _inp = await decryptMedia(quotedMsg)

                    let time = moment(t * 1000).format('mmss')
                    let inpath = `./media/invibrato_${time}.mp3`
                    let outpath = `./media/outvibrato_${time}.mp3`
                    writeFileSync(inpath, _inp)

                    ffmpeg(inpath)
                        .setFfmpegPath('./bin/ffmpeg')
                        .complexFilter(`vibrato=f=8`)
                        .on('error', (err) => {
                            console.log('An error occurred: ' + err.message)
                            reply(resMsg.error.norm)
                        })
                        .on('end', () => {
                            client.sendFile(from, outpath, 'vibrato.mp3', '', id).then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                        })
                        .saveToFile(outpath)
                    if (existsSync(inpath)) unlinkSync(inpath)
                    if (existsSync(outpath)) unlinkSync(outpath)
                    break
                }

                case 'nightcore': {
                    if (!isQuotedPtt && !isQuotedAudio) return reply(`Mengubah suara ala nightcore. Silakan quote/balas audio atau voice notes dengan perintah ${prefix}nightcore`)
                    const _inp = await decryptMedia(quotedMsg)

                    let time = moment(t * 1000).format('mmss')
                    let inpath = `./media/innightcore_${time}.mp3`
                    let outpath = `./media/outnightcore_${time}.mp3`
                    writeFileSync(inpath, _inp)

                    ffmpeg(inpath)
                        .setFfmpegPath('./bin/ffmpeg')
                        .audioFilters('asetrate=44100*1.25,firequalizer=gain_entry=\'entry(0,3);entry(250,2);entry(1000,0);entry(4000,-2);entry(16000,-3)\'')
                        .on('error', (err) => {
                            console.log('An error occurred: ' + err.message)
                            reply(resMsg.error.norm)
                        })
                        .on('end', () => {
                            client.sendFile(from, outpath, 'nightcore.mp3', '', id).then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                        })
                        .saveToFile(outpath)
                    if (existsSync(inpath)) unlinkSync(inpath)
                    if (existsSync(outpath)) unlinkSync(outpath)
                    break
                }

                case 'deepslow': {
                    if (!isQuotedPtt && !isQuotedAudio) return reply(`Mengubah suara menjadi deep dan pelan. Silakan quote/balas audio atau voice notes dengan perintah ${prefix}deepslow`)
                    const _inp = await decryptMedia(quotedMsg)

                    let time = moment(t * 1000).format('mmss')
                    let inpath = `./media/indeepslow_${time}.mp3`
                    let outpath = `./media/outdeepslow_${time}.mp3`
                    writeFileSync(inpath, _inp)

                    ffmpeg(inpath)
                        .setFfmpegPath('./bin/ffmpeg')
                        .audioFilters('atempo=1.1,asetrate=44100*0.7,firequalizer=gain_entry=\'entry(0,3);entry(250,2);entry(1000,0);entry(4000,-2);entry(16000,-3)\'')
                        .on('error', (err) => {
                            console.log('An error occurred: ' + err.message)
                            reply(resMsg.error.norm)
                        })
                        .on('end', () => {
                            client.sendFile(from, outpath, 'deepslow.mp3', '', id).then(console.log(color('[LOGS]', 'grey'), `Audio Processed for ${processTime(t, moment())} Second`))
                        })
                        .saveToFile(outpath)
                    if (existsSync(inpath)) unlinkSync(inpath)
                    if (existsSync(outpath)) unlinkSync(outpath)
                    break
                }

                case 'tiktok':
                case 'tiktok1':
                case 'tiktok2':
                case 'tiktok3': {
                    if (args.length === 0 && !isQuotedChat) return reply(`Download Tiktok tanpa watermark. Bagaimana caranya?\nTinggal ketik ${prefix}tiktok (alamat video tiktok)\nTanpa tanda kurung`)
                    let urls = isQuotedChat ? quotedMsg.body : arg
                    if (!isUrl(urls)) { return reply('Maaf, link yang kamu kirim tidak valid.') }
                    await sendText(resMsg.wait)

                    let result = await scraper.snaptikLight(urls).catch(err => reply(resMsg.error.norm).then(() => console.log(err)))
                    let _id = quotedMsg != null ? quotedMsg.id : id
                    let _mp4Url = ''
                    switch(command) {
                        case 'tiktok': _mp4Url = result.source; break
                        case 'tiktok1': _mp4Url = result.server1; break
                        case 'tiktok2': _mp4Url = result.server2; break
                        case 'tiktok3': _mp4Url = result.server3; break
                        default :
                    }
                    await client.sendFileFromUrl(from, _mp4Url, '', '', _id).catch(err => reply(resMsg.error.norm + `\nGunakan *${prefix}tiktok1 ${prefix}tiktok2* atau *${prefix}tiktok3* untuk mencoba server lain`).then(() => console.log(err)))
                    break
                }

                case 'tiktokmp3': {
                    if (args.length === 0 && !isQuotedChat) return reply(`Download Tiktok music/mp3. How?\n${prefix}tiktokmp3 (alamat video tiktok)\nTanpa tanda kurung`)
                    let urls = isQuotedChat ? quotedMsg.body : arg
                    if (!isUrl(urls)) { return reply('Maaf, link yang kamu kirim tidak valid.') }
                    await sendText(resMsg.wait)
                    let result = await scraper.ssstik(browser, urls).catch(err => reply(resMsg.error.norm).then(() => console.log(err)))
                    let _id = quotedMsg != null ? quotedMsg.id : id
                    await client.sendFileFromUrl(from, result.mp3, '', '', _id).catch(err => reply(resMsg.error.norm).then(() => console.log(err)))
                    break
                }

                case 'artinama':
                    if (args.length == 0) return reply(`Untuk mengetahui arti nama seseorang\nketik ${prefix}artinama nama kamu`)
                    api.artinama(arg)
                        .then(res => {
                            reply(res)
                        })
                        .catch(() => {
                            reply(resMsg.error.norm)
                        })
                    break

                // Random Kata
                case 'fakta':
                    fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
                        .then(res => res.text())
                        .then(body => {
                            let splitnix = body.split('\n')
                            let randomnix = sample(splitnix)
                            reply(randomnix)
                        })
                        .catch(() => {
                            reply(resMsg.error.norm)
                        })
                    break
                case 'katabijak':
                    fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
                        .then(res => res.text())
                        .then(body => {
                            let splitbijak = body.split('\n')
                            let randombijak = sample(splitbijak)
                            reply(randombijak)
                        })
                        .catch(() => {
                            reply(resMsg.error.norm)
                        })
                    break
                case 'pantun':
                    fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
                        .then(res => res.text())
                        .then(body => {
                            let splitpantun = body.split('\n')
                            let randompantun = sample(splitpantun)
                            reply(' ' + randompantun.replace(/aruga-line/g, "\n"))
                        })
                        .catch(() => {
                            reply(resMsg.error.norm)
                        })
                    break
                case 'quote':
                case 'quotes':
                    const quotex = await api.quote()
                        .catch(() => {
                            reply(resMsg.error.norm)
                        })
                    await reply(quotex)
                        .catch(() => {
                            reply(resMsg.error.norm)
                        })
                    break

                //Random Images
                case 'anime':
                    if (args.length == 0) return reply(`Untuk menggunakan ${prefix}anime\nSilahkan ketik: ${prefix}anime [query]\nContoh: ${prefix}anime random\n\nquery yang tersedia:\nrandom, waifu, husbu, neko`)
                    if (args[0] == 'random' || args[0] == 'waifu' || args[0] == 'husbu' || args[0] == 'neko') {
                        fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/' + args[0] + '.txt')
                            .then(res => res.text())
                            .then(body => {
                                let randomnime = body.split('\n')
                                let randomnimex = sample(randomnime)
                                client.sendFileFromUrl(from, randomnimex, '', 'Nih...', id)
                            })
                            .catch(() => {
                                reply(resMsg.error.norm)
                            })
                    } else {
                        reply(`Maaf query tidak tersedia. Silahkan ketik ${prefix}anime untuk melihat list query`)
                    }
                    break
                case 'kpop':
                    if (args.length == 0) return reply(`Untuk menggunakan ${prefix}kpop\nSilahkan ketik: ${prefix}kpop [query]\nContoh: ${prefix}kpop bts\n\nquery yang tersedia:\nblackpink, exo, bts\n\nUntuk query lain gunakan ${prefix}pinterest`)
                    if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
                        fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
                            .then(res => res.text())
                            .then(body => {
                                let randomkpop = body.split('\n')
                                let randomkpopx = sample(randomkpop)
                                client.sendFileFromUrl(from, randomkpopx, '', 'Nih...', id)
                            })
                            .catch(() => {
                                reply(resMsg.error.norm)
                            })
                    } else {
                        reply(`Maaf query tidak tersedia. Silahkan ketik ${prefix}kpop untuk melihat list query`)
                    }
                    break

                case 'memes':
                    const randmeme = await meme.random()
                    client.sendFileFromUrl(from, randmeme.url, '', randmeme.title, id)
                        .catch(() => {
                            reply(resMsg.error.norm)
                        })
                    break

                // Search Any
                case 'pin':
                case 'pinterest': {
                    if (args.length == 0) return reply(`Untuk mencari gambar dari pinterest\nketik: ${prefix}pinterest [search]\ncontoh: ${prefix}pinterest naruto`)
                    if (args[0] === '+') {
                        await api.pinterest(arg.trim().substring(arg.indexOf(' ') + 1))
                            .then(res => {
                                let img = sample(res, 10)
                                img.forEach(async i => {
                                    if (i != null) await client.sendFileFromUrl(from, i, '', '')
                                })
                            })
                    } else {
                        await api.pinterest(arg)
                            .then(res => {
                                let img = sample(res)
                                if (img === null || img === undefined) return reply(resMsg.error.norm + `\nAtau result tidak ditemukan.`)

                                client.sendFileFromUrl(from, img, '', '', id)
                                    .catch(e => {
                                        console.log(`fdci err : ${e}`)
                                        reply(resMsg.error.norm + '\nCoba gunakan /pin2 atau /pinterest2')
                                    })
                            })
                            .catch(e => {
                                console.log(`fdci err : ${e}`)
                                return reply(resMsg.error.norm + '\nCoba gunakan /pin2 atau /pinterest2')
                            })
                    }
                    break
                }

                case 'pinterest2':
                case 'pin2': {
                    if (args.length == 0) return reply(`Untuk mencari gambar dari pinterest v2.\nketik: ${prefix}pin2 [search]\ncontoh: ${prefix}pin2 naruto\n\nGunakan apabila /pinterest atau /pin error`)
                    let img = await scraper.pinterest(browser, arg).catch(e => {
                        console.log(`pin2 err : ${e}`)
                        return reply(resMsg.error.norm)
                    })
                    if (img === null) return reply(resMsg.error.norm).then(() => console.log(`img return null`))
                    await client.sendFileFromUrl(from, img, '', '', id).catch(e => {
                        console.log(`send pin2 err : ${e}`)
                        return reply(resMsg.error.norm)
                    })
                    break
                }

                case 'image':
                case 'images':
                case 'gimg':
                case 'gimage': {
                    if (args.length == 0) return reply(`Untuk mencari gambar dari google image\nketik: ${prefix}gimage [search]\ncontoh: ${prefix}gimage naruto`)
                    const img = await scraper.gimage(browser, arg).catch(e => {
                        console.log(`gimage err : ${e}`)
                        return reply(resMsg.error.norm)
                    })
                    if (img === null) return reply(resMsg.error.norm).then(() => console.log(`img return null`))
                    await client.sendFileFromUrl(from, img, '', '', id).catch(e => {
                        console.log(`send gimage err : ${e}`)
                        return reply(resMsg.error.norm)
                    })
                    break
                }

                case 'crjogja': {
                    const url1 = 'http://api.screenshotlayer.com/api/capture?access_key=f56691eb8b1edb4062ed146cccaef885&url=https://sipora.staklimyogyakarta.com/radar/&viewport=600x600&width=600&force=1'
                    const url2 = 'https://screenshotapi.net/api/v1/screenshot?token=FREB5SDBA2FRMO4JDMSHXAEGNYLKYCA4&url=https%3A%2F%2Fsipora.staklimyogyakarta.com%2Fradar%2F&width=600&height=600&fresh=true&output=image'
                    let isTrue = Boolean(Crypto.randomInt(0, 2))
                    const urL = isTrue ? url1 : url2

                    await sendText('Gotcha, please wait!')
                    await client.simulateTyping(from, true)
                    await client.sendFileFromUrl(from, urL, '', 'Captured from https://sipora.staklimyogyakarta.com/radar/', id)
                        .then(() => {
                            client.simulateTyping(from, false)
                        })
                        .catch(() => {
                            reply('Ada yang error! Coba lagi beberapa saat kemudian. Mending cek sendiri aja ke\nhttps://sipora.staklimyogyakarta.com/radar/')
                        })
                    break
                }

                case 'reddit':
                case 'subreddit':
                case 'sreddit': {
                    if (args.length == 0) return reply(`Untuk mencari gambar dari sub reddit\nketik: ${prefix}sreddit [search]\ncontoh: ${prefix}sreddit naruto`)
                    const hasilreddit = await api.sreddit(arg)
                    await client.sendFileFromUrl(from, hasilreddit.url, '', hasilreddit.title, id)
                        .catch((e) => {
                            console.log(e)
                            reply(resMsg.error.norm)
                        })
                    break
                }

                case 'nekopoi': {
                    if (isGroupMsg) {
                        reply('Untuk Fitur Nekopoi Silahkan Lakukan di Private Message')
                    } else {
                        reply('Insyaf bro')
                    }
                    break
                }
                case 'cuaca':
                    if (args.length == 0) return reply(`Untuk melihat cuaca pada suatu daerah\nketik: ${prefix}cuaca [daerah]`)
                    const cuacaq = body.slice(7)
                    const cuacap = await api.cuaca(cuacaq)
                    await reply(cuacap)
                        .catch(() => {
                            reply(resMsg.error.norm)
                        })
                    break

                case 'whatanime': {
                    if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                        let mediaData
                        if (isMedia) {
                            mediaData = await decryptMedia(message)
                        } else {
                            mediaData = await decryptMedia(quotedMsg)
                        }
                        const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        reply('Searching....')
                        fetch('https://trace.moe/api/search', {
                            method: 'POST',
                            body: JSON.stringify({ image: imgBS4 }),
                            headers: { "Content-Type": "application/json" }
                        })
                            .then(respon => respon.json())
                            .then(resolt => {
                                if (resolt.docs && resolt.docs.length <= 0) {
                                    reply('Maaf, saya tidak tau ini anime apa, pastikan gambar yang akan di Search tidak Buram/Kepotong')
                                }
                                const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                                teks = ''
                                if (similarity < 0.92) {
                                    teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                                }
                                teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                                teks += `➸ *R-18?* : ${is_adult}\n`
                                teks += `➸ *Eps* : ${episode.toString()}\n`
                                teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                                var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                                client.sendFileFromUrl(from, video, 'anime.mp4', teks, id).catch(() => {
                                    reply(teks)
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                reply(resMsg.error.norm)
                            })
                    } else {
                        reply(`Maaf format salah\n\nSilahkan kirim foto dengan caption ${prefix}whatanime\n\nAtau reply foto dengan caption ${prefix}whatanime`)
                    }
                    break
                }

                case 'lirik':
                case 'lyric': {
                    if (args.length === 0) return reply(`Untuk mencari lirik dengan nama lagu atau potongan lirik\nketik: ${prefix}lirik <query>\nContoh: ${prefix}lirik lathi`)
                    let res = await api.lirik(arg).catch(err => reply(resMsg.error.norm).then(() => console.log(err)))
                    if (res == null) return reply(`Lirik tidak ditemukan.`)
                    await reply(res.lirik)
                    break
                }


                //Hiburan
                case 'tod':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    reply(`Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang diberikan.\n\nSilahkan Pilih:\n-> ${prefix}truth\n-> ${prefix}dare`)
                    break

                case 'truth':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    let truths = readFileSync('./random/truth.txt', 'utf8')
                    let _truth = sample(truths.split('\n'))
                    await reply(_truth)
                        .catch((err) => {
                            console.log(err)
                            reply(resMsg.error.norm)
                        })
                    break

                case 'dare':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    let dares = readFileSync('./random/dare.txt', 'utf8')
                    let _dare = sample(dares.split('\n'))
                    await reply(_dare)
                        .catch((err) => {
                            console.log(err)
                            reply(resMsg.error.norm)
                        })
                    break

                //Tebak Gambar
                case 'tgb':
                case 'tebakgambar': {
                    const cek = await tebakgb.getAns(from)
                    if (cek != false) return reply(`Sesi tebak gambar sedang berlangsung. ${prefix}skip untuk skip sesi.`)
                    await tebakgb.getTebakGambar(from).then(async res => {
                        let waktu = res.ans.split(' ').length - 1
                        let detik = waktu * 60
                        await client.sendFileFromUrl(from, res.url, '', `Tebak Gambar diatas. \nJawab dengan mengirimkan jawabannya langsung.\n\nWaktunya ${waktu} menit.\n\n*${prefix}skip* untuk skip`, id)
                            .then(() => {
                                sleep(detik * 1000 / 4).then(async () => {
                                    const ans = await tebakgb.getAns(from)
                                    if (ans === false) return true
                                    else sendText(`⏳ ${((detik * 1000) - (detik * 1000 / 4 * 1)) / 1000} detik lagi`)
                                    sleep(detik * 1000 / 4).then(async () => {
                                        const ans1 = await tebakgb.getAns(from)
                                        if (ans1 === false) return true
                                        else sendText(`⏳ ${((detik * 1000) - (detik * 1000 / 4 * 2)) / 1000} detik lagi\nHint: ${res.ans.replace(/\s/g, '\t').replace(/[^aeiou\t]/g, '_ ')}`)
                                        sleep(detik * 1000 / 4).then(async () => {
                                            const ans2 = await tebakgb.getAns(from)
                                            if (ans2 === false) return true
                                            else sendText(`⏳ ${((detik * 1000) - (detik * 1000 / 4 * 3)) / 1000} detik lagi`)
                                            sleep(detik * 1000 / 4).then(async () => {
                                                const ans3 = await tebakgb.getAns(from)
                                                if (ans3 === false) return true
                                                else sendText(`⌛ Waktu habis!\nJawabannya adalah: *${res.ans}*`)
                                                tebakgb.delData(from)
                                            })
                                        })
                                    })
                                })
                            })
                    }).catch((err) => {
                        console.log(err)
                        reply(resMsg.error.norm)
                    })
                    break
                }

                case 'skip': {
                    tebakgb.getAns(from).then(res => {
                        reply(`Sesi tebak gambar telah diskip!\nJawabannya: *${res.ans}*`)
                        tebakgb.delData(from)
                    })
                    break
                }


                // Other Command
                case 'resi':
                case 'cekresi':
                    if (args.length != 2) return reply(`Maaf, format pesan salah.\nSilahkan ketik pesan dengan ${prefix}resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`)
                    const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
                    if (!kurirs.includes(args[0])) return sendText(`Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
                    console.log(color('[LOGS]', 'grey'), 'Memeriksa No Resi', args[1], 'dengan ekspedisi', args[0])
                    cekResi(args[0], args[1]).then((result) => sendText(result))
                    break

                case 'tts':
                case 'say':
                    if (!isQuotedChat && args.length != 0) {
                        try {
                            if (arg1 === '') return reply('Apa teksnya syg..')
                            let gtts = new gTTS(arg1, args[0])
                            gtts.save('./media/tts.mp3', function () {
                                client.sendPtt(from, './media/tts.mp3')
                                    .catch(err => {
                                        console.log(err)
                                        sendText(resMsg.error.norm)
                                    })
                            })
                        } catch (err) {
                            console.log(color('[ERR>]', 'red'), err.name, err.message)
                            reply(err.name + '! ' + err.message + '\nUntuk kode bahasa cek disini : https://anotepad.com/note/read/7fd833h4')
                        }
                    }
                    else if (isQuotedChat && args.length != 0) {
                        try {
                            const dataText = quotedMsgObj.content.toString()
                            let gtts = new gTTS(dataText, args[0])
                            gtts.save('./media/tts.mp3', function () {
                                client.sendPtt(from, './media/tts.mp3', quotedMsgObj.id)
                                    .catch(err => {
                                        console.log(err)
                                        sendText(resMsg.error.norm)
                                    })
                            })
                        } catch (err) {
                            console.log(color('[ERR>]', 'red'), err.name, err.message)
                            reply(err.name + '! ' + err.message + '\nUntuk kode bahasa cek disini : https://anotepad.com/note/read/7fd833h4')
                        }
                    }
                    else {
                        await reply(`Mengubah teks menjadi sound (google voice)\nketik: ${prefix}tts <kode_bahasa> <teks>\ncontoh : ${prefix}tts id halo\nuntuk kode bahasa cek disini : https://anotepad.com/note/read/7fd833h4`)
                    }
                    break

                case 'cekcovid':
                    if (!isQuotedLocation) return reply(`Maaf, format pesan salah.\nKirimkan lokasi dan reply dengan caption ${prefix}cekcovid`)

                    reply('Okey sebentar...')
                    console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
                    const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
                    if (zoneStatus.kode != 200) sendText('Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
                    let datax = ''
                    zoneStatus.data.forEach((z, i) => {
                        const { zone, region } = z
                        const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
                        datax += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
                    })
                    const text = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${datax}`
                    sendText(text)
                    break

                case 'shortlink':
                    if (args.length == 0) return reply(`ketik ${prefix}shortlink <url>`)
                    if (!isUrl(args[0])) return reply('Maaf, url yang kamu kirim tidak valid. Pastikan menggunakan format http/https')
                    const shortlink = await urlShortener(args[0])
                    await sendText(shortlink)
                        .catch((err) => {
                            console.log(err)
                            reply(resMsg.error.norm)
                        })
                    break

                case 'hilih':
                    if (args.length != 0 || isQuotedChat) {
                        const _input = isQuotedChat ? quotedMsgObj.content.toString() : body.slice(7)
                        const _id = isQuotedChat ? quotedMsgObj.id : id
                        const _res = _input.replace(/[aiueo]/g, 'i')
                        reply(_res, _id)
                    }
                    else {
                        await reply(`Mengubah kalimat menjadi hilih gitu deh\n\nketik ${prefix}hilih kalimat\natau reply chat menggunakan ${prefix}hilih`)
                    }
                    break

                case 'klasemen':
                case 'klasmen':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isNgegas) return reply(`Anti-Toxic tidak aktif, aktifkan menggunakan perintah ${prefix}antikasar on`)
                    try {
                        const klasemen = db.chain.get('group').filter({ id: groupId }).map('members').value()[0]
                        if (klasemen == null) return reply(`Belum ada yang berkata kasar`)
                        let urut = Object.entries(klasemen).map(([key, val]) => ({ id: key, ...val })).sort((a, b) => b.denda - a.denda);
                        let textKlas = "*Klasemen Denda Sementara*\n"
                        let i = 1;
                        urut.forEach((klsmn) => {
                            textKlas += i + ". @" + klsmn.id.replace('@c.us', '') + " ➤ Rp" + formatin(klsmn.denda) + "\n"
                            i++
                        })
                        await client.sendTextWithMentions(from, textKlas)
                    } catch (err) {
                        console.log(err)
                        reply(resMsg.error.norm)
                    }
                    break

                case 'skripsi': {
                    let skripsis = readFileSync('./random/skripsi.txt', 'utf8')
                    let _skrps = sample(skripsis.split('\n'))
                    let gtts = new gTTS(_skrps, 'id')
                    try {
                        gtts.save('./media/tts.mp3', function () {
                            client.sendPtt(from, './media/tts.mp3')
                                .catch(err => {
                                    console.log(err)
                                    sendText(resMsg.error.norm)
                                })
                        })
                    } catch (err) {
                        console.log(err)
                        reply(resMsg.error.norm)
                    }
                    break
                }

                case 'apakah': {
                    let x = Crypto.randomInt(0, 10)
                    let result = ''
                    if (args.length === 0) result = 'Apakah apa woy yang jelas dong! Misalnya, apakah aku ganteng?'
                    else {
                        if (x >= 0 && x <= 3) result = 'Iya'
                        else if (x >= 4 && x <= 7) result = 'Tidak'
                        else result = 'Coba tanya lagi'
                    }
                    var gtts = new gTTS(result, 'id')
                    try {
                        gtts.save('./media/tts.mp3', function () {
                            client.sendPtt(from, './media/tts.mp3')
                                .catch(err => {
                                    console.log(err)
                                    sendText(resMsg.error.norm)
                                })
                        })
                    } catch (err) {
                        console.log(err)
                        reply(resMsg.error.norm)
                    }
                    break
                }

                case 'kbbi':
                    if (args.length != 1) return reply(`Mencari arti kata dalam KBBI\nPenggunaan: ${prefix}kbbi <kata>\ncontoh: ${prefix}kbbi apel`)
                    kbbi(args[0])
                        .then(res => {
                            if (res == '') return reply(`Maaf kata "${args[0]}" tidak tersedia di KBBI`)
                            reply(res + `\n\nMore: https://kbbi.web.id/${args[0]}`)

                        }).catch(err => {
                            reply(resMsg.error.norm)
                            console.log(err)
                        })
                    break

                case 'trans':
                case 'translate':
                    if (args.length === 0 && !isQuotedChat) return reply(`Translate text ke kode bahasa, penggunaan: \n${prefix}trans <kode bahasa> <text>\nContoh : \n -> ${prefix}trans id some english or other language text here\n -> ${prefix}translate en beberapa kata bahasa indonesia atau bahasa lain. \n\nUntuk kode bahasa cek disini : https://anotepad.com/note/read/7fd833h4`)
                    const lang = ['en', 'pt', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'co', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu', 'zh-TW']

                    if (lang.includes(args[0])) {
                        translate(isQuotedChat ? quotedMsgObj.content.toString() : arg.trim().substring(arg.indexOf(' ') + 1), {
                            from: 'auto', to: args[0]
                        }).then(n => {
                            reply(n)
                        }).catch(err => {
                            console.log(err)
                            reply(resMsg.error.norm)
                        })
                    } else {
                        reply(`Kode bahasa tidak valid`)
                    }
                    break

                case 'reminder':
                case 'remind': {
                    if (args.length === 0 && quotedMsg === null) return reply(`Kirim pesan pada waktu tertentu.\n*${prefix}remind <xdxhxm> <Text atau isinya>*\nIsi x dengan angka. Misal 1d1h1m = 1 hari lebih 1 jam lebih 1 menit\nContoh: ${prefix}remind 1h5m Jangan Lupa minum!\nBot akan kirim ulang pesan 'Jangan Lupa minum!' setelah 1 jam 5 menit.\n\n*${prefix}remind <DD/MM-hh:mm> <Text atau isinya>* utk tgl dan waktu spesifik\n*${prefix}remind <hh:mm> <Text atau isinya>* utk waktu pd hari ini\nContoh: ${prefix}remind 15/04-12:00 Jangan Lupa minum!\nBot akan kirim ulang pesan 'Jangan Lupa minum!' pada tanggal 15/04 jam 12:00 tahun sekarang. \n\nNote: waktu dalam GMT+7/WIB`)
                    const dd = args[0].match(/\d+(d|D)/g)
                    const hh = args[0].match(/\d+(h|H)/g)
                    const mm = args[0].match(/\d+(m|M)/g)
                    const hhmm = args[0].match(/\d{2}:\d{2}/g)
                    let DDMM = args[0].match(/\d\d?\/\d\d?/g) || [moment(t * 1000).format('DD/MM')]

                    let milis = 0
                    if (dd === null && hh === null && mm === null && hhmm === null) {
                        return reply(`Format salah! masukkan waktu`)
                    } else if (hhmm === null) {
                        let d = dd != null ? dd[0].replace(/d|D/g, '') : 0
                        let h = hh != null ? hh[0].replace(/h|H/g, '') : 0
                        let m = mm != null ? mm[0].replace(/m|M/g, '') : 0

                        milis = parseInt((d * 24 * 60 * 60 * 1000) + (h * 60 * 60 * 1000) + (m * 60 * 1000))
                    } else {
                        let DD = DDMM[0].replace(/\/\d\d?/g, '')
                        let MM = DDMM[0].replace(/\d\d?\//g, '')
                        milis = Date.parse(`${moment(t * 1000).format('YYYY')}-${MM}-${DD} ${hhmm[0]}:00 GMT+7`) - moment(t * 1000)
                    }
                    if (milis < 0) return reply(`Reminder untuk masa lalu? Hmm menarik...\n\nYa gabisa lah`)
                    if (milis >= 864000000) return reply(`Kelamaan cuy, maksimal 10 hari kedepan`)

                    let content = arg.trim().substring(arg.indexOf(' ') + 1)
                    if (content === '') return reply(`Format salah! Isi pesannya apa?`)
                    if (milis === null) return reply(`Maaf ada yang error!`)
                    await schedule.futureMilis(client, message, content, milis, (quotedMsg != null)).catch(e => console.log(e))
                    await reply(`Reminder for ${moment((t * 1000) + milis).format('DD/MM/YY HH:mm:ss')} sets!`)
                    break
                }

                case 'sfx': {
                    let listMsg = ''
                    sfx.forEach(n => {
                        listMsg = listMsg + '\n -> ' + n
                    })
                    if (args.length === 0) return reply(`Mengirim SFX yg tersedia: caranya langung ketik nama sfx ${listMsg}`)
                    break
                }

                case 'urltoimg':
                case 'ssweb': {
                    if (args.length === 0) return reply(`Screenshot website. ${prefix}ssweb <url>`)
                    let urlzz = ''
                    if (!isUrl(arg)) urlzz = `https://www.google.com/search?q=${encodeURIComponent(arg)}`
                    else urlzz = arg
                    const path = './media/ssweb.png'
                    scraper.ssweb(browser, path, urlzz).then(async res => {
                        if (res === true) await client.sendImage(from, path, 'ssweb.png', `Captured from ${urlzz}`, id).catch(err => reply(resMsg.error.norm).then(() => console.log(err)))
                    }).catch(err => reply(resMsg.error.norm).then(() => console.log(err)))
                    break
                }

                // List creator commands
                case 'list': {
                    if (args.length === 0) {
                        let thelist = await list.getListName(from)
                        let _what = isGroupMsg ? `Group` : `Chat`
                        let _msg
                        if (thelist === false || thelist === '') {
                            _msg = `${_what} ini belum memiliki list.`
                        } else {
                            _msg = `List yang ada di ${_what}: ${thelist.join(', ')}`
                        }
                        reply(`${_msg}\n\nMenampilkan list/daftar yang tersimpan di database bot untuk group ini.\nPenggunaan:\n-> *${prefix}list <nama list>*
                                \nUntuk membuat list gunakan perintah:\n-> *${prefix}createlist <nama list> | <Keterangan>* contoh: ${prefix}createlist tugas | Tugas PTI 17
                                \nUntuk menghapus list beserta isinya gunakan perintah:\n *${prefix}deletelist <nama list>* contoh: ${prefix}deletelist tugas
                                \nUntuk mengisi list gunakan perintah:\n-> *${prefix}addtolist <nama list> <isi>* bisa lebih dari 1 menggunakan pemisah | \ncontoh: ${prefix}addtolist tugas Matematika Bab 1 deadline 2021 | Pengantar Akuntansi Bab 2
                                \nUntuk mengedit list gunakan perintah:\n-> *${prefix}editlist <nama list> <nomor> <isi>* \ncontoh: ${prefix}editlist tugas 1 Matematika Bab 2 deadline 2021
                                \nUntuk menghapus *isi* list gunakan perintah:\n-> *${prefix}delist <nama list> <nomor isi list>*\nBisa lebih dari 1 menggunakan pemisah comma (,) contoh: ${prefix}delist tugas 1, 2, 3
                                `)
                    } else if (args.length > 0) {
                        let res = await list.getListData(from, args[0])
                        if (res === false) return reply(`List tidak ada, silakan buat dulu. \nGunakan perintah: *${prefix}createlist ${args[0]}* (mohon hanya gunakan 1 kata untuk nama list)`)
                        let desc = ''
                        if (res.desc !== 'Tidak ada') {
                            desc = `║ _${res.desc}_\n`
                        }
                        let respon = `╔══✪〘 List ${args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n${desc}║\n`
                        res.listData.forEach((data, i) => {
                            respon += `║ ${i + 1}. ${data}\n`
                        })
                        respon += '║\n╚═〘 *SeroBot* 〙'
                        await reply(respon)
                    }
                    break
                }

                case 'createlist': {
                    if (args.length === 0) return reply(`Untuk membuat list gunakan perintah: *${prefix}createlist <nama list> | <Keterangan>* contoh: ${prefix}createlist tugas | Tugas PTI 17\n(mohon hanya gunakan 1 kata untuk nama list)`)
                    const desc = arg.split('|')[1]?.trim() ?? 'Tidak ada'
                    const respon = await list.createList(from, args[0], desc)
                    await reply((respon === false) ? `List ${args[0]} sudah ada, gunakan nama lain.` : `List ${args[0]} berhasil dibuat.`)
                    break
                }

                case 'deletelist': {
                    if (args.length === 0) return reply(`Untuk menghapus list beserta isinya gunakan perintah: *${prefix}deletelist <nama list>* contoh: ${prefix}deletelist tugas`)
                    const thelist = await list.getListName(from)
                    if (thelist.includes(args[0])) {
                        reply(`[❗] List ${args[0]} akan dihapus.\nKirim *${prefix}confirmdeletelist ${args[0]}* untuk mengonfirmasi, abaikan jika tidak jadi.`)
                    } else {
                        reply(`List ${args[0]} tidak ada.`)
                    }
                    break
                }

                case 'confirmdeletelist': {
                    if (args.length === 0) return null
                    const respon1 = await list.deleteList(from, args[0])
                    await reply((respon1 === false) ? `List ${args[0]} tidak ada.` : `List ${args[0]} berhasil dihapus.`)
                    break
                }

                case 'addtolist': {
                    if (args.length === 0) return reply(`Untuk mengisi list gunakan perintah:\n *${prefix}addtolist <nama list> <isi>* Bisa lebih dari 1 menggunakan pemisah | \ncontoh: ${prefix}addtolist tugas Matematika Bab 1 deadline 2021 | Pengantar Akuntansi Bab 2`)
                    if (args.length === 1) return reply(`Format salah, nama dan isinya apa woy`)
                    const thelist1 = await list.getListName(from)
                    if (!thelist1.includes(args[0])) {
                        return reply(`List ${args[0]} tidak ditemukan.`)
                    } else {
                        let newlist = arg.substr(arg.indexOf(' ') + 1).split('|').map((item) => {
                            return item.trim()
                        })
                        let res = await list.addListData(from, args[0], newlist)
                        let desc = ''
                        if (res.desc !== 'Tidak ada') {
                            desc = `║ _${res.desc}_\n`
                        }
                        let respon = `╔══✪〘 List ${args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n${desc}║\n`
                        res.listData.forEach((data, i) => {
                            respon += `║ ${i + 1}. ${data}\n`
                        })
                        respon += '║\n╚═〘 *SeroBot* 〙'
                        await reply(respon)
                    }
                    break
                }

                case 'editlist': {
                    if (args.length === 0) return reply(`Untuk mengedit list gunakan perintah:\n *${prefix}editlist <nama list> <nomor> <isi>* \ncontoh: ${prefix}editlist tugas 1 Matematika Bab 2 deadline 2021`)
                    if (args.length < 3) return reply(`Format salah. pastikan ada namalist, index, sama isinya`)
                    const thelist1 = await list.getListName(from)
                    if (!thelist1.includes(args[0])) {
                        return reply(`List ${args[0]} tidak ditemukan.`)
                    } else {
                        let n = arg.substr(arg.indexOf(' ') + 1)
                        let newlist = n.substr(n.indexOf(' ') + 1)
                        let res = await list.editListData(from, args[0], newlist, args[1] - 1)
                        let desc = ''
                        if (res.desc !== 'Tidak ada') {
                            desc = `║ _${res.desc}_\n`
                        }
                        let respon = `╔══✪〘 List ${args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n${desc}║\n`
                        res.listData.forEach((data, i) => {
                            respon += `║ ${i + 1}. ${data}\n`
                        })
                        respon += '║\n╚═〘 *SeroBot* 〙'
                        await reply(respon)
                    }
                    break
                }

                case 'delist': {
                    if (args.length === 0) return reply(`Untuk menghapus *isi* list gunakan perintah: *${prefix}delist <nama list> <nomor isi list>*\nBisa lebih dari 1 menggunakan pemisah comma (,) contoh: ${prefix}delist tugas 1, 2, 3`)
                    if (args.length === 1) return reply(`Format salah, nama list dan nomor berapa woy`)
                    const thelist2 = await list.getListName(from)
                    if (!thelist2.includes(args[0])) {
                        return reply(`List ${args[0]} tidak ditemukan.`)
                    } else {
                        let number = arg.substr(arg.indexOf(' ') + 1).split(',').map((item) => {
                            return item.trim() - 1
                        })
                        await number.reverse().forEach(async (num) => {
                            await list.removeListData(from, args[0], num)
                        })
                        let res = await list.getListData(from, args[0])
                        let desc = ''
                        if (res.desc !== 'Tidak ada') {
                            desc = `║ _${res.desc}_\n`
                        }
                        let respon = `╔══✪〘 List ${args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n${desc}║\n`
                        res.listData.forEach((data, i) => {
                            respon += `║ ${i + 1}. ${data}\n`
                        })
                        respon += '║\n╚═〘 *SeroBot* 〙'
                        await reply(respon)
                    }
                    break
                }

                // Group Commands (group admin only)
                case 'add':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    if (args.length != 1) return reply(`Untuk menggunakan ${prefix}add\nPenggunaan: ${prefix}add <nomor>\ncontoh: ${prefix}add 628xxx`)
                    try {
                        await client.addParticipant(from, `${args[0].replace(/\+/g, '').replace(/\s/g, '').replace(/-/g, '')}@c.us`)
                    } catch {
                        reply('Tidak dapat menambahkan target')
                    }
                    break

                case 'kick':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    if (mentionedJidList.length === 0) return reply('Maaf, format pesan salah.\nSilahkan tag satu atau lebih orang yang akan dikeluarkan')
                    if (mentionedJidList[0] === botNumber) return await reply('Maaf, format pesan salah.\nTidak dapat mengeluarkan akun bot sendiri')
                    await client.sendTextWithMentions(from, `Request diterima, mengeluarkan:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                    for (let ment of mentionedJidList) {
                        if (groupAdmins.includes(ment)) return await sendText('Gagal, kamu tidak bisa mengeluarkan admin grup.')
                        await client.removeParticipant(groupId, ment)
                    }
                    break

                case 'promote':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    if (mentionedJidList.length != 1) return reply('Maaf, hanya bisa mempromote 1 user')
                    if (groupAdmins.includes(mentionedJidList[0])) return await reply('Maaf, user tersebut sudah menjadi admin.')
                    if (mentionedJidList[0] === botNumber) return await reply('Maaf, format pesan salah.\nTidak dapat mempromote akun bot sendiri')
                    await client.promoteParticipant(groupId, mentionedJidList[0])
                    await client.sendTextWithMentions(from, `Request diterima, menambahkan @${mentionedJidList[0].replace('@c.us', '')} sebagai admin.`)
                    break

                case 'demote':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    if (mentionedJidList.length != 1) return reply('Maaf, hanya bisa mendemote 1 user')
                    if (!groupAdmins.includes(mentionedJidList[0])) return await reply('Maaf, user tersebut belum menjadi admin.')
                    if (mentionedJidList[0] === botNumber) return await reply('Maaf, format pesan salah.\nTidak dapat mendemote akun bot sendiri')
                    if (mentionedJidList[0] === ownerNumber) return await reply('Maaf, tidak bisa mendemote owner, hahahaha')
                    await client.demoteParticipant(groupId, mentionedJidList[0])
                    await client.sendTextWithMentions(from, `Request diterima, menghapus jabatan @${mentionedJidList[0].replace('@c.us', '')}.`)
                    break

                case 'yesbye': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    await sendText('Oh beneran ya. Gapapa aku paham. Selamat tinggal 👋🏻🥲')

                    let pos = ngegas.indexOf(chatId)
                    ngegas.splice(pos, 1)
                    writeFileSync('./data/ngegas.json', JSON.stringify(ngegas))

                    let posi = welcome.indexOf(chatId)
                    welcome.splice(posi, 1)
                    writeFileSync('./data/welcome.json', JSON.stringify(welcome))

                    let posa = antiLinkGroup.indexOf(chatId)
                    antiLinkGroup.splice(posa, 1)
                    writeFileSync('./data/antilinkgroup.json', JSON.stringify(antiLinkGroup))

                    setTimeout(async () => {
                        await client.leaveGroup(groupId)
                    }, 2000)
                    setTimeout(async () => {
                        await client.deleteChat(groupId)
                    }, 4000)
                }
                    break

                case 'bye': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    await sendText('Udah gak butuh aku lagi? yaudah. kirim /yesbye untuk mengeluarkan bot')
                    break
                }

                case 'del':
                    if (!quotedMsg) return reply(`Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`)
                    if (!quotedMsgObj.fromMe) return reply(`Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`)
                    client.simulateTyping(from, false)
                    await client.deleteMessage(from, quotedMsg.id, false).catch(err => reply(resMsg.error.norm).then(() => console.log(err)))
                    break

                case 'tagall':
                case 'alle': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    const groupMem = await client.getGroupMembers(groupId)
                    if (args.length != 0) {
                        let res = `${arg}\n${readMore}`
                        for (let m of groupMem) {
                            res += `@${m.id.replace(/@c\.us/g, '')} `
                        }
                        await client.sendTextWithMentions(from, res)
                    } else {
                        let res = `╔══✪〘 Mention All 〙✪\n${readMore}`
                        for (let m of groupMem) {
                            res += `╠➥ @${m.id.replace(/@c\.us/g, '')}\n`
                        }
                        res += '╚═〘 *SeroBot* 〙'
                        await client.sendTextWithMentions(from, res)
                    }
                    break
                }

                case 'tag': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    reply(`Feature coming soon`)
                    break
                }

                case 'antikasar': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    if (args[0] === 'on') {
                        let pos = ngegas.indexOf(chatId)
                        if (pos != -1) return reply('Fitur anti kata kasar sudah aktif!')
                        ngegas.push(chatId)
                        writeFileSync('./data/ngegas.json', JSON.stringify(ngegas))
                        reply('Fitur Anti Kasar sudah di Aktifkan')
                    } else if (args[0] === 'off') {
                        let pos = ngegas.indexOf(chatId)
                        if (pos === -1) return reply('Fitur anti kata memang belum aktif!')
                        ngegas.splice(pos, 1)
                        writeFileSync('./data/ngegas.json', JSON.stringify(ngegas))
                        reply('Fitur Anti Kasar sudah di non-Aktifkan')
                    } else {
                        reply(`Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}antikasar on --mengaktifkan\n${prefix}antikasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`)
                    }
                    break
                }


                case 'addkasar': {
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    if (args.length != 1) { return reply(`Masukkan hanya satu kata untuk ditambahkan kedalam daftar kata kasar.\ncontoh ${prefix}addkasar jancuk`) }
                    else {
                        if (kataKasar.indexOf(args[0]) != -1) return reply(`Kata ${args[0]} sudah ada.`)
                        kataKasar.push(args[0])
                        writeFileSync('./settings/katakasar.json', JSON.stringify(kataKasar))
                        cariKasar = requireUncached('./lib/kataKotor.js')
                        reply(`Kata ${args[0]} berhasil ditambahkan.`)
                    }
                    break
                }

                case 'reset': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    const reset = db.chain.get('group').find({ id: groupId }).assign({ members: [] }).value()
                    db.write()
                    if (reset) {
                        await sendText("Klasemen telah direset.")
                    }
                    break
                }

                case 'antilinkgroup': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    if (args[0] === 'on') {
                        if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                        let pos = antiLinkGroup.indexOf(chatId)
                        if (pos != -1) return reply('Fitur anti link group sudah aktif!')
                        antiLinkGroup.push(chatId)
                        writeFileSync('./data/antilinkgroup.json', JSON.stringify(antiLinkGroup))
                        reply('Fitur anti link group sudah di Aktifkan')
                    } else if (args[0] === 'off') {
                        let pos = antiLinkGroup.indexOf(chatId)
                        if (pos === -1) return reply('Fitur anti link group memang belum aktif!')
                        antiLinkGroup.splice(pos, 1)
                        writeFileSync('./data/antilinkgroup.json', JSON.stringify(antiLinkGroup))
                        reply('Fitur anti link group sudah di non-Aktifkan')
                    } else {
                        reply(`Untuk mengaktifkan Fitur anti link group pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengirimkan link group lain maka akan terkick otomatis\n\nPenggunaan\n${prefix}antilinkgroup on --mengaktifkan\n${prefix}antilinkgroup off --nonaktifkan`)
                    }
                    break
                }

                case 'mutegroup': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    if (args.length != 1) return reply(`Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`)
                    if (args[0] == 'on') {
                        client.setGroupToAdminsOnly(groupId, true).then(() => sendText('Berhasil mengubah agar hanya admin yang dapat chat!'))
                    } else if (args[0] == 'off') {
                        client.setGroupToAdminsOnly(groupId, false).then(() => sendText('Berhasil mengubah agar semua anggota dapat chat!'))
                    } else {
                        reply(`Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`)
                    }
                    break
                }

                case 'setprofile': {
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    if (isMedia && type == 'image' || isQuotedImage) {
                        let dataMedia = isQuotedImage ? quotedMsg : message
                        let _mimetype = dataMedia.mimetype
                        let mediaData = await decryptMedia(dataMedia)
                        let imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                        await client.setGroupIcon(groupId, imageBase64)
                    } else if (args.length === 1) {
                        if (!isUrl(url)) { await reply('Maaf, link yang kamu kirim tidak valid.') }
                        client.setGroupIconByUrl(groupId, url).then((r) => (!r && r != undefined)
                            ? reply('Maaf, link yang kamu kirim tidak memuat gambar.')
                            : reply('Berhasil mengubah profile group'))
                    } else {
                        reply(`Commands ini digunakan untuk mengganti icon/profile group chat\n\n\nPenggunaan:\n1. Silahkan kirim/reply sebuah gambar dengan caption ${prefix}setprofile\n\n2. Silahkan ketik ${prefix}setprofile linkImage`)
                    }
                    break
                }

                case 'welcome':
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    if (!isGroupAdmins) return reply(resMsg.error.admin)
                    if (args.length != 1) return reply(`Membuat BOT menyapa member yang baru join kedalam group chat!\n\nPenggunaan:\n${prefix}welcome on --aktifkan\n${prefix}welcome off --nonaktifkan`)
                    if (args[0] == 'on') {
                        welcome.push(chatId)
                        writeFileSync('./data/welcome.json', JSON.stringify(welcome))
                        reply('Welcome Message sekarang diaktifkan!')
                    } else if (args[0] == 'off') {
                        let posi = welcome.indexOf(chatId)
                        welcome.splice(posi, 1)
                        writeFileSync('./data/welcome.json', JSON.stringify(welcome))
                        reply('Welcome Message sekarang dinonaktifkan')
                    } else {
                        reply(`Membuat BOT menyapa member yang baru join kedalam group chat!\n\nPenggunaan:\n${prefix}welcome on --aktifkan\n${prefix}welcome off --nonaktifkan`)
                    }
                    break

                //Owner Group
                case 'kickall': //mengeluarkan semua member
                    if (!isGroupMsg) return reply(resMsg.error.group)
                    let isOwner = chat.groupMetadata.owner == pengirim
                    if (!isOwner) return reply('Maaf, perintah ini hanya dapat dipakai oleh owner grup!')
                    if (!isBotGroupAdmins) return reply(resMsg.error.botAdm)
                    const allMem = await client.getGroupMembers(groupId)
                    for (let m of allMem) {
                        if (groupAdmins.includes(m.id)) {
                        } else {
                            await client.removeParticipant(groupId, m.id)
                        }
                    }
                    reply('Success kick all member')
                    break

                //Owner Bot
                case 'ban': {
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    if (args.length == 0) return reply(`Untuk banned seseorang agar tidak bisa menggunakan commands\n\nCaranya ketik: \n${prefix}ban 628xx --untuk mengaktifkan\n${prefix}unban 628xx --untuk nonaktifkan\n\ncara cepat ban banyak digrup ketik:\n${prefix}ban @tag @tag @tag`)
                    if (args.length == 1) {
                        const numId = args[0].replace(/\+/g, '').replace(/\s/g, '').replace(/-/g, '') + '@c.us'
                        let pos = banned.indexOf(numId)
                        if (pos != -1) return reply('Target already banned!')
                        banned.push(numId)
                        writeFileSync('./data/banned.json', JSON.stringify(banned))
                        reply('Success banned target!')
                    } else {
                        for (let m of mentionedJidList) {
                            let pos = banned.indexOf(m)
                            if (pos != -1) reply('Target already banned!')
                            else {
                                banned.push(m.replace('@', ''))
                                writeFileSync('./data/banned.json', JSON.stringify(banned))
                                reply(`Success ban ${m.replace('@c.us', '')}!`)
                            }
                        }
                    }
                    break
                }

                case 'unban': {
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    if (args.length == 0) return reply(`Untuk banned seseorang agar tidak bisa menggunakan commands\n\nCaranya ketik: \n${prefix}ban 628xx --untuk mengaktifkan\n${prefix}unban 628xx --untuk nonaktifkan\n\ncara cepat ban banyak digrup ketik:\n${prefix}ban @tag @tag @tag`)
                    const numId = args[0].replace(/\+/g, '').replace(/\s/g, '').replace(/-/g, '') + '@c.us'
                    let pos = banned.indexOf(numId)
                    if (pos === -1) return reply('Not found!')
                    banned.splice(pos, 1)
                    writeFileSync('./data/banned.json', JSON.stringify(banned))
                    reply('Success unbanned target!')
                }
                    break

                case 'bc': {//untuk broadcast atau promosi
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    if (args.length == 0) return reply(`Untuk broadcast ke semua chat ketik:\n${prefix}bc [isi chat]`)
                    const chatz = await client.getAllChatIds()
                    reply(`Broadcast in progress! Total: ${chatz.length} chats`)
                    let count = 0
                    for (let idk of chatz) {
                        await sleep(2000)
                        await client.sendText(idk.id, `\t✪〘 *BOT Broadcast* 〙✪\n\n${arg}`)
                        count += 1
                    }
                    reply(`Broadcast selesai! Total: ${count} chats`)
                    break
                }

                case 'bcgroup': {//untuk broadcast atau promosi ke group
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    if (args.length == 0) return reply(`Untuk broadcast ke semua group ketik:\n${prefix}bcgroup [isi chat]`)
                    const groupz = await client.getAllGroups()
                    reply(`Broadcast in progress! Total: ${groupz.length} groups`)
                    let count = 0
                    for (let idk of groupz) {
                        await sleep(2000)
                        await client.sendText(idk.id, `\t✪〘 *BOT Broadcast* 〙✪\n\n${arg}`)
                        count += 1
                    }
                    reply(`Broadcast selesai! Total: ${count} groups`)
                    break
                }

                case 'leaveall': {//mengeluarkan bot dari semua group serta menghapus chatnya
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    const allGroupz = await client.getAllGroups()
                    reply(`Processed to leave all group! Total: ${allGroupz.length}`)
                    let count = 0
                    for (let group of allGroupz) {
                        let _id = group.contact.id
                        if (!groupPrem.includes(_id)) {
                            await client.sendText(_id, `Maaf bot sedang pembersihan, total group aktif : ${allGroupz.length}.\nPembersihan group dilakukan tiap awal bulan!\nTerima kasih.`)
                            await sleep(2000)
                            await client.leaveGroup(_id)
                            await sleep(1000)
                            await client.deleteChat(_id)
                            let pos = ngegas.indexOf(_id)
                            if (pos !== -1) {
                                ngegas.splice(pos, 1)
                                writeFileSync('./data/ngegas.json', JSON.stringify(ngegas))
                            }
                            let posi = welcome.indexOf(_id)
                            if (posi !== -1) {
                                welcome.splice(posi, 1)
                                writeFileSync('./data/welcome.json', JSON.stringify(welcome))
                            }
                            let posa = antiLinkGroup.indexOf(chatId)
                            if (posa !== -1) {
                                antiLinkGroup.splice(posa, 1)
                                writeFileSync('./data/antilinkgroup.json', JSON.stringify(antiLinkGroup))
                            }
                            count += 1
                        }
                    }
                    reply(`Leave all selesai! Total: ${count} groups`)
                    break
                }

                case 'clearexitedgroup': { //menghapus group yang sudah keluar
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    const allGroupzs = await client.getAllGroups()
                    reply('Processed to clear all exited group!')
                    let count = 0
                    for (let gc of allGroupzs) {
                        await sleep(1000)
                        if (gc.isReadOnly || !gc.canSend) {
                            client.deleteChat(gc.id)
                            count += 1
                        }
                    }
                    reply(`Delete all exited group selesai! Total: ${count} groups`)
                    break
                }

                case 'deleteall': {//menghapus seluruh pesan diakun bot
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    const allChatx = await client.getAllChats()
                    reply(`Processed to delete ${allChatx.length} chat!`)
                    let count = 0
                    for (let dchat of allChatx) {
                        await sleep(1000)
                        client.deleteChat(dchat.id)
                        count += 1
                    }
                    reply(`Delete all chat success! Total: ${count} chats`)
                    break
                }

                case 'clearall': {//menghapus seluruh pesan tanpa menghapus chat diakun bot
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    const allChatxy = await client.getAllChats()
                    reply(`Processed to clear ${allChatxy.length} chat!`)
                    let count = 0
                    for (let dchat of allChatxy) {
                        await sleep(1000)
                        client.clearChat(dchat.id)
                        count += 1
                    }
                    reply(`Clear all chat success! Total: ${count} chats`)
                    break
                }

                case 'clearpm': {//menghapus seluruh pesan diakun bot selain group
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    const allChat1 = await client.getAllChats()
                    reply(`Processed to clear ${allChat1.length} chat!`)
                    let count = 0
                    for (let dchat of allChat1) {
                        await sleep(1000)
                        if (!dchat.isGroup) {
                            client.deleteChat(dchat.id)
                            count += 1
                        }
                    }
                    reply(`Clear all Private chats success! Total: ${count} chats`)
                    break
                }

                case 'refresh':
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    await reply(`Refreshing web whatsapp page!`)
                    setTimeout(() => {
                        try {
                            client.refresh().then(async () => {
                                console.log(`Bot refreshed!`)
                                reply(`Bot refreshed!`)
                            })
                        } catch (err) {
                            console.log(color('[ERROR]', 'red'), err)
                        }
                    }, 2000)
                    break

                case 'restart': {
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    reply(`Server bot akan direstart!`)
                    spawn('restart.cmd')
                    break
                }

                case 'u':
                case 'unblock': {
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    if (args.length === 0) return reply(`Untuk unblock kontak, ${prefix}unblock 628xxx`)
                    await client.contactUnblock(`${arg.replace(/\+/g, '').replace(/\s/g, '').replace(/-/g, '')}@c.us`).then((n) => {
                        if (n) return reply(`Berhasil unblock ${arg}.`)
                        else reply(`Nomor ${arg} tidak terdaftar.`)
                    }).catch(e => {
                        console.log(e)
                        reply(resMsg.error.norm)
                    })
                    break
                }

                case 'getinfo': {
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    if (args.length === 0) return reply(`Kasih link groupnya bro`)
                    let inf = await client.inviteInfo(arg).catch(e => {
                        console.log(e)
                        return reply(resMsg.error.norm)
                    })
                    sendText(JSON.stringify(inf, null, 2))
                    break
                }

                case 'addprem': {
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    if (args.length === 0) return reply(`Kasih id groupnya bro`)
                    if (!args[0].match('@g.us')) return reply(`id groupnya gak valid bro`)
                    let pos = groupPrem.indexOf(args[0])
                    if (pos != -1) return reply('Target already premium!')
                    groupPrem.push(args[0])
                    writeFileSync('./data/premiumgroup.json', JSON.stringify(groupPrem))
                    reply(`Berhasil`)
                    break
                }

                case '>':
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    try {
                        eval(`(async() => {
                                ${arg}    
                            })()`)
                    } catch (e) {
                        console.log(e)
                        await sendText(`${e.name}: ${e.message}`)
                    }
                    client.simulateTyping(from, false)
                    break

                case 'shell':
                case '=': {
                    if (!isOwnerBot) return reply(resMsg.error.owner)
                    exec(arg, (err, stdout, stderr) => {
                        if (err) {
                            //some err occurred
                            console.error(err)
                        } else {
                            // the *entire* stdout and stderr (buffered)
                            sendText(stdout + stderr)
                            console.log(`stdout: ${stdout}`)
                            console.log(`stderr: ${stderr}`)
                        }
                    })
                    client.simulateTyping(from, false)
                    break
                }

                default:
                    await reply(`Perintah tidak ditemukan.\n${prefix}menu untuk melihat daftar perintah!`)
                    break

            }//End of switch case
            client.simulateTyping(chat.id, false)
        }

        // Anti link group function
        if (isAntiLinkGroup && isGroupMsg && (type === 'chat' || type === 'image' || type === 'video')) {
            let msg = ''
            if (type === 'image' && caption || type === 'video' && caption) msg = caption
            else msg = message.body
            if (msg?.match(/chat\.whatsapp\.com/gi) !== null) {
                if (!isBotGroupAdmins) return sendText('Gagal melakukan kick, bot bukan admin')
                if (isGroupAdmins) {
                    reply(`Duh admin yang share link group. Gabisa dikick deh.`)
                } else {
                    console.log(color('[LOGS]', 'grey'), `Group link detected, kicking sender from ${name || formattedTitle}`)
                    reply(`/t/t〘 ANTI LINK GROUP 〙\nMohon maaf. Link group whatsapp terdeteksi! Auto kick...`)
                    setTimeout(async () => {
                        await client.removeParticipant(groupId, pengirim)
                    }, 2000)
                }
            }
        }

        // Kata kasar function
        if (!isCmd && isGroupMsg && isNgegas && chat.type !== "image" && isKasar) {
            const _denda = sample([1000, 2000, 3000, 5000, 10000])
            const find = db.chain.get('group').find({ id: groupId }).value()
            if (find && find.id === groupId) {
                const cekuser = db.chain.get('group').filter({ id: groupId }).map('members').value()[0]
                const isIn = inArray(pengirim, cekuser)
                if (cekuser && isIn !== -1) {
                    const denda = db.chain.get('group').filter({ id: groupId }).map('members[' + isIn + ']')
                        .find({ id: pengirim }).update('denda', n => n + _denda).value()
                    db.write()
                    if (denda) {
                        await reply(`${resMsg.badw}\n\nDenda +${_denda}\nTotal : Rp` + formatin(denda.denda))
                        if (denda.denda >= 2000000) {
                            banned.push(pengirim)
                            writeFileSync('./data/banned.json', JSON.stringify(banned))
                            reply(`╔══✪〘 SELAMAT 〙✪\n║\n║ Anda telah dibanned oleh bot.\n║ Karena denda anda melebihi 2 Juta.\n║ Mampos~\n║\n║ Denda -2.000.000\n║\n╚═〘 SeroBot 〙`)
                            db.chain.get('group').filter({ id: groupId }).map('members[' + isIn + ']')
                                .find({ id: pengirim }).update('denda', n => n - 2000000).value()
                            db.write()
                        }
                    }
                } else {
                    const cekMember = db.chain.get('group').filter({ id: groupId }).map('members').value()[0]
                    if (cekMember.length === 0) {
                        db.chain.get('group').find({ id: groupId }).set('members', [{ id: pengirim, denda: _denda }]).value()
                        db.write()
                    } else {
                        const cekuser = db.chain.get('group').filter({ id: groupId }).map('members').value()[0]
                        cekuser.push({ id: pengirim, denda: _denda })
                        await reply(`${resMsg.badw}\n\nDenda +${_denda}`)
                        db.chain.get('group').find({ id: groupId }).set('members', cekuser).value()
                        db.write()
                    }
                }
            } else {
                db.chain.get('group').push({ id: groupId, members: [{ id: pengirim, denda: _denda }] }).value()
                db.write()
                await reply(`${resMsg.badw}\n\nDenda +${_denda}\nTotal : Rp${_denda}`)
            }
        }
    } catch (err) {
        console.log(color('[ERR>]', 'red'), err)
    }
}

export { HandleMsg }
