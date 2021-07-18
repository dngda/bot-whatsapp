/* eslint-disable no-undef */
/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-07-19 00:07:48
 * @ Description:
 */

import request from 'request'
import fs from 'fs-extra'
import chalk from 'chalk'
import moment from 'moment-timezone'
import updateJson from 'update-json-file'
import Ffmpeg from 'fluent-ffmpeg'

const { tz, duration } = moment
const { head } = request
const { existsSync, unlinkSync, readFileSync, createWriteStream, writeFileSync } = fs
const { apiLol } = JSON.parse(readFileSync('./settings/api.json'))

tz.setDefault('Asia/Jakarta').locale('id')

/**
 * Get text with color
 * @param  {String} text
 * @param  {String} color
 * @return  {String} Return text with color
 */
const _color = (text, color) => {
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

const createReadFileSync = (path) => {
    if (existsSync(path)) {
        return readFileSync(path)
    }
    else {
        writeFileSync(path, '[]')
        return readFileSync(path)
    }
}

const formatin = (duit) => {
    let reverse = duit.toString().split('').reverse().join('')
    let ribuan = reverse.match(/\d{1,3}/g)
    ribuan = ribuan.join('.').split('').reverse().join('')
    return ribuan
}

const inArray = (needle, haystack) => {
    let length = haystack.length
    for (let i = 0; i < length; i++) {
        if (haystack[i].id == needle) return i
    }
    return -1
}

const last = (array, n) => {
    if (array == null) return void 0
    if (n == null) return array[array.length - 1]
    return array.slice(Math.max(array.length - n, 0))
}

const unlinkIfExists = (path, path2) => {
    if (existsSync(path)) unlinkSync(path)
    if (existsSync(path2)) unlinkSync(path2)
}

String.prototype.toDHms = function () {
    var sec_num = parseInt(this, 10) // don't forget the second param
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    var seconds = sec_num - (hours * 3600) - (minutes * 60)
    var days = 0
    if (hours >= 24) { days = Math.floor(hours / 24); hours = hours % 24 }
    return days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' secs'
}

const webpToPng = (buff) => new Promise((resolve, reject) => {
    const inp = `./media/sss.webp`
    const out = `./media/sss.png`
    writeFileSync(inp, buff)
    Ffmpeg(inp)
        .setFfmpegPath('./bin/ffmpeg')
        .save(out)
        .on('end', () => {
            resolve(readFileSync(out))
        })
        .on('error', (e) => {
            reject(e)
        })
})

const sleep = (delay) => new Promise((resolve) => {
    setTimeout(() => { resolve(true) }, delay)
})

const lolApi = (slash, parm = { text: null, text2: null, text3: null, img: null }) => {
    let ptext = (parm.text != null) ? `&text=${encodeURIComponent(parm.text)}` : ''
    let ptext2 = (parm.text2 != null) ? `&text=${encodeURIComponent(parm.text2)}` : ''
    let ptext3 = (parm.text3 != null) ? `&text=${encodeURIComponent(parm.text3)}` : ''
    let pimg = (parm.img != null) ? `&img=${parm.img}` : ''
    return `https://lolhuman.herokuapp.com/api/${slash}?apikey=${apiLol}${ptext}${ptext2}${ptext3}${pimg}`
}

// previous cmd
let previousCmds = []
const prev = {
    savePrevCmd: (inpSender, prevCmd) => {
        if (!prev.hasPrevCmd(inpSender)) {
            previousCmds.push({ sender: inpSender, prevCmd: prevCmd })
            setTimeout(() => {
                prev.delPrevCmd(inpSender)
            }, 15000)
        }
    },
    getPrevCmd: (inpSender) => {
        return previousCmds.find(n => n.sender == inpSender).prevCmd
    },
    hasPrevCmd: (inpSender) => {
        return !!previousCmds.find(n => n.sender == inpSender)
    },
    delPrevCmd: (inpSender) => {
        previousCmds = previousCmds.filter(({ sender }) => sender !== inpSender)
    }
}

//Gobal declaration
const initGlobalVariable = () => {
    global.LOCAL_DATE_OPTIONS = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZoneName: 'short',
        hour: 'numeric',
        minute: 'numeric',
    }
    global.q3 = '```'
    global.readMore = `\u00AD`.repeat(1500) //it print 1500 characters so that makes whatsapp add 'read more' button
    global.color = (text, color) => _color(text, color)
    global.isLolApiActive = false
    global.simi = 0
}

export {
    initGlobalVariable,
    createReadFileSync,
    unlinkIfExists,
    receivedLog,
    processTime,
    commandLog,
    isFiltered,
    webpToPng,
    addFilter,
    download,
    formatin,
    inArray,
    lolApi,
    sleep,
    isUrl,
    prev,
    last,
}
