const { create, Client} = require('@open-wa/wa-automate')
const figlet = require('figlet')
const options = require('./utils/options')
const { color, messageLog, recache, getModuleName } = require('./utils')
const appRoot = require('app-root-path')
const fs = require('fs-extra')

let { reCacheModule, HandleMsg } = recache(appRoot + '/HandleMsg.js', module => {
    { reCacheModule, HandleMsg } = require(module)
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

const { default: PQueue } = require("p-queue")


const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
let {
    ownerNumber,
    groupLimit,
    memberLimit,
    prefix
} = setting

const queue = new PQueue({concurrency: 4, timeout: 10000, throwOnTimeout: true})

queue.on('next', () => {
    if (queue.size > 0 || queue.pending > 0) console.log(color('[~>>]', 'red'), `Queue Size: ${queue.size}  Pending: ${queue.pending}`)
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
    console.log(color('[>..]'), color('Hidden Command: /ban /bc /leaveall /clearall /nekopoi /clearexitedgroup /refresh /addkasar', 'green'))

    // process unread message
    const unreadMessages = await client.getAllUnreadMessages()
    unreadMessages.forEach(message => {
        setTimeout(
            async function(){
                if (!message.isGroupMsg) await queue.add(() => HandleMsg(client, message)).catch(err => {
                    console.log((err.name === 'TimeoutError') ? `${color('[~>>]', 'red')} Error task process timeout!` : err)
                    queue.isPaused ? queue.start() : null
                })
            }, 1000)
    })

        // ketika bot diinvite ke dalam group
    await client.onAddedToGroup(async chat => {
        console.log(color('[~>>]', 'red'), `Someone is adding bot to group, lol~ groupId: ${chat.groupMetadata.id}`)
        client.getAllGroups().then((groups) => {
            // kondisi ketika batas group bot telah tercapai, ubah di file settings/setting.json
            console.log(color('[~>>]', 'red'), `Group total: ${groups.length}. groupLimit: ${groupLimit}`)
            if (groups.length > groupLimit) {
                console.log(color('[~>>]', 'red'), `So this is exceeding the group limit.`)
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
        console.log(color('[~>>]', 'red'), `Someone is calling bot, lol~ id: ${call.peerJid}}`)
        // ketika seseorang menelpon nomor bot akan mengirim 
        if (!call.isGroup){
            client.sendText(call.peerJid, 'Maaf tidak bisa menerima panggilan.\nIni robot, bukan manusia. Awas kena block!~\nChat https://wa.me/6282310487958 for unblock request.')
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
                    console.log('[Client]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })
        await queue.add(() => HandleMsg(client, message)).catch(err => {
                    console.log((err.name === 'TimeoutError') ? `${color('[~>>]', 'red')} Error task process timeout!` : err)
                    queue.isPaused ? queue.start() : null
                })

        queue.isPaused ? queue.start() : null
    }).catch(err =>{
        console.log(err)
    })

    // Mempertahankan sesi agar tetap nyala
    await client.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus().then(() => queue.start())
    }).catch((err) => {
        console.log(err)
    })

    // ketika seseorang masuk/keluar dari group
    await client.onGlobalParicipantsChanged(async event => {
        const host = await client.getHostNumber() + '@c.us'
		const welcome = JSON.parse(fs.readFileSync('./data/welcome.json'))
		const isWelcome = welcome.includes(event.chat)
		let profile = await client.getProfilePicFromServer(event.who)
		if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
        // kondisi ketika seseorang diinvite/join group lewat link
        if (event.action === 'add' && event.who !== host && isWelcome) {
			await client.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
            await client.sendTextWithMentions(event.chat, `Hello, Welcome to the group @${event.who.replace('@c.us', '')} \n\nHave fun with us✨`)
        }
        // kondisi ketika seseorang dikick/keluar dari group
        if (event.action === 'remove' && event.who !== host) {
			await client.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
            await client.sendTextWithMentions(event.chat, `Good bye @${event.who.replace('@c.us', '')}, We'll miss you✨`)
        }
    })

    // Message log for analytic
    await client.onAnyMessage((anal) => { 
        messageLog(anal.fromMe, anal.type)
    })
}