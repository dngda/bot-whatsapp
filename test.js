const wa = require('@open-wa/wa-automate')
const options = require('./utils/options')

wa.create(options(true, start))
    .then(client => start(client))
    .catch(err => new Error(err))

function start(client) {

client.onMessage(async message => {
	const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
	const stickerMetadata = { pack: 'Created with', author: 'SeroBot' }
	const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
	body = (type === 'chat') ? body : ((type === 'image' && caption || type === 'video' && caption)) ? caption : ''

    if (body === 'sticker' | body === 'stiker') {
    	console.log('\nbody:' + body)
    	await client.reply(from, `Copy that, processing...`, id)

        const encryptMedia = isQuotedImage ? quotedMsg : message
        console.log('\nencryptMedia:' + encryptMedia)

        const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
        console.log('\n_mimetype:' + _mimetype)

        const mediaData = await wa.decryptMedia(encryptMedia)
        console.log('\nmediaData:' + mediaData)

        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
        console.log('\nimageBase64:' + imageBase64)

        client.sendImageAsSticker(from, imageBase64, stickerMetadata)
            .then(() => {
                client.sendText(from, 'Here\'s your sticker')
            }).catch(err => {
                console.log(err)
                client.sendText(from, 'Maaf, ada yang error!')
            })
		}
    })
}