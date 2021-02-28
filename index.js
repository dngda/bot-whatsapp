const wa = require('@open-wa/wa-automate')
const figlet = require('figlet')
const options = require('./utils/options')
const { color, messageLog } = require('./utils')
const HandleMsg = require('./HandleMsg')
const { default: PQueue } = require("p-queue")
const queue = new PQueue({
  concurrency: 8,
  autoStart:true
   })

//create session
wa.create(options(true, start))
    .then(client => start(client))
    .catch(err => new Error(err))

async function start(client) {
    const processMessage = message => queue.add(() => HandleMsg(client, message))

    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('  SeroBot', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color('[DEV]'), color('Danang', 'yellow'))
    console.log(color('[~>>]'), color('BOT Started!', 'green'))
    console.log(color('[>..]'), color('Hidden Command: /ban /bc /leaveall /clearall /nekopoi', 'green'))

    // process unread message
    const unreadMessages = await client.getAllUnreadMessages();
    unreadMessages.forEach(message => {
        if (!message.isGroupMsg) processMessage(message)
    })
    // queue.start()

    // ketika seseorang mengirim pesan
    await client.onMessage(async message => {
        client.setPresence(true)
        if (message.body === 'P' | message.body === 'p') {
          await client.sendText(message.from, 'Wa\'alaikumussalam Wr. Wb.')
        }
        client.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[client]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })

        processMessage(message)
        // queue.start()
    }).catch(err =>{
        console.log(err)
    })

    // Mempertahankan sesi agar tetap nyala
    await client.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    }).catch(err =>{
        console.log(err)
    })

    // ketika bot diinvite ke dalam group
    await client.onAddedToGroup(async chat => {
	const groups = await client.getAllGroups()
	// kondisi ketika batas group bot telah tercapai, ubah di file settings/setting.json
	if (groups.length > groupLimit) {
	await client.sendText(chat.id, `Sorry, the group on this Bot is full\nMax Group is: ${groupLimit}`).then(() => {
	      client.leaveGroup(chat.id)
	      client.deleteChat(chat.id)
	  }) 
	} else {
	// kondisi ketika batas member group belum tercapai, ubah di file settings/setting.json
	    if (chat.groupMetadata.participants.length < memberLimit) {
	    await client.sendText(chat.id, `Sorry, Bot comes out if the group members do not exceed ${memberLimit} people`).then(() => {
	      client.leaveGroup(chat.id)
	      client.deleteChat(chat.id)
	    })
	    } else {
        await client.simulateTyping(chat.id, true).then(async () => {
          await client.sendText(chat.id, `Hai minna~, Im SeroBot. To find out the commands on this bot type ${prefix}menu`)
        })
	    }
	}
    }).catch(err =>{
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
    }).catch(err =>{
        console.log(err)
    })

    await client.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        await client.sendText(callData.peerJid, 'Maaf sedang tidak bisa menerima panggilan.\n\n~ini bot, bukan manusia.')
        .then(async () => {
            // bot akan memblock nomor itu
            await client.contactBlock(callData.peerJid)
        })
    }).catch(err =>{
        console.log(err)
    })

    // Message log for analytic
    await client.onAnyMessage((anal) => { 
        messageLog(anal.fromMe, anal.type)
    }).catch(err =>{
        console.log(err)
    })
}