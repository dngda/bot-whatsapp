<p align="center">
<img src="https://user-images.githubusercontent.com/35982346/123402400-e57d3000-d5d1-11eb-84c0-6881b56ad370.png" height="128"/>
</p>
<p align="center">
<a href="https://github.com/dngda/bot-whatsapp"><img title="Whatsapp-Bot" src="https://img.shields.io/badge/Sero Whatsapp Bot-green?colorA=%23ff0000&colorB=%23017e40&style=for-the-badge"></a>
  <br>
Multipurpose WhatsApp Bot using open-wa/wa-automate-nodejs library!<hr>
</p>
<h3 align="center">Made with ❤️ by</h3>
<p align="center">
<a href="https://github.com/dngda/"><img title="Author" src="https://img.shields.io/badge/author-dngda-blue?style=for-the-badge&logo=github"></a>
</p>
<p align="center">
<a href="https://github.com/dngda/followers"><img title="Followers" src="https://img.shields.io/github/followers/dngda?color=blue&style=flat-square"></a>
<a href="https://github.com/dngda/bot-whatsapp/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/dngda/bot-whatsapp?color=red&style=flat-square"></a>
<a href="https://github.com/dngda/bot-whatsapp/network/members"><img title="Forks" src="https://img.shields.io/github/forks/dngda/bot-whatsapp?color=red&style=flat-square"></a>
<a href="https://github.com/dngda/bot-whatsapp/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/dngda/bot-whatsapp?label=watchers&color=blue&style=flat-square"></a>
  <br><a href="https://www.codefactor.io/repository/github/dngda/bot-whatsapp"><img src="https://www.codefactor.io/repository/github/dngda/bot-whatsapp/badge" alt="CodeFactor" /></a> <a href="https://sonarcloud.io/dashboard?id=dngda_bot-whatsapp"><img src="https://sonarcloud.io/api/project_badges/measure?project=dngda_bot-whatsapp&metric=alert_status" alt="SonarCloud" /></a>
  <br>
<a href="https://github.com/open-wa/wa-automate-nodejs"><img src="https://raw.githubusercontent.com/open-wa/wa-automate-nodejs/master/resources/hotfix-logo.png" height="64"/></a>
</p>

## Getting Started

This project require NodeJS v12

### Install
Clone this project

```bash
> git clone https://github.com/dngda/bot-whatsapp
> cd bot-whatsapp
```

You need to install Libreoffice to use doctopdf command

Install the dependencies:

```bash
> npm install
```

### Usage
Run the Whatsapp bot

```bash
> npm start
```

After running it you need to scan the QR

