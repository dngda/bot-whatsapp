import request from 'request'
import fs from 'fs'
const { apiNoBg } = JSON.parse(fs.readFileSync('./settings/api.json'))

apiNoBg.forEach(api => {
	request.get({
		url: 'https://api.remove.bg/v1.0/account',
		headers: {
			'X-Api-Key': api
		},
		encoding: null
	}, function (_error, _response, body) {
		console.log(api, JSON.stringify(JSON.parse(body).data.attributes.api, null, 2))
	})
})