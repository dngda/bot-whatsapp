/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-01-02 20:31:13
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-01 21:23:30
 * @ Description:
 */

import { createReadFileSync, initGlobalVariable } from './utils/index.js'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import options, { chromeArgs } from './utils/options.js'
import { create, Client } from '@open-wa/wa-automate'
import { schedule, sewa } from './lib/index.js'
import chromeLauncher from 'chrome-launcher'
import { scheduleJob } from 'node-schedule'
import { HandleMsg } from './HandleMsg.js'
import puppeteer from 'puppeteer-extra'
// eslint-disable-next-line no-unused-vars
import { spawn } from 'child_process'
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

const queue = new PQueue({ concurrency: 5, timeout: 3000, throwOnTimeout: true })
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

        puppeteer.use(StealthPlugin())
        const browser = await puppeteer.launch({
            executablePath: path,
            headless: true,
            args: chromeArgs
        }).catch(e => console.log(e))

        // process unread message
        client.getAllUnreadMessages().then(unreadMessages => {
            unreadMessages.forEach(message => {
                setTimeout(
                    async function () {
                        if (!message.isGroupMsg) await queue.add(() => HandleMsg(message, browser, client)).catch(err => {
                            console.log((err.name === 'TimeoutError') ? `${color('[==>>]', 'red')} Error task process timeout!` : err)
                            if (queue.isPaused) queue.start()
                        })
                    }, 1000)
            })
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

            // Restart session every 6 hours
            // scheduleJob('30 */6 * * *', () => {
            //     client.sendText(ownerNumber, `Server bot akan direstart!`)
            //     spawn('restart.cmd')
            // })

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
                        `Mohon maaf, untuk mencegah overload, group pada bot dibatasi.\nTotal group: ${groups.length}/${groupLimit}\nChat /owner untuk sewa\n` +
                        `Sewa aja murah kok. 10k masa aktif 1 bulan.\n` +
                        `Mau sewa otomatis? Buka link berikut:\n` +
                        `Saweria: https://saweria.co/dngda \n` +
                        `*Masukkan link group kalian dalam kolom "Pesan" di website saweria*`
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
                client.sendText(call.peerJid, `Maaf tidak bisa menerima panggilan.\nIni robot, bukan manusia. Awas kena block!\nChat https://wa.me/${ownerNumber.replace('@c.us', '')} untuk buka block.`)
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

        client.onGlobalParticipantsChanged(async event => {
            const host = await client.getHostNumber() + '@c.us'
            const ngegas = JSON.parse(createReadFileSync('./data/ngegas.json'))
            const welcome = JSON.parse(createReadFileSync('./data/welcome.json'))
            const antiLinkGroup = JSON.parse(createReadFileSync('./data/antilinkgroup.json'))
            const antiLink = JSON.parse(createReadFileSync('./data/antilink.json'))
            const isWelcome = welcome.includes(event.chat)
            const profile = await client.getProfilePicFromServer(event.who)
            const hasByProperty = Object.prototype.hasOwnProperty.call(event, 'by')
            // kondisi ketika seseorang diinvite/join group lewat link
            if (event.action === 'add' && event.who !== host && isWelcome && hasByProperty) {
                if (profile !== '' || profile !== undefined) await client.sendFileFromUrl(event.chat, profile, 'profile.jpg', `Anjay keren fotonya member baru`)
                await client.sendTextWithMentions(event.chat, `Halo semua! Anggota kita nambah satu nih\n-> @${event.who.replace(/@c\.us/g, '')}\n\nSelamat datang, semoga betah ya 👋✨\n\nJangan lupa baca deskripsi group!`)
            }
            // kondisi ketika seseorang dikick/keluar dari group
            if (event.action === 'remove' && event.who !== host && isWelcome) {
                let who = await client.getContact(event.who)
                let pushname = who.pushname || who.verifiedName || who.formattedName
                await client.sendText(event.chat, `Eh ada yang keluar ya? Dadahhh ${pushname} 👋✨`)
            }
            // Saat host keluar
            if (event.action === 'remove' && event.who === host) {
                let _id = event.chat
                let pos = ngegas.indexOf(_id)
                if (pos !== -1) {
                    ngegas.splice(pos, 1)
                    fs.writeFileSync('./data/ngegas.json', JSON.stringify(ngegas))
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
        })

    } catch (err) {
        console.log(color('[ERR>]', 'red'), err)
    }
}

//create session
create(options(true, start))
    .then(client => start(client))
    .catch(err => new Error(err))
