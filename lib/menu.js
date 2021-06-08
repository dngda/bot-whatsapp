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
Note: Selain \`\`\`(/)\`\`\` bot juga akan merespon simbol berikut:
\`\`\`! $ % & + . , < > -\`\`\`

Operasi kalkulator gunakan prefix (=)
(cth: =10+2+4)

Kirim perintah langsung untuk melihat maksud dari setiap fitur
╔══✪〘 Wajib 〙✪
╠> *_${prefix}tnc_* or *_${prefix}rules
╚> Baca dan pahami sebelum melanjutkan ‼️

╔══✪〘 Informasi 〙✪
╠> *_${prefix}donate_* or *_${prefix}donasi_*
╠> *_${prefix}ping_* or *_${prefix}speed_*
╠> *_${prefix}owner_*
╠> *_${prefix}stat_*
║
╠══✪〘 Converter 〙✪
╠> *_${prefix}getimage_* or *_${prefix}toimg_*
║   Mengubah sticker menjadi gambar
╠> *_${prefix}sticker_* or *_${prefix}stiker_* or *_${prefix}s_*
║   Mengubah gambar/video menjadi sticker
╠> *_${prefix}stickergiphy_*
║   Mengubah url giphy menjadi sticker
╠> *_${prefix}doctopdf_* or *_${prefix}pdf_*
║   Mengubah dokumen menjadi pdf
╠> *_${prefix}qrcode_* or *_${prefix}qr_*
║   Membuat QRcode dari text
╠> *_${prefix}tts_* or *_${prefix}say_*
║   Mengubah text menjadi suara Google
╠> *_${prefix}shortlink_*
║   Pemendek url menggunakan tinyurl
╠> *_${prefix}translate_*
║   Google translate text
╠> *_${prefix}tiktokmp3_*
║   Download musik dari link tiktok
╠> *_${prefix}tiktok_*
║   Download tiktok tanpa watermark
╠> *_${prefix}memefy_*
║   Menambahkan text pada gambar
╠> *_${prefix}ytmp3_*
║   Download mp3 dari link youtube
╠> *_${prefix}hilih_*
║   Mengubah text vokal menjadi huruf i
╠> *_${prefix}ssweb_*
║   Screenshot url website
╠> *_${prefix}flip_*
║   Balik gambar scr horizontal/vertikal
║
╠══✪〘 Audio Converter 〙✪
║   Menambahkan efek suara pada audio
╠> *_${prefix}nightcore_*
╠> *_${prefix}deepslow_*
╠> *_${prefix}samarkan_*
╠> *_${prefix}vibrato_*
╠> *_${prefix}earrape_*
╠> *_${prefix}reverse_*
╠> *_${prefix}robot_*
║
╠══✪〘 Islam 〙✪
╠> *_${prefix}listsurah_*
║   Daftar surah yang tersedia
╠> *_${prefix}infosurah_*
║   Info surah yang diinginkan
╠> *_${prefix}jsholat_*
║   Jadwal sholat sesuai daerah
╠> *_${prefix}alaudio_*
║   Audio dari surah yg diinginkan
╠> *_${prefix}tafsir_*
║   Tafsir surah yg diinginkan
╠> *_${prefix}surah_*
║   Menampilkan ayat dari surah yang diinginkan
║
╠══✪〘 Random 〙✪
║   Random berarti acak
╠> *_${prefix}katabijak_*
╠> *_${prefix}skripsi_*
╠> *_${prefix}pantun_*
╠> *_${prefix}fakta_*
╠> *_${prefix}quote_*
╠> *_${prefix}anime_*
╠> *_${prefix}memes_*
║
╠══✪〘 Search 〙✪
╠> *_${prefix}pinterest_* or *_${prefix}pin_*
║   Search gambar dari pinterest
╠> *_${prefix}gimages_* or *_${prefix}gimg_*
║   Search gambar dari Google
╠> *_${prefix}whatanime_*
║   Mencoba menebak anime dari gambar
╠> *_${prefix}artinama_*
║   Primbon arti nama, hanya hiburan
╠> *_${prefix}sreddit_*
║   Search gambar dari sub reddit
╠> *_${prefix}lirik_*
║   Search lirik lagu
╠> *_${prefix}play_*
║   Search lagu dari youtube
╠> *_${prefix}kbbi_*
║   Search arti kata dalam KBBI
║
╠══✪〘 Hiburan 〙✪
╠> *_${prefix}tebakgambar_*
║   Main tebak gambar
╠> *_${prefix}apakah_*
║   Puja kerang ajaib!!!
╠> *_${prefix}sfx_*
║   Mengirimkan audio yg tersedia
╠> *_${prefix}ToD_*
║   Group only. Truth or dare?
║
╠══✪〘 Info 〙✪
╠> *_${prefix}cekcovid_*
║   Cek sebaran covid sesuai lokasi
╠> *_${prefix}crjogja_*
║   Radar cuaca lokasi Jogja
╠> *_${prefix}cuaca_*
║   Informasi cuara
╠> *_${prefix}resi_*
║   Cek resi barang
║
╠══✪〘 Anti Toxic 〙✪
║   Group only. Anti kata kasar
╠> *_${prefix}antikasar_*
╠> *_${prefix}klasemen_*
╠> *_${prefix}reset_*
║
╠══✪〘 More Useful 〙✪
╠> *_${prefix}tagall_* or *_${prefix}alle_*
║   Group only. Tag seluruh member
╠> *_${prefix}remind_*
║   Kirimkan pesan ulang sesuai waktu yg ditentukan
╠> *_${prefix}list_*
║   Membuat list atau daftar pribadi
╠> *_${prefix}join_*
║   Suruh bot untuk join group kalau slot tersedia
╠> *_${prefix}bye_*
║   Group only. Keluarkan bot
╠> *_${prefix}del_*
║   Hapus pesan bot
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
╠> *_${prefix}antilinkgroup_*
║   Kick otomatis yg kirim link group
╠> *_${prefix}setprofile_*
║   Ganti foto group
╠> *_${prefix}grouplink_*
║   Untuk mendapatkan group link
╠> *_${prefix}mutegroup_*
║   Selain admin gabisa kirim pesan
╠> *_${prefix}promote_*
║   Jadiin admin
╠> *_${prefix}welcome_*
║   Menyambut member baru join
╠> *_${prefix}demote_*
║   Cabut hak admin
╠> *_${prefix}revoke_*
║   Reset group link
╠> *_${prefix}kick_*
║   Kick member
╠> *_${prefix}add_*
║   Tambah member
║
║ (fitur welcome sering error, mending gak usah)
║
╠══✪〘 Owner Group Only 〙✪
╠> *_${prefix}kickall_*
║   Kick semua member kecuali admin
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