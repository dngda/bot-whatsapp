const fs = require('fs-extra')
const { 
    prefix
} = JSON.parse(fs.readFileSync('./settings/setting.json'))

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textTnC = () => {
    return `
Dengan menggunakan bot ini maka anda setuju dengan Syarat dan Kondisi sebagai berikut:
- Dilarang keras melakukan spam. Ketahuan = auto banned.
- bot tidak menyimpan gambar/media yang dikirimkan.
- bot tidak menyimpan data pribadi anda di server kami.
- bot tidak bertanggung jawab atas perintah anda kepada bot ini.
Source code bisa dilihat di https://github.com/dngda/bot-whatsapp

Best regards, 

-Danang.`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textMenu = (pushname, t) => {
	var n = new Date(t).getHours()
    return `
Hi, ${pushname}! 👋️
${ (3 < n <= 9) ? `*Selamat Pagi*` : (9 < n <= 14) ? `*Selamat Siang*` : (14 < n <= 18) ? `*Selamat Sore*` : `*Selamat Malam*` }
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
╠➥ ${prefix}translate
╠➥ ${prefix}ytmp3
╠➥ ${prefix}memefy
╠➥ ${prefix}nulis
╠➥ ${prefix}hilih
╠➥ ${prefix}play
╠➥ ${prefix}ytmp3
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
╠➥ ${prefix}images _or_ ${prefix}pin (offline)
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
╠══✪〘 More Useful 〙✪
╠➥ ${prefix}tagall _or_ ${prefix}alle
╠➥ ${prefix}list
╠➥ ${prefix}join
╠➥ ${prefix}bye
╠➥ ${prefix}del
║
╚═〘 *SeroBot* 〙

Hope you have a great day!✨
Jangan ditelfon or blocked instantly!

Kalau anda merasa bot ini membantu/berguna silakan berdonasi ✨`
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
╠➥ ${prefix}welcome (beta)
╠➥ ${prefix}demote
╠➥ ${prefix}revoke
╠➥ ${prefix}kick
╠➥ ${prefix}add
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

Ovo/Gopay/Dana: 0823 1048 7958
Paypal: https://paypal.me/dngda
saweria: https://saweria.co/dngda
Trakteer: https://trakteer.id/dngda

Bitcoin : 14vHto4CCXmEwC6BVsifyVmMxxsGydRHCS
USDT (Trc20) : TB29LW37akLR5VmCkatK3ppxftUogSA8SU

Berapapun nominalnya akan sangat membantu pengembangan bot ini.
Terimakasih. ~Danang`
}