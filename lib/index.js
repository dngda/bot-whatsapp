// function requireUncached(module) {
//     delete require.cache[require.resolve(module)]
//     return require(module)
// }
import getLocationData from './location.js'
import urlShortener from './shortener.js'
import cariKasar from './kataKotor.js'
import cekResi from './cekResi.js'
import schedule from './schedule.js'
import tebakgb from './tebakgb.js'
import scraper from './scraper.js'
import menuId from './menu.js'
import resep from './resep.js'
import meme from './meme.js'
import kbbi from './kbbi.js'
import list from './list.js'
import api from './api.js'

export {
    getLocationData,
    urlShortener,
    cariKasar,
    cekResi,
    schedule,
    tebakgb,
    scraper,
    menuId,
    resep,
    meme,
    kbbi,
    list,
    api
}