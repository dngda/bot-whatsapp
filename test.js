let {
	getTebakGambar,
	getAns,
	delData
} = require('./lib/tebakgb.js')

const sleep = (delay) => new Promise((resolve, reject) => {
	setTimeout(() => {  resolve(true) }, delay)
})

// getTebakGambar('231231212313@c.us').then(n => {
// 	console.log(n)
// })

// delData('231231212313@c.us').then(n => {
// 	console.log(n)
// })
console.log('Yok jawab waktunya 1 menit')
sleep(20000).then(() => {
	console.log('40 detik lagi')
})
sleep(40000).then(() => {
	console.log('20 detik lagi')
})
sleep(50000).then(() => {
	console.log('10 detik lagi')
})
sleep(60000).then(() => {
	console.log('Jawabannya adalah asu')
})