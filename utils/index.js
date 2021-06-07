import request from 'request'
import fs from 'fs-extra'
import chalk from 'chalk'
import moment from 'moment-timezone'
import followPkg from 'follow-redirects'
import updateJson from 'update-json-file'

const { get } = followPkg
const { tz, duration } = moment
const { head } = request
const { watchFile, existsSync, readFileSync, createWriteStream, writeFileSync } = fs

tz.setDefault('Asia/Jakarta').locale('id')

/**
 * Get text with color
 * @param  {String} text
 * @param  {String} color
 * @return  {String} Return text with color
 */
const color = (text, color) => {
    return !color ? chalk.blueBright(text) : chalk.keyword(color)(text)
}

const commandLog = (count) => updateJson('data/stat.json', (data) => {
    data['todayHits'] = count
    return data
})

const receivedLog = (count) => updateJson('data/stat.json', (data) => {
    data['received'] = count
    return data
})

/**
 * Get Time duration
 * @param  {Date} timestamp
 * @param  {Date} now
 */
const processTime = (timestamp, now) => {
    // timestamp => timestamp when message was received
    return duration(now - moment(timestamp * 1000)).asSeconds()
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
 * Add number to filter
 * @param  {String} from
 */
 const addFilter = (from, delay) => {
    usedCommandRecently.add(from)
    setTimeout(() => {
        return usedCommandRecently.delete(from)
    }, delay) // 1sec is delay before processing next command
}

/**
 *Download any media from URL
 *@param {String} url
 *@param {Path} locate
 *@param {Callback} callback
 */
const download = (url, path, callback) => {
    head(url, () => {
        request(url)
            .pipe(createWriteStream(path))
            .on('close', callback)
    })
}


/**
 *@param {String} url
 */
const redir = (url) => {
    get(url, response => {
        return response.responseUrl
    })
}

const createReadFileSync = (path) => {
    if (existsSync(path)) {
        return readFileSync(path)
    }
    else {
        writeFileSync(path, '[]')
        return readFileSync(path)
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
    watchFile(require.resolve(module), async () => {
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

export {
    createReadFileSync,
    getModuleName,
    processTime,
    commandLog,
    receivedLog,
    isFiltered,
    addFilter,
    download,
    recache,
    uncache,
    redir,
    color,
    isUrl,
}
