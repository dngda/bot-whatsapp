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
╠➥ ${prefix}donate _or_ ${prefix}donasi
╠➥ ${prefix}ping _or_ ${prefix}speed
╠➥ ${prefix}menu _or_ ${prefix}help
╠➥ ${prefix}owner
╠➥ ${prefix}stat
╠➥ ${prefix}tnc
║
╠══✪〘 Converter 〙✪
╠➥ ${prefix}getimage _or_ ${prefix}stickertoimg
╠➥ ${prefix}sticker _or_ ${prefix}stiker
╠➥ ${prefix}stickergiphy
╠➥ ${prefix}stickergif
╠➥ ${prefix}doctopdf _or_ ${prefix}pdf
╠➥ ${prefix}qrcode _or_ ${prefix}qr
╠➥ ${prefix}tts _or_ ${prefix}say
╠➥ ${prefix}shortlink
╠➥ ${prefix}ytmp3
╠➥ ${prefix}memefy
╠➥ ${prefix}nulis
╠➥ ${prefix}hilih
╠➥ ${prefix}play
║
╠══✪〘 Islam 〙✪
╠➥ ${prefix}listsurah
╠➥ ${prefix}infosurah
╠➥ ${prefix}jsholat
╠➥ ${prefix}alaudio
╠➥ ${prefix}tafsir
╠➥ ${prefix}surah
║
╠══✪〘 Random 〙✪
╠➥ ${prefix}katabijak
╠➥ ${prefix}artinama
╠➥ ${prefix}skripsi
╠➥ ${prefix}pantun
╠➥ ${prefix}apakah
╠➥ ${prefix}fakta
╠➥ ${prefix}quote
║
╠══✪〘 Hiburan 〙✪
╠➥ ${prefix}images _or_ ${prefix}pin
╠➥ ${prefix}whatanime
╠➥ ${prefix}sreddit
╠➥ ${prefix}anime
╠➥ ${prefix}memes
╠➥ ${prefix}kpop
╠➥ ${prefix}ToD
║
╠══✪〘 Info 〙✪
╠➥ ${prefix}ceklokasi
╠➥ ${prefix}crjogja
╠➥ ${prefix}cuaca
╠➥ ${prefix}resi
╠➥ ${prefix}kbbi
║
╠══✪〘 Anti Toxic 〙✪
╠➥ ${prefix}katakasar
╠➥ ${prefix}klasemen
╠➥ ${prefix}reset
║
╠══✪〘 More 〙✪
╠➥ ${prefix}tagall _or_ ${prefix}alle
╠➥ ${prefix}join
╠➥ ${prefix}bye
╠➥ ${prefix}del
║
╚═〘 *SeroBot* 〙

Hope you have a great day!✨
Support this bot -> https://saweria.co/dngda`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textAdmin = () => {
    return `
⚠ [ *Admin Group Only* ] ⚠ 
Berikut adalah fitur admin grup yang ada pada bot ini!

╔══✪〘 Admin ONLY 〙✪
╠➥ ${prefix}setprofile
╠➥ ${prefix}grouplink
╠➥ ${prefix}mutegrup
╠➥ ${prefix}promote
╠➥ ${prefix}~welcome~
╠➥ ${prefix}kickall
╠➥ ${prefix}demote
╠➥ ${prefix}revoke
╠➥ ${prefix}kick
╠➥ ${prefix}add
║
╠══✪〘 Owner Group ONLY 〙✪
╠➥ ${prefix}kickall
╠➥ ${prefix}addkasar
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

Ovo/Gopay: 0823 1048 7958 atau https://saweria.co/dngda
Paypal: https://paypal.me/dngda

USDT (Trc20) : TB29LW37akLR5VmCkatK3ppxftUogSA8SU
Bitcoin : 14vHto4CCXmEwC6BVsifyVmMxxsGydRHCS

Doakan agar project bot ini bisa terus berkembang
Doakan agar author bot ini dapat ide-ide yang kreatif lagi

Donasi akan digunakan untuk membantu orang yang membutuhkan (saya sendiri).

Terimakasih. ~Danang`
}