const {ytsearch} = require('./lib/api.js')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const fs = require('fs')

ytsearch('radioactive but im waking up').then(result => {

	console.log(result)

	let duration = (result) => {
		const n = result.duration.split(':')
		if (n.length === 3) return parseInt(n[0]) * 3600 + parseInt(n[1]) * 60 + parseInt(n[2])
			else return parseInt(n[0] * 60) + parseInt(n[1])
	}
	
	console.log(duration(result))

	var YoutubeMp3Downloader = require('youtube-mp3-downloader')
	var YD = new YoutubeMp3Downloader({
	    "ffmpegPath": "./bin/ffmpeg.exe",
	    "outputPath": "./media/ytmp3",
	    "youtubeVideoQuality": "highestaudio",
	    "queueParallelism": 4,
	    "progressTimeout": 2000,
	    "allowWebm": false
	})
	 
	//Download video and save as MP3 file
	t = 123
	var time = moment(t * 1000).format('mmss')
	YD.download(result.id, `temp_${time}.mp3`)

	YD.on("finished", (err, data) => {
	    
	    // fs.unlinkSync(data.file)
	})

	YD.on("error", (error) => {

	    console.log(error)
	})

})