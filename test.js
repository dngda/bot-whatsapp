const ytdl = require('ytdl-core');
const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');

(async () => {

	ytid = `https://www.youtube.com/watch?v=jxo_K7JLZxQ`
	stream = ytdl(ytid, { quality: 'highestaudio' })

	ffmpeg({source:stream})
    .setFfmpegPath('./bin/ffmpeg')
    .saveToFile('./media/temp.mp3')

})();