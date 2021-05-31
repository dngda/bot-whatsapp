import { fetchText } from '../utils/fetcher.js'

/**
 * Create shorturl
 *
 * @param  {String} url
 */
const shortener = (url) => new Promise((resolve, reject) => {
    console.log('Creating short url...')
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})

export default shortener
