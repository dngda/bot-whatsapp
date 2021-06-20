/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-02-14 20:26:02
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-21 00:42:43
 * @ Description: Cek api bos
 */

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