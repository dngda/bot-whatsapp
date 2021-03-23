const ytdl = require('ytdl-core')
const ffmpeg = require('fluent-ffmpeg')

stream = ytdl('Afja_qKKBk0')

ffmpeg({source:stream})
	.setFfmpegPath('./bin/ffmpeg')
	.on('error', (err) => {
	    console.log('An error occurred: ' + err.message)
	  })
	.on('end', () => {
	    console.log('Stream finished !')
	  })
	.saveToFile('./media/temp1213.mp3')