const fs = require('fs-extra')
const { 
    prefix
} = JSON.parse(fs.readFileSync('./settings/setting.json'))

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textTnC = () => {
    return `
Dengan menggunakan bot ini maka anda *setuju* dengan syarat dan kondisi sebagai berikut:
- Dilarang keras melakukan spam. Ketahuan = auto banned.
- Bot tidak akan merespon curhatan kalian.
- Bot tidak menyimpan gambar/media yang dikirimkan.
- Bot tidak menyimpan data pribadi anda di server kami.
- Bot tidak bertanggung jawab atas perintah anda kepada bot ini.
- Bot berjalan di server secara terpisah (Bukan dalam HP owner).
- Bot akan secara berkala dimonitoring oleh owner, jadi ada kemungkinan chat akan terbaca oleh owner.

Source code bisa dilihat di https://github.com/dngda/bot-whatsapp

Best regards, 

-Danang.`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textMenu = (pushname, t) => {
	var date = new Date(t * 1000)
	var n = date.getHours()
    return `
Hi, ${pushname}!
${ (3 < n && n <= 9) ? `*Selamat pagi 🌤️*` : (9 < n && n <= 14) ? `*Selamat siang ☀️*` : (14 < n && n <= 18) ? `*Selamat sore 🌻*` : `*Selamat malam 💤*` } 👋️

🌹 Selamat Idulfitri 1442H 🌹
 Mohon maaf lahir dan batin

Berikut adalah beberapa fitur yang ada pada bot ini!✨
Note: Selain \`\`\`(/)\`\`\` bot juga akan merespon simbol berikut:
\`\`\`! $ % & + . , < > -\`\`\`

╔══✪〘 Fitur BOT 〙✪
╠> ${prefix}donate _or_ ${prefix}donasi
╠> ${prefix}ping _or_ ${prefix}speed
╠> ${prefix}menu _or_ ${prefix}help
╠> ${prefix}owner
╠> ${prefix}stat
╠> ${prefix}tnc
║
╠══✪〘 Converter 〙✪
╠> ${prefix}getimage _or_ ${prefix}stickertoimg
╠> ${prefix}sticker _or_ ${prefix}stiker
╠> ${prefix}stickergiphy
╠> ${prefix}stickergif
╠> ${prefix}doctopdf _or_ ${prefix}pdf
╠> ${prefix}qrcode _or_ ${prefix}qr
╠> ${prefix}tts _or_ ${prefix}say
╠> ${prefix}shortlink
╠> ${prefix}translate
╠> ${prefix}tiktokmp3
╠> ${prefix}tiktok
╠> ${prefix}memefy
╠> ${prefix}ytmp3
╠> ${prefix}nulis
╠> ${prefix}hilih
║
╠══✪〘 Sound Converter 〙✪
╠> ${prefix}nightcore
╠> ${prefix}earrape
║
╠══✪〘 Islam 〙✪
╠> ${prefix}listsurah
╠> ${prefix}infosurah
╠> ${prefix}jsholat
╠> ${prefix}alaudio
╠> ${prefix}tafsir
╠> ${prefix}surah
║
╠══✪〘 Random 〙✪
╠> ${prefix}katabijak
╠> ${prefix}skripsi
╠> ${prefix}pantun
╠> ${prefix}fakta
╠> ${prefix}quote
╠> ${prefix}anime
╠> ${prefix}memes
║
╠══✪〘 Search 〙✪
╠> ${prefix}pinterest _or_ ${prefix}pin
╠> ${prefix}gimages _or_ ${prefix}gimg
╠> ${prefix}whatanime
╠> ${prefix}artinama
╠> ${prefix}sreddit
╠> ${prefix}lirik
╠> ${prefix}kpop
╠> ${prefix}play
╠> ${prefix}kbbi
║
╠══✪〘 Hiburan 〙✪
╠> ${prefix}tebakgambar
╠> ${prefix}apakah
╠> ${prefix}sfx
╠> ${prefix}ToD
║
╠══✪〘 Info 〙✪
╠> ${prefix}ceklokasi
╠> ${prefix}crjogja
╠> ${prefix}cuaca
╠> ${prefix}resi
║
╠══✪〘 Anti Toxic 〙✪
╠> ${prefix}katakasar
╠> ${prefix}klasemen
╠> ${prefix}reset
║
╠══✪〘 More Useful 〙✪
╠> ${prefix}tagall _or_ ${prefix}alle
╠> ${prefix}remind
╠> ${prefix}list
╠> ${prefix}join
╠> ${prefix}bye
╠> ${prefix}del
║
╚═〘 *SeroBot* 〙

Hope you have a great day!✨
Jangan ditelfon or blocked instantly!
Kalau anda merasa bot ini membantu/berguna silakan ber /donasi ✨`
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
╠➥ ${prefix}welcome
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
