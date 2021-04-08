const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');

(async () => {

	ytid = `https://www.youtube.com/watch?v=CsebU5veUt4`
	stream = ytdl(ytid, { quality: 'highestaudio' })

	ffmpeg({source:stream})
	.setStartTime(66)
	.setDuration(24)
    .setFfmpegPath('./bin/ffmpeg')
    .saveToFile('./random/sfx/kuinginmarah.mp3')

})();