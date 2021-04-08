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
exports.scraper = require('./scraper')
exports.menuId = requireUncached('./menu')
exports.images = require('./images')
exports.resep = require('./resep')
exports.meme = require('./meme')
exports.kbbi = require('./kbbi')
exports.list = require('./list')
exports.api = requireUncached('./api')