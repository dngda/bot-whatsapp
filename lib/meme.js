/**
 * @ Author: ArugaZ
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-22 15:09:17
 * @ Description:
 */

import { fetchJson, fetchBase64 } from '../utils/fetcher.js'
import Crypto from 'crypto'

const subreddits = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'AdviceAnimals', 'MemeEconomy', 'memes', 'terriblefacebookmemes', 'teenagers', 'historymemes', 'okbuddyretard', 'nukedmemes']
const randSub = subreddits[Crypto.randomInt(0, subreddits.length)]
/**
 * Get meme from random subreddit
 *
 * @param  {String} subreddit
 * @return  {Promise} Return meme from dankmemes, wholesomeanimemes, wholesomememes, AdviceAnimals, MemeEconomy, memes, terriblefacebookmemes, teenagers, historymemes
 */
const random = async (subreddit = randSub) => new Promise((resolve, reject) => {
    fetchJson('https://meme-api.herokuapp.com/gimme/' + subreddit)
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

/**
 * create custom meme
 * @param  {String} imageUrl
 * @param  {String} topText
 * @param  {String} bottomText
 */
const custom = async (imageUrl, top, bottom) => new Promise((resolve, reject) => {
    let topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/%/g, '~p').replace(/#/g, '~h').replace(/\//g, '~s')
    let bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/%/g, '~p').replace(/#/g, '~h').replace(/\//g, '~s')
    fetchBase64(`https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`, 'image/png')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

export default {
    random,
    custom
}
