function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
exports.getLocationData = require('./location')
exports.urlShortener = require('./shortener')
exports.cariKasar = requireUncached('./kataKotor')
exports.cekResi = require('./cekResi')
exports.schedule = require('./schedule')
exports.tebakgb = require('./tebakgb')
exports.menuId = requireUncached('./menu')
exports.gimage = require('./gimage')
exports.images = require('./images')
exports.resep = require('./resep')
exports.meme = require('./meme')
exports.kbbi = require('./kbbi')
exports.list = require('./list')
exports.pint = require('./pinterest')
exports.api = requireUncached('./api')