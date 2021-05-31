const request = require('request')
const fs = require('fs-extra')
const chalk = require('chalk')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const follow = require('follow-redirects')
const updateJson = require('update-json-file')

/**
 * Get text with color
 * @param  {String} text
 * @param  {String} color
 * @return  {String} Return text with color
 */
const color = (text, color) => {
    return !color ? chalk.blueBright(text) : chalk.keyword(color)(text)
}

const messageLog = (isReset) => updateJson('data/stat.json', (data) => {
    (!isReset) ? data['todayHits'] += 1 : data['todayHits'] = 0
    return data
})

/**
 * Get Time duration
 * @param  {Date} timestamp
 * @param  {Date} now
 */
const processTime = (timestamp, now) => {
    // timestamp => timestamp when message was received
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

/**
 * is it url?
 * @param  {String} url
 */
const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}

// Message Filter / Message Cooldowns
const usedCommandRecently = new Set()

/**
 * Check is number filtered
 * @param  {String} from
 */
const isFiltered = (from) => {
    return !!usedCommandRecently.has(from)
}

/**
 *Download any media from URL
 *@param {String} url
 *@param {Path} locate
 *@param {Callback} callback
 */
const download = (url, path, callback) => {
    request.head(url, () => {
        request(url)
            .pipe(fs.createWriteStream(path))
            .on('close', callback)
    })
}


/**
 *@param {String} url
 */

const redir = (url) => {
    follow.get(url, response => {
        return response.responseUrl
    })
}


/**
 * Add number to filter
 * @param  {String} from
 */
const addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => {
        return usedCommandRecently.delete(from)
    }, 1000) // 5sec is delay before processing next command
}

const createReadFileSync = (path) => {
    if (fs.existsSync(path)) {
        return fs.readFileSync(path)
    }
    else {
        fs.writeFileSync(path, '[]')
        return fs.readFileSync(path)
    }
}

const getModuleName = (module) => {
    return module.split('/')[module.split('/').length - 1]
}

/**
 * recache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
const recache = (module, call = () => { }) => {
    console.log(color('[WATCH]', 'orange'), color(`=> '${getModuleName(module)}'`, 'yellow'), 'file is now being watched by node!')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        call(module)
        return require(module)
    })
    return require(module)
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
const uncache = (module = '.') => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

String.prototype.toDHms = function () {
    var sec_num = parseInt(this, 10) // don't forget the second param
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    var seconds = sec_num - (hours * 3600) - (minutes * 60)
    var days = 0
    if (hours >= 24) { days = Math.floor(hours / 24); hours = hours % 24 }
    var time = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' secs'
    return time
}

module.exports = {
    msgFilter: {
        isFiltered,
        addFilter
    },
    processTime,
    isUrl,
    color,
    download,
    redir,
    createReadFileSync,
    recache,
    uncache,
    getModuleName,
    messageLog
}
