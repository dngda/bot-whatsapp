/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-05 13:48:21
 * @ Description: Shortener
 */

import { fetchText } from '../utils/fetcher.js'

/**
 * Create shorturl
 *
 * @param  {String} url
 */
const shortener = (url) => new Promise((resolve, reject) => {
    console.log(color('[LOGS]', 'grey'), 'Creating short url...')
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})

export default shortener
