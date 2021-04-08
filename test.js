// const ytdl = require('ytdl-core');
// const fs = require('fs-extra');
// const ffmpeg = require('fluent-ffmpeg');

// (async () => {

// 	ytid = `https://www.youtube.com/watch?v=CsebU5veUt4`
// 	stream = ytdl(ytid, { quality: 'highestaudio' })

// 	ffmpeg({source:stream})
// 	.setStartTime(66)
// 	.setDuration(24)
//     .setFfmpegPath('./bin/ffmpeg')
//     .saveToFile('./random/sfx/kuinginmarah.mp3')

// })();
const puppeteer = require('puppeteer');

(async () => {
	// url = 'https://media.matamata.com/thumbs/2020/10/16/84029-yiren-everglow/745x489-img-84029-yiren-everglow.jpg'
	const browser = await puppeteer.launch({headless: false, defaultViewport:null})
	const page = await browser.newPage()
	await page.setViewport({
	    width: 1024,
	    height: 768,
	})
	await page.goto(`https://twitter.com/`, { waitUntil: 'domcontentloaded' })

	await page.screenshot({ path: './media/rimage.png' })

	await browser.close()
})()