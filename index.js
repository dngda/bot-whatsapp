const { create, Client } = require('@open-wa/wa-automate')
const figlet = require('figlet')
const options = require('./utils/options')
const { color, messageLog } = require('./utils')
const HandleMsg = require('./HandleMsg')

const start = (client = new Client()) => {
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('   BOT-WA', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color('[DEV]'), color('Danang', 'yellow'))
    console.log(color('[~>>]'), color('BOT Started!', 'green'))
    console.log(color('[>..]'), color('Hidden Command: /ban /bc /leaveall /clearall /nekopoi', 'green'))

    // Mempertahankan sesi agar tetap nyala
    client.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    })

    // ketika bot diinvite ke dalam group
    client.onAddedToGroup(async (chat) => {
	const groups = await client.getAllGroups()
	// kondisi ketika batas group bot telah tercapai,ubah di file settings/setting.json
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
          await client.sendText(chat.id, `Hai minna~, Im AirMineral Bot. To find out the commands on this bot type ${prefix}menu`)
        })
	    }
	}
    })

    // ketika seseorang masuk/keluar dari group
    client.onGlobalParicipantsChanged(async (event) => {
        const host = await client.getHostNumber() + '@c.us'
		const welcome = JSON.parse(fs.readFileSync('./settings/welcome.json'))
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

    client.onIncomingCall(async (callData) => {
        // ketika seseorang menelpon nomor bot akan mengirim pesan
        await client.sendText(callData.peerJid, 'Maaf sedang tidak bisa menerima panggilan.\n\n~ini bot, bukan manusia.')
        .then(async () => {
            // bot akan memblock nomor itu
            await client.contactBlock(callData.peerJid)
        })
    })

    // ketika seseorang mengirim pesan
    client.onMessage(async (message) => {
        client.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[client]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })
        HandleMsg(client, message)    
    
    })
	
    // Message log for analytic
    client.onAnyMessage((anal) => { 
        messageLog(anal.fromMe, anal.type)
    })
}

//create session
create(options)
    .then((client) => start(client))
    .catch((err) => new Error(err))
