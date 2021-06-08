import fs from 'fs-extra'
const { readFileSync } = fs
const {
    prefix
} = JSON.parse(readFileSync('./settings/setting.json'))

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

const textTnC = () => {
    return `
SeroBot adalah *Bot* yg merupakan akronim dari kata Robot yang berarti sebuah sistem yang diprogram oleh komputer.
Sehingga respon atau balasan yang dilakukan oleh bot bukanlah dari Manusia.

Dengan menggunakan bot ini maka anda *setuju* dengan syarat dan kondisi sebagai berikut:
- Dilarang menelfon bot, atau kalian akan kena block otomatis.
- Dilarang keras melakukan spam. Ketahuan = auto banned.
- Bot tidak akan merespon curhatan kalian.
- Bot tidak menyimpan gambar/media yang dikirimkan.
- Bot tidak menyimpan data pribadi anda di server kami.
- Bot tidak bertanggung jawab atas perintah anda kepada bot ini.
- Bot berjalan di server secara terpisah (Bukan dalam HP owner).
- Bot akan secara berkala dimonitoring oleh owner, jadi ada kemungkinan chat akan terbaca oleh owner.
- Bot akan dilakukan pembersihan setiap awal bulan atau saat dirasa diperlukan.

Source code bisa dilihat di https://github.com/dngda/bot-whatsapp

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
╔══✪〘 Wajib 〙✪
║ ‼️ Baca dan pahami rules/tnc sebelum melanjutkan ‼️
╚> ${prefix}tnc _or_ ${prefix}rules

Note: Selain \`\`\`(/)\`\`\` bot juga akan merespon simbol berikut:
\`\`\`! $ % & + . , < > -\`\`\`

Operasi kalkulator gunakan prefix (=)
(cth: =10+2+4)

Kirim perintah langsung untuk melihat maksud dari setiap fitur

╔══✪〘 Informasi 〙✪
╠> ${prefix}donate _or_ ${prefix}donasi
╠> ${prefix}ping _or_ ${prefix}speed
╠> ${prefix}owner
╠> ${prefix}stat
║
╠══✪〘 Converter 〙✪
╠> ${prefix}getimage _or_ ${prefix}toimg
║  _Mengubah sticker menjadi gambar_
╠> ${prefix}sticker _or_ ${prefix}stiker _or_ ${prefix}s
║  _Mengubah gambar/video menjadi sticker_
╠> ${prefix}stickergiphy
║  _Mengubah url giphy menjadi sticker
╠> ${prefix}doctopdf _or_ ${prefix}pdf
║  _Mengubah dokumen menjadi pdf_
╠> ${prefix}qrcode _or_ ${prefix}qr
║  _Membuat QRcode dari text
╠> ${prefix}tts _or_ ${prefix}say
║  _Mengubah text menjadi suara Google_
╠> ${prefix}shortlink
║  _Pemendek url menggunakan tinyurl_
╠> ${prefix}translate
║  _Google translate text_
╠> ${prefix}tiktokmp3
║  _Download musik dari link tiktok_
╠> ${prefix}tiktok
║  _Download tiktok tanpa watermark_
╠> ${prefix}memefy
║  _Menambahkan text pada gambar_
╠> ${prefix}ytmp3
║  _Download mp3 dari link youtube
╠> ${prefix}hilih
║  _Mengubah text vokal menjadi huruf i
╠> ${prefix}ssweb
║  _Screenshot url website_
╠> ${prefix}flip
║  _Balik gambar scr horizontal/vertikal_
║
╠══✪〘 Audio Converter 〙✪
║  _Menambahkan efek suara pada audio_
╠> ${prefix}nightcore
╠> ${prefix}deepslow
╠> ${prefix}samarkan
╠> ${prefix}vibrato
╠> ${prefix}earrape
╠> ${prefix}reverse
╠> ${prefix}robot
║
╠══✪〘 Islam 〙✪
╠> ${prefix}listsurah
║  _Daftar surah yang tersedia_
╠> ${prefix}infosurah
║  _Info surah yang diinginkan_
╠> ${prefix}jsholat
║  _Jadwal sholat sesuai daerah_
╠> ${prefix}alaudio
║  _Audio dari surah yg diinginkan_
╠> ${prefix}tafsir
║  _Tafsir surah yg diinginkan_
╠> ${prefix}surah
║  _Menampilkan ayat dari surah yang diinginkan_
║
╠══✪〘 Random 〙✪
║  _Random berarti acak_
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
║  _Search gambar dari pinterest
╠> ${prefix}gimages _or_ ${prefix}gimg
║  _Search gambar dari Google
╠> ${prefix}whatanime
║  _Mencoba menebak anime dari gambar_
╠> ${prefix}artinama
║  _Primbon arti nama, hanya hiburan_
╠> ${prefix}sreddit
║  _Search gambar dari sub reddit_
╠> ${prefix}lirik
║  _Search lirik lagu_
╠> ${prefix}play
║  _Search lagu dari youtube_
╠> ${prefix}kbbi
║  _Search arti kata dalam KBBI_
║
╠══✪〘 Hiburan 〙✪
╠> ${prefix}tebakgambar
║  _Main tebak gambar_
╠> ${prefix}apakah
║  _Puja kerang ajaib!!!_
╠> ${prefix}sfx
║  _Mengirimkan audio yg tersedia_
╠> ${prefix}ToD
║  _Group only. Truth or dare?_
║
╠══✪〘 Info 〙✪
╠> ${prefix}cekcovid
║  _Cek sebaran covid sesuai lokasi_
╠> ${prefix}crjogja
║  _Radar cuaca lokasi Jogja_
╠> ${prefix}cuaca
║  _Informasi cuara_
╠> ${prefix}resi
║  _Cek resi barang_
║
╠══✪〘 Anti Toxic 〙✪
║  _Group only_
╠> ${prefix}antikasar
╠> ${prefix}klasemen
╠> ${prefix}reset
║
╠══✪〘 More Useful 〙✪
╠> ${prefix}tagall _or_ ${prefix}alle
║  _Group only. Tag seluruh member_
╠> ${prefix}remind
║  _Kirimkan pesan ulang sesuai waktu yg ditentukan_
╠> ${prefix}list
║  _Membuat list atau daftar pribadi_
╠> ${prefix}join
║  _Suruh bot untuk join group kalau slot tersedia_
╠> ${prefix}bye
║  _Group only. Keluarkan bot_
╠> ${prefix}del
║  _Hapus pesan bot_
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

╔══✪〘 Admin ONLY 〙✪
╠> ${prefix}antilinkgroup
╠> ${prefix}setprofile
╠> ${prefix}grouplink
╠> ${prefix}mutegroup
╠> ${prefix}promote
╠> ${prefix}welcome
╠> ${prefix}demote
╠> ${prefix}revoke
╠> ${prefix}kick
╠> ${prefix}add
║
║ (fitur welcome sering error, mending gak usah)
║
╠══✪〘 Owner Group Only 〙✪
╠> ${prefix}kickall
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
Paypal: https://paypal.me/dngda
saweria: https://saweria.co/dngda
Trakteer: https://trakteer.id/dngda

Bitcoin : 14vHto4CCXmEwC6BVsifyVmMxxsGydRHCS
USDT (Trc20) : TB29LW37akLR5VmCkatK3ppxftUogSA8SU

Berapapun nominalnya akan sangat membantu pengembangan bot ini.
Terimakasih. ~Danang`
}

export default {
    textTnC,
    textMenu,
    textAdmin,
    textDonasi
}