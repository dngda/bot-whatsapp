const fs = require('fs-extra')
const { 
    prefix
} = JSON.parse(fs.readFileSync('./settings/setting.json'))

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textTnC = () => {
    return `
Source code / bot ini merupakan program open-source (gratis) yang ditulis menggunakan Javascript, kamu dapat menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan atau menjual salinan dengan tanpa menghapus author utama dari source code / bot ini.

Dengan menggunakan source code / bot ini maka anda setuju dengan Syarat dan Kondisi sebagai berikut:
- Source code / bot tidak menyimpan data anda di server kami.
- Source code / bot tidak bertanggung jawab atas perintah anda kepada bot ini.
- Source code / bot anda bisa lihat di https://github.com/dngda/bot-whatsapp

Best regards, 

Danang.`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textMenu = (pushname) => {
    return `
Hi, ${pushname}! 👋️
Berikut adalah beberapa fitur yang ada pada bot ini!✨

╔══✪〘 Fitur BOT 〙✪
╠➥ ${prefix}ping _atau_ ${prefix}speed
╠➥ ${prefix}menu _atau_ ${prefix}help
╠➥ ${prefix}ownerbot
╠➥ ${prefix}botstat
╠➥ ${prefix}tnc
╠➥ ${prefix}donate _atau_ ${prefix}donasi
║
╠══✪〘 Converter 〙✪
╠➥ ${prefix}sticker _atau_ ${prefix}stiker
╠➥ ${prefix}getimage _atau_ ${prefix}stickertoimg
╠➥ ${prefix}stickergif
╠➥ ${prefix}stickergiphy
╠➥ ${prefix}meme
╠➥ ${prefix}qrcode
╠➥ ${prefix}nulis
╠➥ ${prefix}shortlink
╠➥ ${prefix}hilih
╠➥ ${prefix}ytmp3 (beta)
╠➥ ${prefix}play (beta)
╠➥ ${prefix}tts _atau_ ${prefix}say
║
╠══✪〘 Islam 〙✪
╠➥ ${prefix}listsurah
╠➥ ${prefix}infosurah
╠➥ ${prefix}surah
╠➥ ${prefix}tafsir
╠➥ ${prefix}alaudio
╠➥ ${prefix}jsholat
║
╠══✪〘 Nganu 〙✪
╠➥ ${prefix}artinama
╠➥ ${prefix}fakta
╠➥ ${prefix}katabijak
╠➥ ${prefix}pantun
╠➥ ${prefix}quote
╠➥ ${prefix}apakah
╠➥ ${prefix}skripsi
║
╠══✪〘 Hiburan 〙✪
╠➥ ${prefix}anime
╠➥ ${prefix}animebatch
╠➥ ${prefix}whatanime
╠➥ ${prefix}kpop
╠➥ ${prefix}memes
╠➥ ${prefix}images
║
╠══✪〘 Info 〙✪
╠➥ ${prefix}sreddit
╠➥ ${prefix}cuaca
╠➥ ${prefix}resi
╠➥ ${prefix}ceklokasi
║
╠══✪〘 Anti Toxic 〙✪
╠➥ ${prefix}katakasar
╠➥ ${prefix}klasemen
╠➥ ${prefix}reset
║
╠══✪〘 Bot Conf 〙✪
╠➥ ${prefix}join
╠➥ ${prefix}bye
╠➥ ${prefix}del
╠➥ ${prefix}tagall _atau_ ${prefix}everyone
║
╚═〘 *SeroBot* 〙

Hope you have a great day!✨`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textAdmin = () => {
    return `
⚠ [ *Admin Group Only* ] ⚠ 
Berikut adalah fitur admin grup yang ada pada bot ini!

╔══✪〘 Admin ONLY 〙✪
╠➥ ${prefix}mutegrup
╠➥ ${prefix}setprofile
╠➥ ${prefix}welcome
╠➥ ${prefix}kickall
╠➥ ${prefix}grouplink
╠➥ ${prefix}revoke
╠➥ ${prefix}add
╠➥ ${prefix}kick
╠➥ ${prefix}promote
╠➥ ${prefix}demote
║
╠══✪〘 Owner Group ONLY 〙✪
╠➥ ${prefix}kickall
║
╚═〘 *SeroBot* 〙
`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textDonasi = () => {
    return `
Hai, terimakasih telah menggunakan bot ini, untuk mendukung bot ini kamu dapat membantu dengan berdonasi dengan cara:

Pulsa/Ovo/Gopay: 082310487958
Paypal: https://paypal.me/dngda

Doakan agar project bot ini bisa terus berkembang
Doakan agar author bot ini dapat ide-ide yang kreatif lagi

Donasi akan digunakan untuk membantu orang yang membutuhkan (saya sendiri).

Terimakasih. ~Danang`
}