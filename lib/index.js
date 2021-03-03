function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
exports.cekResi = require('./cekResi')
exports.meme = require('./meme')
exports.urlShortener = require('./shortener')
exports.getLocationData = require('./location')
exports.menuId = require('./menu')
exports.images = require('./images')
exports.resep = require('./resep')
exports.rugaapi = require('./rugaApi')
exports.cariKasar = requireUncached('./kataKotor')
exports.kbbi = require('./kbbi.js')
exports.api = require('./api.js')