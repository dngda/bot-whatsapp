/* eslint-disable no-async-promise-executor */
/**
 * @ Author: ArugaZ/YogaSakti
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-09 13:31:29
 * @ Description:
 */

import fetch from 'node-fetch'
import FormData from 'form-data'
import { writeFile, readFileSync, unlinkSync } from 'fs'
import fileType from 'file-type'
import resizeImage from './resizeImage.js'

const { fromBuffer } = fileType

/**
 *Fetch Json from Url
 *
 *@param {String} url
 *@param {Object} options
 */
const fetchJson = (url, options) =>
    new Promise((resolve, reject) =>
        fetch(url, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
                console.error(err)
                reject(err)
            })
    )

/**
 * Fetch Text from Url
 *
 * @param {String} url
 * @param {Object} options
 */

const fetchText = (url, options) => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(url, options)
        const text = await response.text()
        return resolve(text)
    } catch (err) {
        console.error(err)
        reject(err)
    }
})

/**
 * Fetch base64 from url
 * @param {String} url
 */
const fetchBase64 = (url, mimetype) => new Promise(async (resolve, reject) => {
    try {
        const res = await fetch(url)
        const _mimetype = mimetype || res.headers.get('content-type')
        res.buffer()
            .then((result_1) => resolve(`data:${_mimetype};base64,` + result_1.toString('base64')))
    } catch (err) {
        console.error(err)
        reject(err)
    }
})

/**
 * Upload Image to Telegra.ph
 *
 * @param  {String} base64 image buffer
 * @param  {Boolean} resize
 */
const uploadImages = (buffData, resize) => new Promise(async (resolve, reject) => {
    const { ext } = await fromBuffer(buffData)
    const filePath = './media/tmp.' + ext
    const _buffData = resize ? await resizeImage(buffData, false) : buffData
    writeFile(filePath, _buffData, { encoding: 'base64' }, (err) => {
        if (err) return reject(err)
        // console.log('Uploading image to telegra.ph server...')
        const fileData = readFileSync(filePath)
        const form = new FormData()
        form.append('file', fileData, 'tmp.' + ext)
        fetch('https://telegra.ph/upload', {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) return reject(res.error)
                resolve('https://telegra.ph' + res[0].src)
            })
            .then(() => unlinkSync(filePath))
            .catch(e => reject(e))
    })
})

export {
    fetchJson,
    fetchText,
    fetchBase64,
    uploadImages
}