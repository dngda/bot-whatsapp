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
- Source code / bot anda bisa lihat di https://github.com/nuraziz0404/botwa

Best regards, Aziz.`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textMenu = (pushname) => {
    return `
Hi, ${pushname}! 👋️
Berikut adalah beberapa fitur yang ada pada bot ini!✨

╔══✪〘 Fitur BOT 〙✪
╠➥ ${prefix}status
╠➥ ${prefix}ping && ${prefix}speed
╠➥ ${prefix}menu && ${prefix}help
╠➥ ${prefix}ownerbot
╠➥ ${prefix}botstat
╠➥ ${prefix}tnc
╠➥ ${prefix}donate && ${prefix}donasi
║
╠══✪〘 Converter 〙✪
╠➥ ${prefix}sticker
╠➥ ${prefix}getimage && ${prefix}stickertoimg
╠➥ ${prefix}stickergif && ${prefix}gifsticker
╠➥ ${prefix}stickergiphy
╠➥ ${prefix}meme
╠➥ ${prefix}logoph
╠➥ ${prefix}qrcode
╠➥ ${prefix}nulis
╠➥ ${prefix}shortlink
╠➥ ${prefix}hilihfont
╠➥ ${prefix}ytmp3 (beta)
╠➥ ${prefix}play (beta)
╠➥ ${prefix}tts
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
║
╠══✪〘 Hiburan 〙✪
╠➥ ${prefix}anime
╠➥ ${prefix}animebatch
╠➥ ${prefix}whatanime
╠➥ ${prefix}kpop
╠➥ ${prefix}memes
╠➥ ${prefix}simisimi
║
╠══✪〘 Info 〙✪
╠➥ ${prefix}sreddit
╠➥ ${prefix}cuaca
╠➥ ${prefix}resi
╠➥ ${prefix}ceklokasi
║
╠══✪〘 18+ ONLY [❗] 〙✪
╠➥ ${prefix}nekopoi
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
╠➥ ${prefix}tagall
║
╠══✪〘 Owner only [❗] 〙✪
╠➥ ${prefix}ban
╠➥ ${prefix}bc
╠➥ ${prefix}leaveall
╠➥ ${prefix}clearall
║
╚═〘 *CR_AZYZ  B O T* 〙

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
╚═〘 *CR_AZYZ  B O T* 〙
`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textDonasi = () => {
    return `
Hai, terimakasih telah menggunakan bot ini, untuk mendukung bot ini kamu dapat membantu dengan berdonasi dengan cara:

Pulsa : 089694553246
Paypal: https://www.paypal.me/aziz0000

Doakan agar project bot ini bisa terus berkembang
Doakan agar author bot ini dapat ide-ide yang kreatif lagi

Donasi akan digunakan untuk membantu orang yang membutuhkan (saya sendiri).

Terimakasih. ~Aziz`
}