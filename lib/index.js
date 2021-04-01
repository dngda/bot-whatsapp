function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
exports.getLocationData = require('./location')
exports.urlShortener = require('./shortener')
exports.cariKasar = requireUncached('./kataKotor')
exports.cekResi = require('./cekResi')
exports.tebakgb = require('./tebakgb.js')
exports.menuId = requireUncached('./menu')
exports.gimage = require('./gimage.js')
exports.images = require('./images')
exports.resep = require('./resep')
exports.meme = require('./meme')
exports.kbbi = require('./kbbi.js')
exports.list = require('./list.js')
exports.pint = require('./pinterest.js')
exports.api = requireUncached('./api.js')