### Information
- Change ownerNumber on [this section](https://github.com/dngda/bot-whatsapp/blob/main/settings/setting.json#L2)
- Change groupLimit on [this section](https://github.com/dngda/bot-whatsapp/blob/main/settings/setting.json#L3)
- Change memberLimit on [this section](https://github.com/dngda/bot-whatsapp/blob/main/settings/setting.json#L4)
- Change prefix on [this section](https://github.com/dngda/bot-whatsapp/blob/main/settings/setting.json#L5)
- Change menu on [this section](https://github.com/dngda/bot-whatsapp/blob/main/lib/menu.js#L34)
- Add kata kasar on [this section](https://github.com/dngda/bot-whatsapp/blob/main/settings/katakasar.json)
- Change all apiKey on [this section](https://github.com/dngda/bot-whatsapp/blob/main/settings/api.json.example) then *rename to api.json*

- Create Saweria account and get SaweriaOverlay on [this website](https://saweria.co)
- Get Api NoBackground on [this website](https://www.remove.bg/)
- Get Api LolHuman on [this website](https://lolhuman.herokuapp.com)
- Get Api Fariaz on [this website](https://rest.farzain.com)
- Get Api Genius on [this website](https://genius.com/developers)
- Get Api Itech on [this website](https://api.i-tech.id)
- Get Api Ocr on [this website](https://ocr.space/OCRAPI)
---

## Features
Operasi kalkulator gunakan prefix (=)
(cth: =10+2+4)

Informasi
- donate or donasi
- ping or speed
- owner
- stat

Converter
- getimage or toimg
-> Mengubah sticker menjadi gambar.
- sticker or stiker or s
-> Mengubah gambar/video menjadi sticker.
- stickergiphy
-> Mengubah url giphy menjadi sticker.
- doctopdf or pdf
-> Mengubah dokumen menjadi pdf.
- qrcode or qr
-> Membuat QRcode dari text.
- tts or say
-> Mengubah text menjadi suara Google.
- shortlink
-> Pemendek url menggunakan tinyurl.
- translate
-> Google translate text.
- memefy
-> Menambahkan text pada gambar.
- tomp3
-> Convert video ke audio.
- hilih
-> Mengubah text vokal menjadi huruf i.
- ssweb
-> Screenshot url website.
- flip
-> Balik gambar scr horizontal/vertikal.

Downloader
- tiktokmp3
-> Download musik dari link tiktok.
- tiktok
-> Download tiktok tanpa watermark.
- ytmp3
-> Download mp3 dari link youtube.
- ytmp4
-> Download mp4 dari link youtube.

Audio Converter
-> Menambahkan efek suara pada audio.
- nightcore
- deepslow
- samarkan
- vibrato
- earrape
- reverse
- robot
- cf
-> Custom complex filter (Expert user only)

Islam
- listsurah
-> Daftar surah yang tersedia.
- infosurah
-> Info surah yang diinginkan.
- jsholat
-> Jadwal sholat sesuai daerah.
- alaudio
-> Audio dari surah yg diinginkan.
- tafsir
-> Tafsir surah yg diinginkan.
- surah
-> Menampilkan ayat dari surah yang diinginkan.

Random
-> Random berarti acak.
- katabijak
- skripsi
- pantun
- fakta
- quote
- anime
- memes

Search
- pinterest or pin
-> Search gambar dari pinterest.
- gimages or gimg
-> Search gambar dari Google.
- whatanime
-> Mencoba menebak anime dari gambar.
- artinama
-> Primbon arti nama, hanya hiburan.
- sreddit
-> Search gambar dari Subreddit.
- lirik
-> Search lirik lagu.
- play
-> Search lagu dari Youtube.
- kbbi
-> Search arti kata dalam KBBI.
- yt
-> Search Youtube.

Hiburan
- tebakgambar
-> Main tebak gambar.
- apakah
-> Puja kerang ajaib!!!
- sfx
-> Mengirimkan audio yg tersedia.
- ToD
-> Group only. Truth or dare?

Info
- cekcovid
-> Cek sebaran covid sesuai lokasi.
- crjogja
-> Radar cuaca lokasi Jogja.
- cuaca
-> Informasi cuaca sesuai daerah.
- resi
-> Cek resi barang sesuai kurir.

Anti Toxic
-> Group only. Anti kata kasar.
- antikasar
- klasemen
- reset

More Useful
- tagall or alle
-> Group only. Tag seluruh member.
- join or sewa
-> Sewa bot untuk join group kalau slot tersedia.
- remind
-> Kirimkan pesan ulang sesuai waktu yg ditentukan.
- list
-> Membuat list atau daftar yg disimpan di bot.
- note
-> Membuat note atau catatan yg disimpan di bot.
- bye
-> Group only. Keluarkan bot.
- del
-> Hapus pesan bot.


---

## Troubleshooting
Make sure all the necessary dependencies are installed: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

Fix Stuck on linux, install google chrome stable: 
```bash
> wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
> sudo apt install ./google-chrome-stable_current_amd64.deb
```

## Thanks to
- [Open-WA-Automate](https://github.com/open-wa/wa-automate-nodejs)
- [YogaSakti](https://github.com/YogaSakti/imageToSticker)
- [MhankBarBar](https://github.com/MhankBarBar/whatsapp-bot)
- [ArugaZ](https://github.com/ArugaZ/whatsapp-bot)
- [Aziz0404](https://github.com/nuraziz0404/botwa)
- [Gimenz](https://github.com/Gimenz)
