/**
 * @ Author: YogaSakti
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-28 19:48:08
 */

import sharp from 'sharp'
import fileType from 'file-type'
const { fromBuffer } = fileType

/**
 * Resize image to buffer or base64
 * @param  {Buffer} bufferdata
 * @param  {Boolean} encode
 * @param  {String} mimType
 */
// eslint-disable-next-line no-async-promise-executor
const resizeImage = (buff, encode) => new Promise(async (resolve, reject) => {
    console.log(color('[LOGS]', 'grey'), 'Resizeing image...')
    const { mime } = await fromBuffer(buff)
    sharp(buff, { failOnError: false })
        .resize(512, 512)
        .toBuffer()
        .then(resizedImageBuffer => {
            if (!encode) return resolve(resizedImageBuffer)
            console.log(color('[LOGS]', 'grey'), 'Create base64 from resizedImageBuffer...')
            const resizedImageData = resizedImageBuffer.toString('base64')
            const resizedBase64 = `data:${mime};base64,${resizedImageData}`
            resolve(resizedBase64)
        })
        .catch(error => reject(error))
})

export default resizeImage