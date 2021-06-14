import fs from 'fs-extra'
const { readFileSync } = fs
const {
    prefix
} = JSON.parse(readFileSync('./settings/setting.json'))
const m = (namaMenu) => `*_${prefix}${namaMenu}_*`

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

const textTnC = () => {
    return `
SeroBot adalah *Bot* yg merupakan akronim dari kata Robot yang berarti sebuah sistem yang diprogram oleh komputer.
Sehingga respon atau balasan yang dilakukan oleh bot bukanlah dari Manusia.

Dengan menggunakan bot ini maka anda *setuju* dengan syarat dan kondisi sebagai berikut:
- Berilah jeda dari setiap perintah.
- Dilarang menelfon bot, atau kalian akan kena block otomatis.
- Dilarang keras melakukan spam. Ketahuan = auto banned.
- Bot tidak akan merespon curhatan kalian.
- Bot tidak menyimpan gambar/media yang dikirimkan.
- Bot tidak menyimpan data pribadi anda di server kami.
- Bot tidak bertanggung jawab atas perintah anda kepada bot ini.
- Bot berjalan di server secara terpisah (Bukan dalam HP owner).
- Bot akan secara berkala dimonitoring oleh owner, jadi ada kemungkinan chat akan terbaca oleh owner.
- Bot akan dilakukan pembersihan setiap awal bulan atau saat dirasa diperlukan.

Get interested in this open source project? 
Collaborate now: https://github.com/dngda/bot-whatsapp

Best regards, 

-Danang.`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

const textMenu = (pushname, t) => {
    var readMore = '͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏' //its 2000 characters so that makes whatsapp add 'readmore' button
    var date = new Date(t * 1000)
    var n = date.getHours()
    return `
Hi, ${pushname}!
${(3 < n && n <= 9) ? `*Selamat pagi 🌤️*` : (9 < n && n <= 14) ? `*Selamat siang ☀️*` : (14 < n && n <= 18) ? `*Selamat sore 🌻*` : `*Selamat malam 💤*`} 👋️
\`\`\` ___              ___      _   
/ __| ___ _ _ ___| _ ) ___| |_ 
\\__ \\/ -_) '_/ _ \\ _ \\/ _ \\  _|
|___/\\___|_| \\___/___/\\___/\\__|\`\`\`

Berikut adalah beberapa fitur yang ada pada bot ini!✨
${readMore}
Note: 
Kirim perintah tanpa argumen untuk melihat maksud dari setiap fitur.
Selain \`\`\`(/)\`\`\` bot juga akan merespon simbol berikut:
\`\`\`! $ % & + . , < > -\`\`\`

Operasi kalkulator gunakan prefix (=)
(cth: =10+2+4)

╔══✪〘 Wajib 〙✪
╠> ${m('tnc')} or ${m('rules')}
╚> Baca dan pahami sebelum melanjutkan ‼️

╔══✪〘 Informasi 〙✪
╠> ${m('donate')} or ${m('donasi')}
╠> ${m('ping')} or ${m('speed')}
╠> ${m('owner')}
╠> ${m('stat')}
║
╠══✪〘 Converter 〙✪
╠> ${m('getimage')} or ${m('toimg')}
║   Mengubah sticker menjadi gambar.
╠> ${m('sticker')} or ${m('stiker')} or ${m('s')}
║   Mengubah gambar/video menjadi sticker.
╠> ${m('stickergiphy')}
║   Mengubah url giphy menjadi sticker.
╠> ${m('doctopdf')} or ${m('pdf')}
║   Mengubah dokumen menjadi pdf.
╠> ${m('qrcode')} or ${m('qr')}
║   Membuat QRcode dari text.
╠> ${m('tts')} or ${m('say')}
║   Mengubah text menjadi suara Google.
╠> ${m('shortlink')}
║   Pemendek url menggunakan tinyurl.
╠> ${m('translate')}
║   Google translate text.
╠> ${m('memefy')}
║   Menambahkan text pada gambar.
╠> ${m('tomp3')}
║   Convert video ke audio.
╠> ${m('hilih')}
║   Mengubah text vokal menjadi huruf i.
╠> ${m('ssweb')}
║   Screenshot url website.
╠> ${m('flip')}
║   Balik gambar scr horizontal/vertikal.
║
╠══✪〘 Downloader 〙✪
╠> ${m('tiktokmp3')}
║   Download musik dari link tiktok.
╠> ${m('tiktok')}
║   Download tiktok tanpa watermark.
╠> ${m('ytmp3')}
║   Download mp3 dari link youtube.
╠> ${m('ytmp4')}
║   Download mp4 dari link youtube.
║
╠══✪〘 Audio Converter 〙✪
║   Menambahkan efek suara pada audio.
╠> ${m('nightcore')}
╠> ${m('deepslow')}
╠> ${m('samarkan')}
╠> ${m('vibrato')}
╠> ${m('earrape')}
╠> ${m('reverse')}
╠> ${m('robot')}
╠══✪
╠> ${m('cf')}
║   Custom complex filter (Expert user only)
║
╠══✪〘 Islam 〙✪
╠> ${m('listsurah')}
║   Daftar surah yang tersedia.
╠> ${m('infosurah')}
║   Info surah yang diinginkan.
╠> ${m('jsholat')}
║   Jadwal sholat sesuai daerah.
╠> ${m('alaudio')}
║   Audio dari surah yg diinginkan.
╠> ${m('tafsir')}
║   Tafsir surah yg diinginkan.
╠> ${m('surah')}
║   Menampilkan ayat dari surah yang diinginkan.
║
╠══✪〘 Random 〙✪
║   Random berarti acak.
╠> ${m('katabijak')}
╠> ${m('skripsi')}
╠> ${m('pantun')}
╠> ${m('fakta')}
╠> ${m('quote')}
╠> ${m('anime')}
╠> ${m('memes')}
║
╠══✪〘 Search 〙✪
╠> ${m('pinterest')} or ${m('pin')}
║   Search gambar dari pinterest.
╠> ${m('gimages')} or ${m('gimg')}
║   Search gambar dari Google.
╠> ${m('whatanime')}
║   Mencoba menebak anime dari gambar.
╠> ${m('artinama')}
║   Primbon arti nama, hanya hiburan.
╠> ${m('sreddit')}
║   Search gambar dari Subreddit.
╠> ${m('lirik')}
║   Search lirik lagu.
╠> ${m('play')}
║   Search lagu dari Youtube.
╠> ${m('kbbi')}
║   Search arti kata dalam KBBI.
╠> ${m('yt')}
║   Search Youtube.
║
╠══✪〘 Hiburan 〙✪
╠> ${m('tebakgambar')}
║   Main tebak gambar.
╠> ${m('apakah')}
║   Puja kerang ajaib!!!
╠> ${m('sfx')}
║   Mengirimkan audio yg tersedia.
╠> ${m('ToD')}
║   Group only. Truth or dare?
║
╠══✪〘 Info 〙✪
╠> ${m('cekcovid')}
║   Cek sebaran covid sesuai lokasi.
╠> ${m('crjogja')}
║   Radar cuaca lokasi Jogja.
╠> ${m('cuaca')}
║   Informasi cuaca sesuai daerah.
╠> ${m('resi')}
║   Cek resi barang sesuai kurir.
║
╠══✪〘 Anti Toxic 〙✪
║   Group only. Anti kata kasar.
╠> ${m('antikasar')}
╠> ${m('klasemen')}
╠> ${m('reset')}
║
╠══✪〘 More Useful 〙✪
╠> ${m('tagall')} or ${m('alle')}
║   Group only. Tag seluruh member.
╠> ${m('join')} or ${m('sewa')}
║   Sewa bot untuk join group kalau slot tersedia.
╠> ${m('remind')}
║   Kirimkan pesan ulang sesuai waktu yg ditentukan.
╠> ${m('list')}
║   Membuat list atau daftar yg disimpan di bot.
╠> ${m('note')}
║   Membuat note atau catatan yg disimpan di bot.
╠> ${m('bye')}
║   Group only. Keluarkan bot.
╠> ${m('del')}
║   Hapus pesan bot.
║
╚═〘 *SeroBot* 〙

Note : 
Reply pesanmu yang berisi perintah
dengan '..' (titik double) untuk mengirimkannya kembali.

Hope you have a great day!✨
Jangan ditelfon or blocked instantly!
Kalau anda merasa bot ini membantu/berguna silakan berdonasi ✨`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

const textAdmin = () => {
    return `
⚠ [ *Admin Group Only* ] ⚠ 
Berikut adalah fitur admin grup yang ada pada bot ini!

╔══✪〘 Admin Only 〙✪
╠> ${m('antilinkgroup')}
║   Kick otomatis yg kirim link group
╠> ${m('setprofile')}
║   Ganti foto group
╠> ${m('grouplink')}
║   Untuk mendapatkan group link
╠> ${m('mutegroup')}
║   Selain admin gabisa kirim pesan
╠> ${m('promote')}
║   Jadiin admin
╠> ${m('welcome')}
║   Menyambut member baru join
╠> ${m('demote')}
║   Cabut hak admin
╠> ${m('revoke')}
║   Reset group link
╠> ${m('kick')}
║   Kick member
╠> ${m('add')}
║   Tambah member
║
║ (fitur welcome sering error, mending gak usah)
║
╠══✪〘 Owner Group Only 〙✪
╠> ${m('kickall')}
║   Kick semua member kecuali admin
║
╚═〘 *SeroBot* 〙
`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

const textOwner = () => {
    return `
⚠ [ *Owner Only* ] ⚠ 
Berikut adalah fitur owner yang ada pada bot ini!

╔══✪〘 Owner Only 〙✪
╠> ${m('addkasar')}
║   Add kata kasar ke database. Restart required.
╠> ${m('restart')}
║   Restart nodejs. Windows only.
╠> ${m('grouplist')}
║   Return all group list
╠> ${m('ban')}
║   Ban user.
╠> ${m('unban')}
║   Unban user.
╠> ${m('bc')}
║   Broadcast all chats.
╠> ${m('bcgroup')}
║   Broadcast all group.
╠> ${m('leaveall')}
║   Leave all group kecuali premium (Pembersihan)
╠> ${m('clearexitedgroup')}
║   Delete chat group yang sudah keluar.
╠> ${m('deleteall')}
║   Delete semua chat termasuk group tanpa keluar group.
╠> ${m('clearall')}
║   Clear semua chat tanpa menghapus chats.
╠> ${m('deletepm')}
║   Delete semua chat private.
╠> ${m('clearpm')}
║   Clear semua chat private tanpa menghapus chats.
╠> ${m('unblock')} or ${m('u')}
║   Unblock user.
╠> ${m('getinfo')}
║   Get info dari link group.
╠> ${m('addprem')}
║   Add group ke premium.
╠> ${m('>')}
║   Eval.
╠> ${m('=')}
║   Shell.
║
╚═〘 *SeroBot* 〙
`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

const textDonasi = () => {
    return `
Hai, terimakasih telah menggunakan bot ini, untuk mendukung bot ini kamu dapat membantu dengan berdonasi dengan cara:

Ovo/Gopay/Dana: 0823 1048 7958
Pulsa: 0858 7750 2176
Paypal: https://paypal.me/dngda
Saweria: https://saweria.co/dngda
Trakteer: https://trakteer.id/dngda

Bitcoin : 14vHto4CCXmEwC6BVsifyVmMxxsGydRHCS
USDT (Trc20) : TB29LW37akLR5VmCkatK3ppxftUogSA8SU

Berapapun nominalnya akan sangat membantu pengembangan bot ini.
Terimakasih. ~Danang`
}

export default {
    textTnC,
    textMenu,
    textOwner,
    textAdmin,
    textDonasi
}