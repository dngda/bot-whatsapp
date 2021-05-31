const { color, recache, getModuleName, createReadFileSync, messageLog } = require('./utils')
const { create, Client } = require('@open-wa/wa-automate')
const schedule = require('node-schedule')
const figlet = require('figlet')
const options = require('./utils/options')
const { loadJob } = require('./lib/schedule')
const fs = require('fs-extra')
const appRoot = require('app-root-path')
const puppeteer = require('puppeteer-extra')
const path = require('chrome-launcher').Launcher.getInstallations()[0]
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

let { reCacheModule, HandleMsg } = recache(appRoot + '/HandleMsg.js', module => {
    HandleMsg = require(module).HandleMsg
    reCacheModule = require(module).reCacheModule
    console.log(color('[WATCH]', 'orange'), color(`=> '${getModuleName(module)}'`, 'yellow'), 'Updated!')
})
recache(appRoot + '/lib/api.js', module => {
    reCacheModule('api = _data', require(module))
    console.log(color('[WATCH]', 'orange'), color(`=> '${getModuleName(module)}'`, 'yellow'), 'Updated!')
})
recache(appRoot + '/lib/menu.js', module => {
    reCacheModule('menuId = _data', require(module))
    console.log(color('[WATCH]', 'orange'), color(`=> '${getModuleName(module)}'`, 'yellow'), 'Updated!')
})

const jobList = JSON.parse(createReadFileSync('./data/schedule.json'))
const setting = JSON.parse(createReadFileSync('./settings/setting.json'))

let {
    ownerNumber,
    groupLimit,
    memberLimit,
    prefix
} = setting

const { default: PQueue } = require("p-queue")
const queue = new PQueue({ concurrency: 4, timeout: 10000, throwOnTimeout: true })
queue.on('next', () => {
    if (queue.size > 0 || queue.pending > 0) console.log(color('[==>>]', 'red'), `In-process: ${queue.pending} In-queue: ${queue.size}`)
})

//create session
create(options(true, start))
    .then(client => start(client))
    .catch(err => new Error(err))

