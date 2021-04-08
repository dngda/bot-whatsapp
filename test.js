const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');

(async () => {

	ytid = `https://www.youtube.com/watch?v=5_Xdi4T8mgI`
	stream = ytdl(ytid, { quality: 'highestaudio' })

	ffmpeg({source:stream})
	.setStartTime(13)
    .setFfmpegPath('./bin/ffmpeg')
    .saveToFile('./random/sfx/headshot.mp3')

})();