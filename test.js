let {
	getTebakGambar,
	getAns,
	delData
} = require('./lib/tebakgb.js')

// getTebakGambar('231231212313@c.us').then(n => {
// 	console.log(n)
// })

delData('231231212313@c.us').then(n => {
	console.log(n)
})