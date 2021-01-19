const { create, Client } = require('@open-wa/wa-automate')
const figlet = require('figlet')
const options = require('./utils/options')
const { color, messageLog } = require('./utils')
const HandleMsg = require('./HandleMsg')

const start = (aziz = new Client()) => {
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('BOT-WA', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color('[DEV]'), color('Aziz', 'yellow'))
    console.log(color('[~>>]'), color('BOT Started!', 'green'))

    // Mempertahankan sesi agar tetap nyala
    aziz.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') aziz.forceRefocus()
    })

    // ketika bot diinvite ke dalam group
    aziz.onAddedToGroup(async (chat) => {
	const groups = await aziz.getAllGroups()
	// kondisi ketika batas group bot telah tercapai,ubah di file settings/setting.json
	if (groups.length > groupLimit) {
	await aziz.sendText(chat.id, `Sorry, the group on this Bot is full\nMax Group is: ${groupLimit}`).then(() => {
	      aziz.leaveGroup(chat.id)
	      aziz.deleteChat(chat.id)
	  }) 
	} else {
	// kondisi ketika batas member group belum tercapai, ubah di file settings/setting.json
	    if (chat.groupMetadata.participants.length < memberLimit) {
	    await aziz.sendText(chat.id, `Sorry, Bot comes out if the group members do not exceed ${memberLimit} people`).then(() => {
	      aziz.leaveGroup(chat.id)
	      aziz.deleteChat(chat.id)
	    })
	    } else {
        await aziz.simulateTyping(chat.id, true).then(async () => {
          await aziz.sendText(chat.id, `Hai minna~, Im CR_azyz Bot. To find out the commands on this bot type ${prefix}menu`)
        })
	    }
	}
    })

    // ketika seseorang masuk/keluar dari group
    aziz.onGlobalParicipantsChanged(async (event) => {
        const host = await aziz.getHostNumber() + '@c.us'
		const welcome = JSON.parse(fs.readFileSync('./settings/welcome.json'))
		const isWelcome = welcome.includes(event.chat)
		let profile = await aziz.getProfilePicFromServer(event.who)
		if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
        // kondisi ketika seseorang diinvite/join group lewat link
        if (event.action === 'add' && event.who !== host && isWelcome) {
			await aziz.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
            await aziz.sendTextWithMentions(event.chat, `Hello, Welcome to the group @${event.who.replace('@c.us', '')} \n\nHave fun with us✨`)
        }
        // kondisi ketika seseorang dikick/keluar dari group
        if (event.action === 'remove' && event.who !== host) {
			await aziz.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
            await aziz.sendTextWithMentions(event.chat, `Good bye @${event.who.replace('@c.us', '')}, We'll miss you✨`)
        }
    })

    aziz.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        await aziz.sendText(callData.peerJid, 'Maaf sedang tidak bisa menerima panggilan.\n\n-bot')
        .then(async () => {
            // bot akan memblock nomor itu
            await aziz.contactBlock(callData.peerJid)
        })
    })

    // ketika seseorang mengirim pesan
    aziz.onMessage(async (message) => {
        aziz.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[aziz]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    aziz.cutMsgCache()
                }
            })
        HandleMsg(aziz, message)    
    
    })
	
    // Message log for analytic
    aziz.onAnyMessage((anal) => { 
        messageLog(anal.fromMe, anal.type)
    })
}

//create session
create(options(true, start))
    .then((aziz) => start(aziz))
    .catch((err) => new Error(err))