async function start(client = new Client()) {
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('  SeroBot', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color('[DEV]'), color('Danang', 'yellow'))
    console.log(color('[~>>]'), color('BOT Started!', 'green'))
    console.log(color('[>..]'), color('Owner Commands: /ban /bc /bcgroup /leaveall /clearall /clearexitedgroup /clearpm', 'green'))
    console.log(color('[>..]'), color('/addkasar /gitpull /restart /refresh /unblock />', 'green'))

    const browser = await puppeteer.launch({
        executablePath: path,
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ]
    })

    // process unread message
    const unreadMessages = await client.getAllUnreadMessages()
    unreadMessages.forEach(message => {
        setTimeout(
            async function () {
                if (!message.isGroupMsg) await queue.add(() => HandleMsg(client, message, browser)).catch(err => {
                    console.log((err.name === 'TimeoutError') ? `${color('[==>>]', 'red')} Error task process timeout!` : err)
                    if (queue.isPaused) queue.start()
                })
            }, 1000)
    })

    //Load Scheduled Job
    //client, from, quotedId, content, date, isQuoted
    try {
        jobList.job.forEach(async (job) => {
            await loadJob(client, job.from, job.quotedId, job.content, job.date, job.isQuoted).catch(e => console.log(e))
        })
        console.log(color('[LOGS]', 'grey'), `${jobList.job.length} ScheduledJobs Loaded`)
    } catch (e) {
        console.log(e)
    }

    // const resetHits = schedule.scheduleJob('0 * * *', function(){
    //     messageLog(true)
    // })

    // ketika bot diinvite ke dalam group
    await client.onAddedToGroup(async chat => {
        console.log(color('[==>>]', 'red'), `Someone is adding bot to group, lol~ groupId: ${chat.groupMetadata.id}`)
        client.getAllGroups().then((groups) => {
            // kondisi ketika batas group bot telah tercapai, ubah di file settings/setting.json
            console.log(color('[==>>]', 'red'), `Group total: ${groups.length}. groupLimit: ${groupLimit}`)
            if (groups.length > groupLimit) {
                console.log(color('[==>>]', 'red'), `So this is exceeding the group limit.`)
                client.sendText(chat.groupMetadata.id, `Mohon maaf, untuk mencegah overload, group pada bot dibatasi.\nTotal group: ${groups.length}/${groupLimit}\nChat /owner for appeal`)
                setTimeout(() => {
                    client.leaveGroup(chat.groupMetadata.id)
                    client.deleteChat(chat.groupMetadata.id)
                }, 3000)
            } else {
                client.simulateTyping(chat.groupMetadata.id, true).then(async () => {
                    client.sendText(chat.groupMetadata.id, `Hai guys 👋 perkenalkan saya SeroBot. Untuk melihat perintah/menu yang tersedia pada bot, kirim ${prefix}menu`)
                })
            }
        })
    })

    await client.onIncomingCall(async call => {
        // ketika seseorang menelpon nomor bot
        if (!call.isGroup || !call.participants.length > 1) {
        	console.log(color('[==>>]', 'red'), `Someone is calling bot, lol~ id: ${call.peerJid}`)
            client.sendText(call.peerJid, `Maaf tidak bisa menerima panggilan.\nIni robot, bukan manusia. Awas kena block!\nChat https://wa.me/${ownerNumber.replace('@c.us', '')} untuk buka block.`)
            setTimeout(() => {
                client.contactBlock(call.peerJid)
            }, 3000)
        }
    })

    // ketika seseorang mengirim pesan
    await client.onMessage(async message => {
        client.setPresence(true)
        client.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[CLNT]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })
        await queue.add(() => HandleMsg(client, message, browser)).catch(err => {
            console.log((err.name === 'TimeoutError') ? `${color('[==>>]', 'red')} Error task process timeout!` : err)
            if (queue.isPaused) queue.start()
        })

        if (queue.isPaused) queue.start()
    }).catch(err => {
        console.log(err)
    })

    // Mempertahankan sesi agar tetap nyala
    await client.onStateChanged((state) => {
        console.log(color('[~>>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus().then(() => queue.start())
    }).catch((err) => {
        console.log(err)
    })

    // ketika seseorang masuk/keluar dari group
    try {
        await client.onGlobalParticipantsChanged(async event => {
            const host = await client.getHostNumber() + '@c.us'
            const ngegas = JSON.parse(createReadFileSync('./data/ngegas.json'))
            const welcome = JSON.parse(createReadFileSync('./data/welcome.json'))
            const isWelcome = welcome.includes(event.chat)
            let profile = await client.getProfilePicFromServer(event.who)
            if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
            // kondisi ketika seseorang diinvite/join group lewat link
            if (event.action === 'add' && event.who !== host && isWelcome) {
                await client.sendFileFromUrl(event.chat, profile, 'profile.jpg', ``)
                await client.sendTextWithMentions(event.chat, `Halo semua! Anggota kita nambah satu nih -> @${event.who.replace(/@c\.us/g, '')}\n\nSelamat datang, semoga betah ya 👋✨`)
            }
            // kondisi ketika seseorang dikick/keluar dari group
            if (event.action === 'remove' && event.who !== host && isWelcome) {
                let who = await client.getContact(event.who)
                let pushname = who.pushname || who.verifiedName || who.formattedName
                await client.sendText(event.chat, `Eh ada yang keluar ya? Dadahhh ${pushname} 👋✨`)
            }
            // 
            if (event.action === 'remove' && event.who === host) {
                let posi = welcome.indexOf(event.chat)
                welcome.splice(posi, 1)
                fs.writeFileSync('./data/welcome.json', JSON.stringify(welcome))

                let pos = ngegas.indexOf(event.chat)
                ngegas.splice(pos, 1)
                fs.writeFileSync('./data/ngegas.json', JSON.stringify(ngegas))
            }
        })
    } catch (err) {
        console.log(color('[ERR>]', 'red'), err)
    }
}