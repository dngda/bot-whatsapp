require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')

const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const axios = require('axios')
const fetch = require('node-fetch')

const appRoot = require('app-root-path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db_group = new FileSync(appRoot + '/data/group.json')
const db = low(db_group)

db.defaults({ group: [] }).write()

const {
    removeBackgroundFromImageBase64
} = require('remove.bg')

const {
    exec
} = require('child_process')

const {
    menuId,
    cekResi,
    urlShortener,
    meme,
    getLocationData,
    images,
    rugaapi,
    cariKasar
} = require('./lib')

const {
    msgFilter,
    color,
    processTime,
    isUrl,
    download,
    createReadFileSync
} = require('./utils')

const fs = require('fs-extra')
const { uploadImages } = require('./utils/fetcher')

const setting = JSON.parse(createReadFileSync('./settings/setting.json'))
const skripsi = JSON.parse(createReadFileSync('./settings/skripsi.json'))
const banned = JSON.parse(createReadFileSync('./data/banned.json'))
const ngegas = JSON.parse(createReadFileSync('./data/ngegas.json'))
const welcome = JSON.parse(createReadFileSync('./data/welcome.json'))
const antisticker = JSON.parse(createReadFileSync('./data/antisticker.json'))
const antilink = JSON.parse(createReadFileSync('./data/antilink.json'))

let {
    ownerNumber,
    groupLimit,
    memberLimit,
    prefix
} = setting

const {
    apiNoBg
} = JSON.parse(fs.readFileSync('./settings/api.json'))

function formatin(duit) {
    let reverse = duit.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for (let i = 0; i < length; i++) {
        if (haystack[i].id == needle) return i;
    }
    return false;
}

module.exports = HandleMsg = async (client, message) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        var { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await client.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const pengirim = sender.id
        const GroupLinkDetector = antilink.includes(chatId)
        const AntiStickerSpam = antisticker.includes(chatId)
        const stickermsg = message.type === 'sticker'
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const stickerMetadata = { pack: 'Created with', author: 'SeroBot' }

        // Bot Prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const argx = body.slice(0).trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const uaOverride = process.env.UserAgent
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedChat = quotedMsg && quotedMsg.type === 'chat'
        const isQuotedLocation = quotedMsg && quotedMsg.type === 'location'

        // [IDENTIFY]
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isBanned = banned.includes(pengirim)
        // const isSimi = simi.includes(chatId)
        const isNgegas = ngegas.includes(chatId)
        const isKasar = await cariKasar(chats)

        // [BETA] Avoid Spam Message
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg && !isOwnerBot) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)), client.reply(from, 'Mohon untuk tidak melakukan spam', id) }
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg && !isOwnerBot) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)), client.reply(from, 'Mohon untuk tidak melakukan spam', id) }
        //
        if (!isCmd && isKasar && isGroupMsg) { console.log(color('[BADW]', 'orange'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }


        //[BETA] Avoid Spam Message
        msgFilter.addFilter(from)

        //[AUTO READ] Auto read message 
        client.sendSeen(chatId)

        // Filter Banned People
        if (isBanned) {
            return console.log(color('[BAN]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }

        // Ini Command nya
        if (isCmd) {
            client.simulateTyping(chat.id, true).then(async () => {
                switch (command) {
                    case 'status':
                        client.reply(from, `Bot aktif\nSpeed: ${processTime(t, moment())} _Second_`, id)
                        break
                    // Menu and TnC
                    case 'speed':
                    case 'ping':
                        await client.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_`)
                        break
                    case 'tnc':
                        await client.sendText(from, menuId.textTnC())
                        break
                    case 'notes':
                    case 'menu':
                    case 'help':
                        await client.sendText(from, menuId.textMenu(pushname))
                            .then(() => ((isGroupMsg) && (isGroupAdmins)) ? client.sendText(from, `Menu Admin Grup: *${prefix}menuadmin*`) : null)
                        break
                    case 'menuadmin':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        await client.sendText(from, menuId.textAdmin())
                        break
                    case 'donate':
                    case 'donasi':
                        await client.sendText(from, menuId.textDonasi())
                        break
                    case 'owner':
                        await client.sendContact(from, ownerNumber)
                            .then(() => client.sendText(from, 'Jika kalian ingin request fitur silahkan chat nomor owner!'))
                        break
                    case 'join':
                        if (args.length == 0) return client.reply(from, `Jika kalian ingin mengundang bot kegroup silahkan invite atau dengan\nketik ${prefix}join [link group]`, id)
                        let linkgrup = body.slice(6)
                        let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
                        let chekgrup = await client.inviteInfo(linkgrup)
                        if (!islink) return client.reply(from, 'Maaf link group-nya salah! silahkan kirim link yang benar', id)
                        if (isOwnerBot) {
                            await client.joinGroupViaLink(linkgrup)
                                .then(async () => {
                                    await client.sendText(from, 'Berhasil join grup via link!')
                                    await client.sendText(chekgrup.id, `Hai minna~, Im SeroBot. To find out the commands on this Bot type ${prefix}menu`)
                                })
                        } else {
                            let cgrup = await client.getAllGroups()
                            if (cgrup.length > groupLimit) return client.reply(from, `Sorry, the group on this bot is full\nMax Group is: ${groupLimit}`, id)
                            if (cgrup.size < memberLimit) return client.reply(from, `Sorry, Bot wil not join if the group members do not exceed ${memberLimit} people`, id)
                            await client.joinGroupViaLink(linkgrup)
                                .then(async () => {
                                    await client.reply(from, 'Berhasil join grup via link!', id)
                                })
                                .catch(() => {
                                    client.reply(from, 'Gagal!', id)
                                })
                        }
                        break
                    case 'stat':
                    case 'botstat': {
                        const loadedMsg = await client.getAmountOfLoadedMessages()
                        const chatIds = await client.getAllChatIds()
                        const groups = await client.getAllGroups()
                        client.sendText(from, `Status :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats`)
                        break
                    }

                    //Sticker Converter to img
                    case 'getimage':
                    case 'stikertoimg':
                    case 'stickertoimg':
                    case 'stimg':
                        if (quotedMsg && quotedMsg.type == 'sticker') {
                            const mediaData = await decryptMedia(quotedMsg)
                            client.reply(from, `Sedang di proses! Silahkan tunggu sebentar...`, id)
                            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                            await client.sendFile(from, imageBase64, 'imgsticker.jpg', 'Berhasil convert Sticker to Image!', id)
                                .then(() => {
                                    console.log(`Sticker to Image Processed for ${processTime(t, moment())} Seconds`)
                                })
                        } else if (!quotedMsg) return client.reply(from, `Format salah, silahkan tag/reply sticker yang ingin dijadikan gambar!`, id)
                        break

                    // Sticker Creator
                    case 'sticker':
                    case 'stiker':
                        if ((isMedia || isQuotedImage) && args.length === 0) {
                            client.reply(from, `Copy that, processing...`, id)
                            const encryptMedia = isQuotedImage ? quotedMsg : message
                            const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                            const mediaData = await decryptMedia(encryptMedia, uaOverride)
                            const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                            client.sendImageAsSticker(from, imageBase64, stickerMetadata)
                                .then(() => {
                                    client.sendText(from, 'Here\'s your sticker')
                                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                                })
                        } else if (args[0] === 'nobg') {
                            if (isMedia || isQuotedImage) {
                                client.reply(from, `Copy that, processing...`, id)
                                try {
                                    var encryptedMedia = isQuotedImage ? quotedMsg : message
                                    var _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype

                                    var mediaData = await decryptMedia(encryptedMedia, uaOverride)
                                    var imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                                    base64img = imageBase64
                                    var outFile = './media/noBg.png'
                                    // kamu dapat mengambil api key dari website remove.bg dan ubahnya difolder settings/api.json
                                    var result = await removeBackgroundFromImageBase64({ base64img, apiKey: apiNoBg, size: 'auto', type: 'auto', outFile })
                                    await fs.writeFile(outFile, result.base64img)
                                    await client.sendImageAsSticker(from, `data:${_mimetype};base64,${result.base64img}`, stickerMetadata)
                                        .then(() => {
                                            client.sendText(from, 'Here\'s your sticker')
                                            console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                                        })

                                } catch (err) {
                                    console.log(err)
                                    await client.reply(from, 'Maaf batas penggunaan hari ini sudah mencapai maksimal', id)
                                }
                            }
                        } else if (args.length === 1) {
                            if (!isUrl(url)) { return client.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
                            client.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined)
                                ? client.sendText(from, 'Maaf, link yang kamu kirim tidak memuat gambar.')
                                : client.reply(from, 'Here\'s your sticker')).then(() => console.log(`Sticker Processed for ${processTime(t, moment())} Second`))
                        } else {
                            await client.reply(from, `Tidak ada gambar! Untuk menggunakan ${prefix}sticker\n\n\nKirim gambar dengan caption\n${prefix}sticker <biasa>\n${prefix}sticker nobg <tanpa background>\n\natau Kirim pesan dengan\n${prefix}sticker <link_gambar>`, id)
                        }
                        break

                    case 'stickergif':
                    case 'stikergif':
                        if (isMedia || isQuotedVideo) {
                            if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                                var mediaData = await decryptMedia(message, uaOverride)
                                client.reply(from, '[WAIT] Sedang diproses⏳ silakan tunggu ± 1 min!', id)
                                // var filename = `./media/stickergif.${mimetype.split('/')[1]}`
                                // await fs.writeFileSync(filename, mediaData)
                                // await exec(`gify ${filename} ./media/stickergf.gif --fps=30`, async function (error, stdout, stderr) {
                                //     var gif = await fs.readFileSync('./media/stickergf.gif', { encoding: 'base64' })
                                    // await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`, stickerMetadata)
                                    //     .catch(() => {
                                    //         client.reply(from, 'Maaf filenya terlalu besar!', id)
                                    //     })
                                    await client.sendMp4AsSticker(from, `data:${mimetype};base64,${mediaData.toString('base64')}`, null, stickerMetadata)
                                    .catch(() => {
                                        client.reply(from, 'Maaf filenya terlalu besar!', id)
                                    })
                                // })
                            } else {
                                client.reply(from, `[❗] Kirim video dengan caption *${prefix}stickergif* max 10 sec!`, id)
                            }
                        } else {
                            client.reply(from, `[❗] Kirim video dengan caption *${prefix}stickergif*`, id)
                        }
                        break

                    case 'stikergiphy':
                    case 'stickergiphy':
                        if (args.length !== 1) return client.reply(from, `Maaf, format pesan salah.\nKetik pesan dengan ${prefix}stickergiphy <link_giphy>`, id)
                        const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
                        const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
                        if (isGiphy) {
                            const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                            if (!getGiphyCode) { return client.reply(from, 'Gagal mengambil kode giphy', id) }
                            const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                            const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                            client.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                                client.reply(from, 'Here\'s your sticker')
                                console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                            }).catch((err) => console.log(err))
                        } else if (isMediaGiphy) {
                            const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                            if (!gifUrl) { return client.reply(from, 'Gagal mengambil kode giphy', id) }
                            const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                            client.sendGiphyAsSticker(from, smallGifUrl)
                                .then(() => {
                                    client.reply(from, 'Here\'s your sticker')
                                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                                })
                                .catch(() => {
                                    client.reply(from, `Ada yang error!`, id)
                                })
                        } else {
                            await client.reply(from, 'Maaf, command sticker giphy hanya bisa menggunakan link dari giphy.  [Giphy Only]', id)
                        }
                        break

                    case 'qr':
                    case 'qrcode':
                        if (args.length == 0) return client.reply(from, `Untuk membuat kode qr, ketik ${prefix}qrcode <kata>\nContoh:  ${prefix}qrcode nama saya client`, id)
                        client.reply(from, `wait...`, id);
                        let kata = args[0]
                        for (let i = 1; i < args.length; i++) {
                            kata += ` ${args[i]}`
                        }
                        console.log(kata)
                        rugaapi.qrcode(kata, 500)
                            .then(async (res) => {
                                await client.sendFileFromUrl(from, `${res}`, id)
                            })
                        break

                    case 'meme':
                        if ((isMedia || isQuotedImage) && args.length >= 2) {
                            const top = arg.split('|')[0]
                            const bottom = arg.split('|')[1]
                            const encryptMedia = isQuotedImage ? quotedMsg : message
                            const mediaData = await decryptMedia(encryptMedia, uaOverride)
                            const getUrl = await uploadImages(mediaData, false)
                            const ImageBase64 = await meme.custom(getUrl, top, bottom)
                            client.sendFile(from, ImageBase64, 'image.png', '', null, true)
                                .then(() => {
                                    client.reply(from, 'Here you\'re!', id)
                                })
                                .catch(() => {
                                    client.reply(from, 'Ada yang error!')
                                })
                        } else {
                            await client.reply(from, `Tidak ada gambar! Silahkan kirim gambar dengan caption ${prefix}meme <teks_atas> | <teks_bawah>\ncontoh: ${prefix}meme teks atas | teks bawah`, id)
                        }
                        break

                    case 'nulis':
                        if (args.length == 0) return client.reply(from, `Membuat bot menulis teks yang dikirim menjadi gambar\nPemakaian: ${prefix}nulis [teks]\n\ncontoh: ${prefix}nulis i love you 3000`, id)
                        const nulisq = body.slice(7)
                        const nulisp = await rugaapi.tulis(nulisq)
                        await client.sendImage(from, `${nulisp}`, '', 'Nih...', id)
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break

                    //Islam Command
                    case 'listsurah':
                        try {
                            axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                                .then((response) => {
                                    let hehex = '╔══✪〘 List Surah 〙✪══\n'
                                    for (let i = 0; i < response.data.data.length; i++) {
                                        hehex += `╠➥ `
                                        hehex += response.data.data[i].name.transliteration.id.toLowerCase() + '\n'
                                    }
                                    hehex += '╚═〘 *SeroBot* 〙'
                                    client.reply(from, hehex, id)
                                })
                        } catch (err) {
                            client.reply(from, err, id)
                        }
                        break
                    case 'infosurah':
                        if (args.length == 0) return client.reply(from, `*_${prefix}infosurah <nama surah>_*\nMenampilkan informasi lengkap mengenai surah tertentu. Contoh penggunan: ${prefix}infosurah al-baqarah`, message.id)
                        var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                        var { data } = responseh.data
                        var idx = data.findIndex(function (post, index) {
                            if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                                return true;
                        });
                        var pesan = ""
                        pesan = pesan + "Nama : " + data[idx].name.transliteration.id + "\n" + "Asma : " + data[idx].name.short + "\n" + "Arti : " + data[idx].name.translation.id + "\n" + "Jumlah ayat : " + data[idx].numberOfVerses + "\n" + "Nomor surah : " + data[idx].number + "\n" + "Jenis : " + data[idx].revelation.id + "\n" + "Keterangan : " + data[idx].tafsir.id
                        client.reply(from, pesan, message.id)
                        break

                    case 'surah':
                        if (args.length == 0) return client.reply(from, `*_${prefix}surah <nomor surah> <ayat>_*\nContoh: ${prefix}surah 1 1\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1\n\n*_${prefix}surah <nama surah> <ayat> en/id_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Inggris / Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1 id`, message.id)
                        var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                        var { data } = responsh.data
                        var idx = data.findIndex(function (post, index) {
                            if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                                return true;
                        });
                        nmr = data[idx].number
                        var info = body.trim().split(' ')
                        var ayat = info[2]
                        console.log(nmr)
                        if (!isNaN(nmr)) {
                            var responseh2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                            var { data } = responseh2.data
                            var last = function last(array, n) {
                                if (array == null) return void 0;
                                if (n == null) return array[array.length - 1];
                                return array.slice(Math.max(array.length - n, 0));
                            };
                            bhs = last(args)
                            pesan = ""
                            pesan = pesan + data.text.arab + "\n\n"
                            if (bhs == "en") {
                                pesan = pesan + data.translation.en
                            } else {
                                pesan = pesan + data.translation.id
                            }
                            pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
                            client.reply(from, pesan, message.id)
                        }
                        break

                    case 'tafsir':
                        if (args.length == 0) return client.reply(from, `*_${prefix}tafsir <nomor surah> <ayat>_*\nContoh: ${prefix}tafsir 1 1\nMenampilkan ayat Al-Quran tertentu beserta terjemahan dan tafsirnya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}tafsir al-baqarah 1`, message.id)
                        var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                        var { data } = responsh.data
                        var idx = data.findIndex(function (post, index) {
                            if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                                return true;
                        });
                        nmr = data[idx].number
                        if (!isNaN(nmr)) {
                            var responsih = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[1])
                            var { data } = responsih.data
                            pesan = ""
                            pesan = pesan + "Tafsir Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + "\n\n"
                            pesan = pesan + data.text.arab + "\n\n"
                            pesan = pesan + "_" + data.translation.id + "_" + "\n\n" + data.tafsir.id.long
                            client.reply(from, pesan, message.id)
                        }
                        break

                    case 'alaudio':
                        if (args.length == 0) return client.reply(from, `*_${prefix}ALaudio <nama surah>_*\nMenampilkan tautan dari audio surah tertentu. Contoh penggunaan : ${prefix}ALaudio al-fatihah\n\n*_${prefix}ALaudio <nama surah> <ayat>_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1\n\n*_${prefix}ALaudio <nama surah> <ayat> en_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Inggris. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1 en`, message.id)
                        ayat = "ayat"
                        bhs = ""
                        var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                        var surah = responseh.data
                        var idx = surah.data.findIndex(function (post, index) {
                            if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                                return true;
                        });
                        nmr = surah.data[idx].number
                        if (!isNaN(nmr)) {
                            if (args.length > 2) {
                                ayat = args[1]
                            }
                            if (args.length == 2) {
                                var last = function last(array, n) {
                                    if (array == null) return void 0;
                                    if (n == null) return array[array.length - 1];
                                    return array.slice(Math.max(array.length - n, 0));
                                };
                                ayat = last(args)
                            }
                            pesan = ""
                            if (isNaN(ayat)) {
                                var responsih2 = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah/' + nmr + '.json')
                                var { name, name_translations, number_of_ayah, number_of_surah, recitations } = responsih2.data
                                pesan = pesan + "Audio Quran Surah ke-" + number_of_surah + " " + name + " (" + name_translations.ar + ") " + "dengan jumlah " + number_of_ayah + " ayat\n"
                                pesan = pesan + "Dilantunkan oleh " + recitations[0].name + " : " + recitations[0].audio_url + "\n"
                                pesan = pesan + "Dilantunkan oleh " + recitations[1].name + " : " + recitations[1].audio_url + "\n"
                                pesan = pesan + "Dilantunkan oleh " + recitations[2].name + " : " + recitations[2].audio_url + "\n"
                                client.reply(from, pesan, message.id)
                            } else {
                                var responsih2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                                var { data } = responsih2.data
                                var last = function last(array, n) {
                                    if (array == null) return void 0;
                                    if (n == null) return array[array.length - 1];
                                    return array.slice(Math.max(array.length - n, 0));
                                };
                                bhs = last(args)
                                pesan = ""
                                pesan = pesan + data.text.arab + "\n\n"
                                if (bhs == "en") {
                                    pesan = pesan + data.translation.en
                                } else {
                                    pesan = pesan + data.translation.id
                                }
                                pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
                                await client.sendFileFromUrl(from, data.audio.secondary[0])
                                await client.reply(from, pesan, message.id)
                            }
                        }
                        break

                    case 'jsholat':
                    case 'jsolat':
                        if (args.length === 0) return client.reply(from, `ketik *${prefix}jsholat <nama kabupaten>* untuk melihat jadwal sholat\nContoh: *${prefix}jsholat sleman*\nUntuk melihat daftar daerah, ketik *${prefix}jsholat daerah*`, id)
                        if (args[0] == 'daerah') {
                            var datad = await axios.get('https://api.banghasan.com/sholat/format/json/kota')
                            var datas = datad.data.kota
                            let hasil = '╔══✪〘 Daftar Kota 〙✪══\n'
                            for (let i = 0; i < datas.length; i++) {
                                var kota = datas[i].nama
                                hasil += '╠➥ '
                                hasil += `${kota}\n`
                            }
                            hasil += '╚═〘 *SeroBot* 〙'
                            await client.reply(from, hasil, id)
                        } else {
                            var datak = await axios.get('https://api.banghasan.com/sholat/format/json/kota/nama/' + args[0])
                            var kodek = datak.data.kota[0].id
                            var tgl = moment(t * 1000).format('YYYY-MM-DD')
                            var datas = await axios.get('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + kodek + '/tanggal/' + tgl)
                            var jadwals = datas.data.jadwal.data
                            let jadwal = `╔══✪〘 Jadwal Sholat di ${args[0]} 〙✪══\n`
                            jadwal += `╠➥ Imsak:` + jadwals.imsak + '\n'
                            jadwal += `╠➥ Subuh:` + jadwals.subuh + '\n'
                            jadwal += `╠➥ Dzuhur: ` + jadwals.dzuhur + '\n'
                            jadwal += `╠➥ Ashahr: ` + jadwals.ashar + '\n'
                            jadwal += `╠➥ Maghrib: ` + jadwals.maghrib + '\n'
                            jadwal += `╠➥ Isya': ` + jadwals.isya + '\n'
                            jadwal += '╚═〘 *Air Mineral Bot* 〙'
                            client.reply(from, jadwal, id)
                        }
                        break
                    //Group All User
                    case 'grouplink':
                        if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                        if (isGroupMsg) {
                            const inviteLink = await client.getGroupInviteLink(groupId);
                            client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}* Gunakan *${prefix}revoke* untuk mereset Link group`)
                        } else {
                            client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                        }
                        break
                    case "revoke":
                        if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                        if (isBotGroupAdmins) {
                            client.revokeGroupInviteLink(from)
                                .then((res) => {
                                    client.reply(from, `Berhasil Revoke Grup Link gunakan *${prefix}grouplink* untuk mendapatkan group invite link yang terbaru`, id);
                                })
                                .catch((err) => {
                                    console.log(`[ERR] ${err}`);
                                });
                        }
                        break;

                    //Media
                    case 'ytmp3':
                        if (args.length == 0) return client.reply(from, `Untuk mendownload lagu dari youtube\nketik: ${prefix}ytmp3 [link_yt]`, id)
                        const linkmp3 = args[0].replace('https://youtu.be/', '').replace('https://www.youtube.com/watch?v=', '')
                        rugaapi.ytmp3(`https://youtu.be/${linkmp3}`)
                            .then(async (res) => {
                                if (res.status == 'error') return client.sendFileFromUrl(from, `${res.link}`, '', `${res.error}`)
                                await client.sendFileFromUrl(from, `${res.getImages}`, '', `Lagu ditemukan\n\nJudul ${res.titleInfo}\n\nSabar lagi dikirim\nJika BOT terlalu lama merespon, silahkan downliad file nya secara manual\nLink mp3: ${res.getAudio}.mp3`, id)
                                console.log(res.getAudio)
                                var link = `${res.getAudio}.mp3`

                                var time = moment(t * 1000).format('mm')
                                var dir = `./media/ytmp3/${time}.mp3`
                                async function mp3() {
                                    console.log('Proses download sedang berlangsung')
                                    await download(link, dir, function (err) {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            console.log('Download Complete')
                                            client.sendPtt(from, dir, id)
                                                .then(console.log(`Audio Processed for ${processTime(t, moment())} Second`))
                                        }
                                    });
                                }
                                mp3()

                            })
                        break

                    case 'artinama':
                        if (args.length == 0) return client.reply(from, `Untuk mengetahui arti nama seseorang\nketik ${prefix}artinama namakamu`, id)
                        rugaapi.artinama(body.slice(10))
                            .then(async (res) => {
                                await client.reply(from, `Arti : ${res}`, id)
                            })
                        break

                    // Random Kata
                    case 'fakta':
                        fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
                            .then(res => res.text())
                            .then(body => {
                                let splitnix = body.split('\n')
                                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                                client.reply(from, randomnix, id)
                            })
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break
                    case 'katabijak':
                        fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
                            .then(res => res.text())
                            .then(body => {
                                let splitbijak = body.split('\n')
                                let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                                client.reply(from, randombijak, id)
                            })
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break
                    case 'pantun':
                        fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
                            .then(res => res.text())
                            .then(body => {
                                let splitpantun = body.split('\n')
                                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                                client.reply(from, ' '+randompantun.replace(/aruga-line/g, "\n"), id)
                            })
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break
                    case 'quote':
                    case 'quotes':
                        const quotex = await rugaapi.quote()
                        await client.reply(from, quotex, id)
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break

                    //Random Images
                    case 'anime':
                        if (args.length == 0) return client.reply(from, `Untuk menggunakan ${prefix}anime\nSilahkan ketik: ${prefix}anime [query]\nContoh: ${prefix}anime random\n\nquery yang tersedia:\nrandom, waifu, husbu, neko`, id)
                        if (args[0] == 'random' || args[0] == 'waifu' || args[0] == 'husbu' || args[0] == 'neko') {
                            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/' + args[0] + '.txt')
                                .then(res => res.text())
                                .then(body => {
                                    let randomnime = body.split('\n')
                                    let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
                                    client.sendFileFromUrl(from, randomnimex, '', 'Nee..', id)
                                })
                                .catch(() => {
                                    client.reply(from, 'Ada yang Error!', id)
                                })
                        } else {
                            client.reply(from, `Maaf query tidak tersedia. Silahkan ketik ${prefix}anime untuk melihat list query`)
                        }
                        break
                    case 'kpop':
                        if (args.length == 0) return client.reply(from, `Untuk menggunakan ${prefix}kpop\nSilahkan ketik: ${prefix}kpop [query]\nContoh: ${prefix}kpop bts\n\nquery yang tersedia:\nblackpink, exo, bts`, id)
                        if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
                            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
                                .then(res => res.text())
                                .then(body => {
                                    let randomkpop = body.split('\n')
                                    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                                    client.sendFileFromUrl(from, randomkpopx, '', 'Nee..', id)
                                })
                                .catch(() => {
                                    client.reply(from, 'Ada yang Error!', id)
                                })
                        } else {
                            client.reply(from, `Maaf query tidak tersedia. Silahkan ketik ${prefix}kpop untuk melihat list query`)
                        }
                        break
                    case 'memes':
                        const randmeme = await meme.random()
                        client.sendFileFromUrl(from, randmeme, '', '', id)
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break

                    // Search Any
                    case 'animebatch':
                    case 'dewabatch':
                        if (args.length == 0) return client.reply(from, `Untuk mencari anime batch dari Dewa Batch, ketik ${prefix}animebatch judul\n\nContoh: ${prefix}animebatch naruto`, id)
                        rugaapi.dewabatch(args[0])
                            .then(async (res) => {
                                await client.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
                            })
                        break

                    case 'image':
                    case 'images':
                        if (args.length == 0) return client.reply(from, `Untuk mencari gambar dari pinterest\nketik: ${prefix}images [search]\ncontoh: ${prefix}images naruto`, id)
                        const cariwall = body.slice(8)
                        const hasilwall = await images.fdci(cariwall)
                        await client.sendFileFromUrl(from, hasilwall, '', '', id)
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break

                    case 'crjogja':
                        // const url = 'http://api.screenshotlayer.com/api/capture?access_key=f56691eb8b1edb4062ed146cccaef885&url=https://sipora.staklimyogyakarta.com/radar/&viewport=600x600&width=600&force=1'
                        const url = 'https://screenshotapi.net/api/v1/screenshot?url=https%3A%2F%2Fsipora.staklimyogyakarta.com%2Fradar%2F&width=600&height=600&fresh=true&output=image'
                        await client.sendText(from, 'Gotcha, please wait!')
                        await client.simulateTyping(from, true)
                        await client.sendFileFromUrl(from, url, '', 'Captured from https://sipora.staklimyogyakarta.com/radar/')
                            .then(() => {
                                client.simulateTyping(from, false)
                            })
                            .catch(() => {
                                client.reply(from, 'Ada yang Error! Mending cek sendiri aja ke\nhttps://sipora.staklimyogyakarta.com/radar/', id)
                            })
                        break

                    case 'sreddit':
                        if (args.length == 0) return client.reply(from, `Untuk mencari gambar dari sub reddit\nketik: ${prefix}sreddit [search]\ncontoh: ${prefix}sreddit naruto`, id)
                        const carireddit = body.slice(9)
                        const hasilreddit = await images.sreddit(carireddit)
                        await client.sendFileFromUrl(from, hasilreddit, '', '', id)
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break
                    case 'nekopoi':
                        if (isGroupMsg) {
                            client.reply(from, 'Untuk Fitur Nekopoi Silahkan Lakukan di Private Message', id)
                        } else {
                            var data = await axios.get('https://arugaz.my.id/api/anime/nekopoi/random')
                            var x = Math.floor((Math.random() * 7) + 0);
                            var poi = data.data[x]
                            console.log(poi)
                            let hasilpoi = 'Note[❗]: 18+ ONLY[❗]'
                            hasilpoi += '\nJudul: ' + poi.title
                            hasilpoi += '\nLink: ' + poi.link
                            client.reply(from, hasilpoi, id)
                        }

                        break
                    case 'cuaca':
                        if (args.length == 0) return client.reply(from, `Untuk melihat cuaca pada suatu daerah\nketik: ${prefix}cuaca [daerah]`, id)
                        const cuacaq = body.slice(7)
                        const cuacap = await rugaapi.cuaca(cuacaq)
                        await client.reply(from, cuacap, id)
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break

                    case 'play'://silahkan kalian custom sendiri jika ada yang ingin diubah
                        if (args.length == 0) return client.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: ${prefix}play judul lagu`, id)
                        axios.get(`http://arugaz.my.id/api/media/ytsearch?query=${body.slice(6)}`)
                            .then(async (res) => {
                                console.log(res.data.result[0].id)
                                var estimasi = res.data.result[0].duration / 50
                                var est = estimasi.toFixed(0)

                                function format(time) {
                                    // Hours, minutes and seconds
                                    var hrs = ~~(time / 3600);
                                    var mins = ~~((time % 3600) / 60);
                                    var secs = ~~time % 60;

                                    // Output like "1:01" or "4:03:59" or "123:03:59"
                                    var ret = "";
                                    if (hrs > 0) {
                                        ret += hrs + ":" + (mins < 10 ? "0" : "");
                                    }
                                    ret += mins + ":" + (secs < 10 ? "0" : "");
                                    ret += secs;
                                    return ret;
                                }
                                var durasi = format(res.data.result[0].duration)

                                var n = res.data.result[0].viewCount
                                var y = n.toLocaleString()
                                var x = y.replace(/,/g, '.')

                                await client.sendFileFromUrl(from, `${res.data.result[0].thumbnail}`, ``, `Video ditemukan\n\nJudul: ${res.data.result[0].title}\nDurasi: ${durasi}\nUploaded: ${res.data.result[0].uploadDate}\nView: ${x}\n\nsedang dikirim ± ${est} menit`, id)
                                rugaapi.ytmp3(`https://youtu.be/${res.data.result[0].id}`)
                                    .then(async (res) => {
                                        if (res.status == 'error') return client.sendFileFromUrl(from, `${res.link}`, '', `${res.error}`)
                                        //await client.sendFileFromUrl(from, `${res.getImages}`, '', `Lagu ditemukan\n\nJudul ${res.titleInfo}\n\nSabar lagi dikirim`, id)
                                        console.log(res.getAudio)
                                        var link = `${res.getAudio}.mp3`
                                        var time = moment(t * 1000).format('mm')
                                        var dir = `./media/ytmp3/${time}.mp3`
                                        async function play() {
                                            console.log('proses download sedang berlangsung')
                                            await download(link, dir, function (err) {
                                                if (err) {
                                                    console.error(err);
                                                } else {
                                                    console.log('Download Complete')
                                                    client.sendPtt(from, dir, id)
                                                        .then(console.log(`Audio Processed for ${processTime(t, moment())} Second`))
                                                }
                                            });
                                        }
                                        play()
                                    })
                            })
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break

                    case 'whatanime':
                        if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                            if (isMedia) {
                                var mediaData = await decryptMedia(message, uaOverride)
                            } else {
                                var mediaData = await decryptMedia(quotedMsg, uaOverride)
                            }
                            const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                            client.reply(from, 'Searching....', id)
                            fetch('https://trace.moe/api/search', {
                                method: 'POST',
                                body: JSON.stringify({ image: imgBS4 }),
                                headers: { "Content-Type": "application/json" }
                            })
                                .then(respon => respon.json())
                                .then(resolt => {
                                    if (resolt.docs && resolt.docs.length <= 0) {
                                        client.reply(from, 'Maaf, saya tidak tau ini anime apa, pastikan gambar yang akan di Search tidak Buram/Kepotong', id)
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
                                        client.reply(from, teks, id)
                                    })
                                })
                                .catch(() => {
                                    client.reply(from, 'Ada yang Error!', id)
                                })
                        } else {
                            client.reply(from, `Maaf format salah\n\nSilahkan kirim foto dengan caption ${prefix}whatanime\n\nAtau reply foto dengan caption ${prefix}whatanime`, id)
                        }
                        break

                    // Other Command
                    case 'resi':
                        if (args.length !== 2) return client.reply(from, `Maaf, format pesan salah.\nSilahkan ketik pesan dengan ${prefix}resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`, id)
                        const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
                        if (!kurirs.includes(args[0])) return client.sendText(from, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
                        console.log('Memeriksa No Resi', args[1], 'dengan ekspedisi', args[0])
                        cekResi(args[0], args[1]).then((result) => client.sendText(from, result))
                        break

                    case 'tts':
                    case 'say':
                        if (!isQuotedChat && args.length !== 0) {
                            const ttsGB = require('node-gtts')(args[0])
                            const dataText = body.slice(8)
                            if (dataText === '') return client.reply(from, 'Apa teksnya syg..', id)
                            try {
                                ttsGB.save('./media/tts.mp3', dataText, function () {
                                    client.sendPtt(from, './media/tts.mp3', id)
                                })
                            } catch (err) {
                                client.reply(from, err, id)
                            }
                        }
                        else if (isQuotedChat && args.length !== 0) {
                            const ttsGB = require('node-gtts')(args[0])
                            const dataText = quotedMsgObj.content.toString()
                            try {
                                ttsGB.save('./media/tts.mp3', dataText, function () {
                                    client.sendPtt(from, './media/tts.mp3', quotedMsgObj.id)
                                })
                            } catch (err) {
                                client.reply(from, err.toString(), id)
                            }
                        }
                        else {
                            await client.reply(from, `Mengubah teks menjadi sound (google voice)\nketik: ${prefix}tts <kode_bahasa> <teks>\ncontoh : ${prefix}tts id halo\nuntuk kode bahasa cek disini : https://anotepad.com/note/read/5xqahdy8`, id)
                        }
                        break

                    case 'ceklokasi':
                        if (!isQuotedLocation) return client.reply(from, `Maaf, format pesan salah.\nKirimkan lokasi dan reply dengan caption ${prefix}ceklokasi`, id)

                        client.reply(from, 'Okey sebentar...', id)
                        console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
                        const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
                        if (zoneStatus.kode !== 200) client.sendText(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
                        let datax = ''
                        for (let i = 0; i < zoneStatus.data.length; i++) {
                            const { zone, region } = zoneStatus.data[i]
                            const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
                            datax += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
                        }
                        const text = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${datax}`
                        client.sendText(from, text)
                        break

                    case 'shortlink':
                        if (args.length == 0) return client.reply(from, `ketik ${prefix}shortlink <url>`, id)
                        if (!isUrl(args[0])) return client.reply(from, 'Maaf, url yang kamu kirim tidak valid.', id)
                        const shortlink = await urlShortener(args[0])
                        await client.sendText(from, shortlink)
                            .catch(() => {
                                client.reply(from, 'Ada yang Error!', id)
                            })
                        break

                    case 'hilih':
                        if (args.length !== 0) {
                            rugaapi.hilihfont(body.slice(7))
                                .then(async (res) => {
                                    await client.reply(from, `${res}`, id)
                                })
                        }
                        else if (isQuotedChat && args.length === 0) {
                            rugaapi.hilihfont(quotedMsgObj.content.toString())
                                .then(async (res) => {
                                    await client.reply(from, `${res}`, quotedMsgObj.id)
                                })
                        }
                        else {
                            await client.reply(from, `Mengubah kalimat menjadi hilih gitu deh\n\nketik ${prefix}hilih kalimat\natau reply chat menggunakan ${prefix}hilih`, id)
                        }
                        break

                    case 'klasemen':
                    case 'klasmen':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        const klasemen = db.get('group').filter({ id: groupId }).map('members').value()[0]
                        let urut = Object.entries(klasemen).map(([key, val]) => ({ id: key, ...val })).sort((a, b) => b.denda - a.denda);
                        let textKlas = "*Klasemen Denda Sementara*\n"
                        let i = 1;
                        urut.forEach((klsmn) => {
                            textKlas += i + ". @" + klsmn.id.replace('@c.us', '') + " ➤ Rp" + formatin(klsmn.denda) + "\n"
                            i++
                        });
                        await client.sendTextWithMentions(from, textKlas)
                        break

                    case 'skripsi':
                        let randomSkripsi = skripsi[Math.floor(Math.random() * skripsi.length)]
                        const ttsGB = require('node-gtts')('id')
                        try {
                            ttsGB.save('./media/tts.mp3', randomSkripsi, function () {
                                client.sendPtt(from, './media/tts.mp3', id)
                            })
                        } catch (err) {
                            client.reply(from, err, id)
                        }
                        break

                    case 'apakah':
                        const isTrue = Boolean(Math.round(Math.random()))
                        var result = ''
                        if (args.length === 0) result = 'Apakah apa woy yang jelas dong! Misalnya, apakah aku ganteng?'
                        else {
                            result = isTrue ? 'Iya' : 'Tidak'
                        }
                        const ttsGBs = require('node-gtts')('id')
                        try {
                            ttsGBs.save('./media/tts.mp3', result, function () {
                                client.sendPtt(from, './media/tts.mp3', id)
                            })
                        } catch (err) {
                            client.reply(from, err, id)
                        }
                        break

                    // Group Commands (group admin only)
                    case 'add':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        if (args.length !== 1) return client.reply(from, `Untuk menggunakan ${prefix}add\nPenggunaan: ${prefix}add <nomor>\ncontoh: ${prefix}add 628xxx`, id)
                        try {
                            await client.addParticipant(from, `${args[0]}@c.us`)
                        } catch {
                            client.reply(from, 'Tidak dapat menambahkan target', id)
                        }
                        break

                    case 'kick':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        if (mentionedJidList.length === 0) return client.reply(from, 'Maaf, format pesan salah.\nSilahkan tag satu atau lebih orang yang akan dikeluarkan', id)
                        if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah.\nTidak dapat mengeluarkan akun bot sendiri', id)
                        await client.sendTextWithMentions(from, `Request diterima, mengeluarkan:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                        for (let i = 0; i < mentionedJidList.length; i++) {
                            if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, 'Gagal, kamu tidak bisa mengeluarkan admin grup.')
                            await client.removeParticipant(groupId, mentionedJidList[i])
                        }
                        break

                    case 'promote':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        if (mentionedJidList.length !== 1) return client.reply(from, 'Maaf, hanya bisa mempromote 1 user', id)
                        if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
                        if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah.\nTidak dapat mempromote akun bot sendiri', id)
                        await client.promoteParticipant(groupId, mentionedJidList[0])
                        await client.sendTextWithMentions(from, `Request diterima, menambahkan @${mentionedJidList[0].replace('@c.us', '')} sebagai admin.`)
                        break

                    case 'demote':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        if (mentionedJidList.length !== 1) return client.reply(from, 'Maaf, hanya bisa mendemote 1 user', id)
                        if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut belum menjadi admin.', id)
                        if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah.\nTidak dapat mendemote akun bot sendiri', id)
                        await client.demoteParticipant(groupId, mentionedJidList[0])
                        await client.sendTextWithMentions(from, `Request diterima, menghapus jabatan @${mentionedJidList[0].replace('@c.us', '')}.`)
                        break

                    case 'bye':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        client.sendText(from, 'Good bye... ( ⇀‸↼‶ )').then(() => client.leaveGroup(groupId))
                        break

                    case 'del':
                        if (!quotedMsg) return client.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
                        if (!quotedMsgObj.fromMe) return client.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
                        await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                        await client.simulateTyping(from, false)
                        break

                    case 'tagall':
                    case 'alle':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        const groupMem = await client.getGroupMembers(groupId)
                        let res = '╔══✪〘 Mention All 〙✪══\n'
                        for (let i = 0; i < groupMem.length; i++) {
                            res += '╠➥'
                            res += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                        res += '╚═〘 *SeroBot* 〙'
                        await client.sendTextWithMentions(from, res)
                        break

                    case 'katakasar':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        client.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
                        break

                    case 'kasar':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        // if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (args.length !== 1) return client.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
                        if (args[0] == 'on') {
                            ngegas.push(chatId)
                            fs.writeFileSync('./data/ngegas.json', JSON.stringify(ngegas))
                            client.reply(from, 'Fitur Anti Kasar sudah di Aktifkan', id)
                        } else if (args[0] == 'off') {
                            let nixx = ngegas.indexOf(chatId)
                            ngegas.splice(nixx, 1)
                            fs.writeFileSync('./data/ngegas.json', JSON.stringify(ngegas))
                            client.reply(from, 'Fitur Anti Kasar sudah di non-Aktifkan', id)
                        } else {
                            client.reply(from, `Untuk mengaktifkan Fitur Kata Kasar pada Group Chat\n\nApasih kegunaan Fitur Ini? Apabila seseorang mengucapkan kata kasar akan mendapatkan denda\n\nPenggunaan\n${prefix}kasar on --mengaktifkan\n${prefix}kasar off --nonaktifkan\n\n${prefix}reset --reset jumlah denda`, id)
                        }
                        break

                    case 'reset':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        const reset = db.get('group').find({ id: groupId }).assign({ members: [] }).write()
                        if (reset) {
                            await client.sendText(from, "Klasemen telah direset.")
                        }
                        break

                    case 'mutegrup':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        if (args.length !== 1) return client.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`, id)
                        if (args[0] == 'on') {
                            client.setGroupToAdminsOnly(groupId, true).then(() => client.sendText(from, 'Berhasil mengubah agar hanya admin yang dapat chat!'))
                        } else if (args[0] == 'off') {
                            client.setGroupToAdminsOnly(groupId, false).then(() => client.sendText(from, 'Berhasil mengubah agar semua anggota dapat chat!'))
                        } else {
                            client.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`, id)
                        }
                        break

                    case 'setprofile':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        if (isMedia && type == 'image' || isQuotedImage) {
                            const dataMedia = isQuotedImage ? quotedMsg : message
                            const _mimetype = dataMedia.mimetype
                            const mediaData = await decryptMedia(dataMedia, uaOverride)
                            const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                            await client.setGroupIcon(groupId, imageBase64)
                        } else if (args.length === 1) {
                            if (!isUrl(url)) { await client.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
                            client.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
                                ? client.reply(from, 'Maaf, link yang kamu kirim tidak memuat gambar.', id)
                                : client.reply(from, 'Berhasil mengubah profile group', id))
                        } else {
                            client.reply(from, `Commands ini digunakan untuk mengganti icon/profile group chat\n\n\nPenggunaan:\n1. Silahkan kirim/reply sebuah gambar dengan caption ${prefix}setprofile\n\n2. Silahkan ketik ${prefix}setprofile linkImage`)
                        }
                        break

                    case 'welcome':
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        //if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        if (args.length !== 1) return client.reply(from, `Membuat BOT menyapa member yang baru join kedalam group chat!\n\nPenggunaan:\n${prefix}welcome on --aktifkan\n${prefix}welcome off --nonaktifkan`, id)
                        if (args[0] == 'on') {
                            welcome.push(chatId)
                            fs.writeFileSync('./data/welcome.json', JSON.stringify(welcome))
                            client.reply(from, 'Welcome Message sekarang diaktifkan!', id)
                        } else if (args[0] == 'off') {
                            let xporn = welcome.indexOf(chatId)
                            welcome.splice(xporn, 1)
                            fs.writeFileSync('./data/welcome.json', JSON.stringify(welcome))
                            client.reply(from, 'Welcome Message sekarang dinonaktifkan', id)
                        } else {
                            client.reply(from, `Membuat BOT menyapa member yang baru join kedalam group chat!\n\nPenggunaan:\n${prefix}welcome on --aktifkan\n${prefix}welcome off --nonaktifkan`, id)
                        }
                        break

                    //Owner Group
                    case 'kickall': //mengeluarkan semua member
                        if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                        let isOwner = chat.groupMetadata.owner == pengirim
                        if (!isOwner) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai oleh owner grup!', id)
                        if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                        const allMem = await client.getGroupMembers(groupId)
                        for (let i = 0; i < allMem.length; i++) {
                            if (groupAdmins.includes(allMem[i].id)) {

                            } else {
                                await client.removeParticipant(groupId, allMem[i].id)
                            }
                        }
                        client.reply(from, 'Success kick all member', id)
                        break

                    //Owner Bot
                    case 'ban':
                        if (!isOwnerBot) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                        if (args.length == 0) return client.reply(from, `Untuk banned seseorang agar tidak bisa menggunakan commands\n\nCaranya ketik: \n${prefix}ban add 628xx --untuk mengaktifkan\n${prefix}ban del 628xx --untuk nonaktifkan\n\ncara cepat ban banyak digrup ketik:\n${prefix}ban @tag @tag @tag`, id)
                        if (args[0] == 'add') {
                            banned.push(args[1] + '@c.us')
                            fs.writeFileSync('./data/banned.json', JSON.stringify(banned))
                            client.reply(from, 'Success banned target!')
                        } else
                            if (args[0] == 'del') {
                                let xnxx = banned.indexOf(args[1] + '@c.us')
                                banned.splice(xnxx, 1)
                                fs.writeFileSync('./data/banned.json', JSON.stringify(banned))
                                client.reply(from, 'Success unbanned target!')
                            } else {
                                for (let i = 0; i < mentionedJidList.length; i++) {
                                    banned.push(mentionedJidList[i])
                                    fs.writeFileSync('./data/banned.json', JSON.stringify(banned))
                                    client.reply(from, 'Success ban target!', id)
                                }
                            }
                        break
                    case 'bc': //untuk broadcast atau promosi
                        if (!isOwnerBot) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                        if (args.length == 0) return client.reply(from, `Untuk broadcast ke semua chat ketik:\n${prefix}bc [isi chat]`)
                        let msg = body.slice(4)
                        const chatz = await client.getAllChatIds()
                        for (let idk of chatz) {
                            var cvk = await client.getChatById(idk)
                            if (!cvk.isReadOnly) client.sendText(idk, `══✪〘 *BOT Broadcast* 〙✪══\n\n${msg}`)
                            if (cvk.isReadOnly) client.sendText(idk, `══✪〘 *BOT Broadcast* 〙✪══\n\n${msg}`)
                        }
                        client.reply(from, 'Broadcast Success!', id)
                        break

                    case 'leaveall': //mengeluarkan bot dari semua group serta menghapus chatnya
                        if (!isOwnerBot) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                        const allChatz = await client.getAllChatIds()
                        const allGroupz = await client.getAllGroups()
                        for (let gclist of allGroupz) {
                            await client.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChatz.length}`)
                            await client.leaveGroup(gclist.contact.id)
                            await client.deleteChat(gclist.contact.id)
                        }
                        client.reply(from, 'Success leave all group!', id)
                        break

                    case 'clearall': //menghapus seluruh pesan diakun bot
                        if (!isOwnerBot) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                        const allChatx = await client.getAllChats()
                        for (let dchat of allChatx) {
                            await client.deleteChat(dchat.id)
                        }
                        client.reply(from, 'Success clear all chat!', id)
                        break
                    default:
                        await client.sendText(from, 'Perintah tidak ada.\n/menu untuk melihat daftar perintah!')
                        break
                }

            })//typing
        }

        // Kata kasar function
        if (!isCmd && isGroupMsg && isNgegas && chat.type !== "image") {
            const find = db.get('group').find({ id: groupId }).value()
            if (find && find.id === groupId) {
                const cekuser = db.get('group').filter({ id: groupId }).map('members').value()[0]
                const isIn = inArray(pengirim, cekuser)
                if (cekuser && isIn !== false) {
                    if (isKasar) {
                        const denda = db.get('group').filter({ id: groupId }).map('members[' + isIn + ']').find({ id: pengirim }).update('denda', n => n + 5000).write()
                        if (denda) {
                            await client.reply(from, "Jangan badword woy\nDenda +5.000\nTotal : Rp" + formatin(denda.denda), id)
                        }
                    }
                } else {
                    const cekMember = db.get('group').filter({ id: groupId }).map('members').value()[0]
                    if (cekMember.length === 0) {
                        if (isKasar) {
                            db.get('group').find({ id: groupId }).set('members', [{ id: pengirim, denda: 5000 }]).write()
                        } else {
                            db.get('group').find({ id: groupId }).set('members', [{ id: pengirim, denda: 0 }]).write()
                        }
                    } else {
                        const cekuser = db.get('group').filter({ id: groupId }).map('members').value()[0]
                        if (isKasar) {
                            cekuser.push({ id: pengirim, denda: 5000 })
                            await client.reply(from, "Jangan badword woy\nDenda +5.000", id)
                        } else {
                            cekuser.push({ id: pengirim, denda: 0 })
                        }
                        db.get('group').find({ id: groupId }).set('members', cekuser).write()
                    }
                }
            } else {
                if (isKasar) {
                    db.get('group').push({ id: groupId, members: [{ id: pengirim, denda: 5000 }] }).write()
                    await client.reply(from, "Jangan badword woy\nDenda +5.000\nTotal : Rp5.000", id)
                } else {
                    db.get('group').push({ id: groupId, members: [{ id: pengirim, denda: 0 }] }).write()
                }
            }
        }
    } catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}
