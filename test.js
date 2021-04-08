const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');

(async () => {

	ytid = `https://www.youtube.com/watch?v=0H6n1aK0ZSo`
	stream = ytdl(ytid, { quality: 'highestaudio' })

	ffmpeg({source:stream})
	.setStartTime(4)
	.setDuration(6)
    .setFfmpegPath('./bin/ffmpeg')
    .saveToFile('./random/sfx/callambulance.mp3')

    var files = fs.readdirSync('./random/sfx/').map(item => {
    	return item.replace('.mp3', '')
    })
    console.log(files)

})();