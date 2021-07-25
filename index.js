/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-01-02 20:31:13
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-25 13:06:20
 * @ Description:
 */

import { createReadFileSync, initGlobalVariable } from './utils/index.js'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { create, Client, decryptMedia } from '@open-wa/wa-automate'
import { canvas, schedule, sewa } from './lib/index.js'
import chromeLauncher from 'chrome-launcher'
import { scheduleJob } from 'node-schedule'
import { HandleMsg } from './HandleMsg.js'
import { spawn } from 'child_process'
import options from './utils/options.js'
import puppeteer from 'puppeteer-extra'
import PQueue from 'p-queue'
import figlet from 'figlet'
import fs from 'fs-extra'
const path = chromeLauncher.Launcher.getInstallations()[0]
const jobList = JSON.parse(createReadFileSync('./data/schedule.json'))
const setting = JSON.parse(createReadFileSync('./settings/setting.json'))
initGlobalVariable()

let {
    ownerNumber,
    groupLimit,
    prefix
} = setting

const queue = new PQueue({ concurrency: 8, timeout: 3000, throwOnTimeout: true })
queue.on('next', () => {
    if (queue.size > 0 || queue.pending > 0) console.log(color('[==>>]', 'red'), `In-process: ${queue.pending} In-queue: ${queue.size}`)
})

