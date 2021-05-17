const request = require('request')
const fs = require('fs')
const { apiNoBg } = JSON.parse(fs.readFileSync('./settings/api.json'))

apiNoBg.forEach(api => {
	request.get({
		url: 'https://api.remove.bg/v1.0/account',
		headers: {
			'X-Api-Key': api
		},
		encoding: null
	}, function (error, response, body) {
		console.log(api, JSON.stringify(JSON.parse(body).data.attributes.api))
	})
})