function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
exports.cekResi = require('./cekResi')
exports.meme = require('./meme')
exports.urlShortener = require('./shortener')
exports.getLocationData = require('./location')
exports.menuId = requireUncached('./menu')
exports.images = require('./images')
exports.resep = require('./resep')
exports.cariKasar = requireUncached('./kataKotor')
exports.kbbi = require('./kbbi.js')
exports.api = requireUncached('./api.js')
exports.list = require('./list.js')
// exports.pint = require('./pinterest.js')