const start = async (client = new Client()) => {
    try {
        console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
        console.log(color(figlet.textSync('  SeroBot', { font: 'Ghost', horizontalLayout: 'default' })))
        console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
        console.log(color('[DEV]'), color('Danang', 'yellow'))
        console.log(color('[~>>]'), color('BOT Started!', 'green'))
        console.log(color('[>..]'), color('Owner Commands: /menuowner', 'green'))
        client.sendText(ownerNumber, `✅ Bot Started!`)

        puppeteer.use(StealthPlugin())
        const browser = await puppeteer.launch({
            executablePath: path,
            headless: true,
            args: [
                '--single-process',
                '--no-zygote',
                '--renderer-process-limit=1',
                '--no-first-run',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--ignore-certificate-errors'
            ]
        }).catch(e => console.log(e))

        // process unread message
        client.getAllUnreadMessages().then(async unreadMessages => {
            for (let message of unreadMessages) {
                if (!message.isGroupMsg) await queue.add(() => HandleMsg(message, browser, client)).catch(err => {
                    console.log((err.name === 'TimeoutError') ? `${color('[==>>]', 'red')} Error task process timeout!` : err)
                    if (queue.isPaused) queue.start()
                })
            }
        })

        // ketika seseorang mengirim pesan
        client.onMessage(async message => {
            client.setPresence(true)
            client.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
                .then((msg) => {
                    if (msg >= 3000) {
                        console.log('[CLNT]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                        client.cutMsgCache()
                    }
                })
            await queue.add(() => HandleMsg(message, browser, client)).catch(err => {
                console.log((err.name === 'TimeoutError') ? `${color('[==>>]', 'red')} Error task process timeout!` : err)
                if (queue.isPaused) queue.start()
            })

            if (queue.isPaused) queue.start()
        }).catch(err => {
            console.log(err)
        })

        // Load Scheduled Job
        // client, from, quotedId, content, date, isQuoted

        try {
            jobList.jobs.forEach(async (job) => {
                schedule.loadJob(client, job.from, job.quotedId, job.content, job.date, job.isQuoted).catch(e => console.log(e))
            })
            console.log(color('[LOGS]', 'grey'), `${jobList.jobs.length} ScheduledJobs Loaded`)

            // check sewa every 4 hours
            scheduleJob('0 */4 * * *', () => {
                console.log(color('[LOGS]', 'grey'), `Checking sewa expiring...`)
                sewa.checkExpireSewa(client).catch(e => console.log(e))
            })

            // Clear chat every day at 01:01
            scheduleJob('1 1 * * *', async () => {
                const chats = await client.getAllChats()
                client.sendText(ownerNumber, `Processed auto clear with ${chats.length} chat!`)
                let deleted = 0, cleared = 0
                for (let chat of chats) {
                    if (!chat.isGroup && chat.id !== ownerNumber) {
                        await client.deleteChat(chat.id)
                        deleted += 1
                    }
                    if (chat.id === ownerNumber || chat.isGroup) {
                        await client.clearChat(chat.id)
                        cleared += 1
                    }
                }
                client.sendText(ownerNumber, `Chat deleted : ${deleted}\nChat cleared : ${cleared}`)
            })
        } catch (e) {
            console.log(e)
        }

        // Listen saweria
        sewa.listenSaweria(client, browser).catch(e => console.log(e))

        // ketika bot diinvite ke dalam group
        client.onAddedToGroup(async chat => {
            console.log(color('[==>>]', 'red'), `Someone is adding bot to group, lol~ groupId: ${chat.groupMetadata.id}`)
            client.getAllGroups().then((groups) => {
                // kondisi ketika batas group bot telah tercapai, ubah di file settings/setting.json
                console.log(color('[==>>]', 'red'), `Group total: ${groups.length}. groupLimit: ${groupLimit}`)
                if (groups.length > groupLimit) {
                    console.log(color('[==>>]', 'red'), `So this is exceeding the group limit.`)
                    client.sendText(chat.groupMetadata.id,
                        `Mohon maaf, untuk mencegah overload, group pada bot dibatasi.\n` +
                        `Total group: ${groups.length}/${groupLimit}\n` +
                        `Chat /owner untuk sewa. harga 10k masa aktif 1 bulan.\n` +
                        `Mau sewa otomatis? Buka link berikut:\n` +
                        `Saweria: https://saweria.co/dngda \n` +
                        `*Masukkan hanya link group kalian dalam kolom "Pesan" di website saweria*`
                    )
                    setTimeout(() => {
                        client.leaveGroup(chat.groupMetadata.id)
                        client.deleteChat(chat.groupMetadata.id)
                    }, 3000)
                } else {
                    client.simulateTyping(chat.groupMetadata.id, true).then(async () => {
                        client.sendText(chat.groupMetadata.id, `Hai guys 👋 perkenalkan saya SeroBot. Untuk melihat perintah atau menu yang tersedia pada bot, kirim *${prefix}menu*. Tapi sebelumnya pahami dulu *${prefix}tnc*`)
                    })
                }
            })
        })

        client.onIncomingCall(async call => {
            // ketika seseorang menelpon nomor bot
            if (!call.isGroup || !call.participants.length > 1) {
                console.log(color('[==>>]', 'red'), `Someone is calling bot, lol~ id: ${call.peerJid}`)
                client.sendText(call.peerJid, `⛔ Maaf tidak bisa menerima panggilan.\n🤖 Ini robot, bukan manusia. Maaf bot akan block otomatis!\n💬 Chat https://wa.me/${ownerNumber.replace('@c.us', '')}?text=Halo!%20Tolong%20buka%20block%20saya%20pada%20Serobot`)
                setTimeout(() => {
                    client.contactBlock(call.peerJid)
                }, 3000)
            }
        })

        // Mempertahankan sesi agar tetap nyala
        client.onStateChanged((state) => {
            console.log(color('[~>>>]', 'red'), state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus().then(() => queue.start())
        }).catch((err) => {
            console.log(err)
        })

        // ketika seseorang masuk/keluar dari group
        const host = await client.getHostNumber() + '@c.us'
        client.onGlobalParticipantsChanged(async event => {
            const welcome = JSON.parse(createReadFileSync('./data/welcome.json'))
            const isWelcome = welcome.includes(event.chat)
            const profile = await client.getProfilePicFromServer(event.who)
            const who = await client.getContact(event.who)
            const pushname = who.pushname || who.verifiedName || who.formattedName
            const chat = await client.getChatById(event.chat)
            const hasByProperty = Object.prototype.hasOwnProperty.call(event, 'by')
            // kondisi ketika seseorang diinvite/join group lewat link
            if (event.action === 'add' && event.who !== host && isWelcome && hasByProperty) {
                const welcomeData = await canvas.welcome(
                    profile,
                    chat.contact.profilePicThumbObj.eurl,
                    pushname,
                    chat.contact.name || chat.formattedTitle,
                    chat.groupMetadata.participants.length).catch(err => console.log(color('[ERR>]', 'red'), err))
                await client.sendImage(event.chat, welcomeData, 'welcome.png', `Halo semua!👋✨ Anggota kita nambah satu nih\n-> @${event.who.replace(/@c\.us/g, '')}`)

            }
            // kondisi ketika seseorang dikick/keluar dari group
            if (event.action === 'remove' && event.who !== host && isWelcome) {
                await client.sendText(event.chat, `⚙ Eh ada yang keluar ya? Dadahhh ${pushname} 👋✨`)
            }
            // Saat host keluar
            if (event.action === 'remove' && event.who == host) {
                const ngegas = JSON.parse(createReadFileSync('./data/ngegaskick.json'))
                const antiLinkGroup = JSON.parse(createReadFileSync('./data/antilinkgroup.json'))
                const antiLink = JSON.parse(createReadFileSync('./data/antilink.json'))
                let _id = event.chat
                let pos = ngegas.indexOf(_id)
                if (pos !== -1) {
                    ngegas.splice(pos, 1)
                    fs.writeFileSync('./data/ngegaskick.json', JSON.stringify(ngegas))
                }
                let posi = welcome.indexOf(_id)
                if (posi !== -1) {
                    welcome.splice(posi, 1)
                    fs.writeFileSync('./data/welcome.json', JSON.stringify(welcome))
                }
                let posa = antiLinkGroup.indexOf(_id)
                if (posa !== -1) {
                    antiLinkGroup.splice(posa, 1)
                    fs.writeFileSync('./data/antilinkgroup.json', JSON.stringify(antiLinkGroup))
                }
                let posd = antiLink.indexOf(_id)
                if (posd !== -1) {
                    antiLink.splice(posd, 1)
                    fs.writeFileSync('./data/antilink.json', JSON.stringify(antiLink))
                }
            }
        }).catch(e => {
            console.log(color('[ERR>]', 'red'), e)
        })

        client.getPage().on('error', () => {
            client.sendText(ownerNumber, `⌛ Page Error! Server bot akan direstart!`)
            spawn('pm2 reload all')
        })

        client.onMessageDeleted(async message => {
            try {
                const antiDelete = JSON.parse(createReadFileSync('./data/antidelete.json'))
                const isAntiDelete = antiDelete.includes(message.from)
                if (message.author != host && isAntiDelete) {
                    await client.sendTextWithMentions(message.from,
                        `‼️〘 ANTI DELETE 〙‼️\n` +
                        `${q3}Who     :${q3} @${message.author.replace('@c.us', '')}\n` +
                        `${q3}Type    :${q3} ${message.type.replace(/^\w/, (c) => c.toUpperCase())}` +
                        `${message.type == 'chat' ? `\n${q3}Content :${q3}\n\n${message.body}` : ``}`
                    )
                    if (['image', 'video', 'ptt', 'audio', 'document'].includes(message.type)) {
                        const mediaData = await decryptMedia(message)
                        await client.sendFile(message.from, `data:${message.mimetype};base64,${mediaData.toString('base64')}`, '', message.caption)
                    }
                    if (message.type == 'sticker') {
                        const mediaData = await decryptMedia(message)
                        await client.sendImageAsSticker(message.from, mediaData)
                    }
                }
            } catch (err) {
                console.log(color('[ERR>]', 'red'), err)
            }
        }).catch(e => {
            console.log(color('[ERR>]', 'red'), e)
        })

    } catch (err) {
        console.log(color('[ERR>]', 'red'), err)
    }
}

//create session
create(options(true, start))
    .then(client => start(client))
    .catch(err => new Error(err))
