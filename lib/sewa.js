/**
 * @ Author: SeroBot Team
 * @ Create Time: 2021-06-11 23:08:15
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-25 13:48:18
 * @ Description: Sewa-sewa crud sih
 */

import fs from 'fs'
import appRoot from 'app-root-path'
import { LowSync, JSONFileSync } from 'lowdb'
import lodash from 'lodash'
const { readFileSync } = fs
const { ownerNumber, prefix } = JSON.parse(readFileSync(appRoot + '/settings/setting.json'))
const adapter = new JSONFileSync(appRoot + '/data/sewa.json')
const db = new LowSync(adapter)
db.read()
db.data || (db.data = { groups: [] })
db.chain = lodash.chain(db.data)

// eslint-disable-next-line no-async-promise-executor
const listenSaweria = (client, browser) => new Promise(async (resolve, reject) => {
    try {
        let url = JSON.parse(readFileSync(appRoot + '/settings/api.json')).saweriaOverlay

        const page = await browser.newPage()
        await page.goto(url)

        await page.exposeFunction('puppeteerLogMutation', async () => {
            let who = await page.$eval('div.css-0 > p', (e) => {
                return e.textContent
            })
            let much = await page.$eval('div.css-0 > p:nth-child(2)', (e) => {
                return e.textContent
            })
            let msg = await page.$eval('div.css-0 > p:nth-child(3)', (e) => {
                return e.textContent
            })

            console.log(color('[LOGS]', 'grey'), 'Cekringgg!')
            console.log(color('[LOGS]', 'grey'), { donatur: who, total: much, pesan: msg })
            client.sendText(ownerNumber, `Cekringgg!!\nDonatur: ${who}\nTotal: ${much}\nPesan: ${msg}`)
            if (msg.match(/chat\.whatsapp\.com/gi) !== null) {
                sewaBot(client, msg, 30)
            }
        }).catch(e => reject(e))

        await page.evaluate(() => {
            const target = document.querySelector('div#__next')
            const observer = new MutationObserver(mutations => {
                for (const mutation of mutations) {
                    if (mutation.type === 'childList') {
                        // eslint-disable-next-line no-undef
                        puppeteerLogMutation()
                    }
                }
            })
            observer.observe(target, { childList: true })
        })
        resolve(true)
    } catch (e) {
        reject(e)
    }
})

// eslint-disable-next-line no-async-promise-executor
const sewaBot = (client, linkGroup, duration) => new Promise(async (resolve, reject) => {
    try {
        db.read()
        let milis = duration * 86400000 //duration in day
        let isGroupId = linkGroup.endsWith('@g.us')
        let groupInfo = isGroupId ? { id: linkGroup } : await client.inviteInfo(linkGroup)
        const find = db.chain.get('groups').find({ groupId: groupInfo.id }).value()
        if (find && find.groupId === groupInfo.id) {
            if (!isGroupId) {
                client.joinGroupViaLink(linkGroup).catch(reject())
            }
            let dateBefore = new Date(find.expire)
            let dateAfter = dateBefore.getTime() + milis
            let expireAt = new Date(dateAfter)
            client.sendText(groupInfo.id, `Perpanjang Penyewaan Berhasil!\nBot akan keluar sendiri pada hari ${expireAt.toLocaleDateString('id-ID', LOCAL_DATE_OPTIONS)}`)
            db.chain.get('groups').find({ groupId: groupInfo.id }).update('expire', expireAt).value()
            db.data = db.chain
            db.write()
            resolve(true)
        } else if (!isGroupId) {
            let expireAt = new Date(Date.now() + milis)
            await client.joinGroupViaLink(linkGroup)
                .then(async () => {
                    setTimeout(async () => {
                        await client.sendText(groupInfo.id, `Penyewaan Berhasil!\nBot akan keluar sendiri pada hari ${expireAt.toLocaleDateString('id-ID', LOCAL_DATE_OPTIONS)}`)
                        await client.sendText(groupInfo.id, `Hai guys 👋 perkenalkan saya SeroBot. Untuk melihat perintah atau menu yang tersedia pada bot, kirim *${prefix}menu*. Tapi sebelumnya pahami dulu *${prefix}tnc*`)
                    }, 2000)
                    db.data.groups.push({ groupId: groupInfo.id, expire: expireAt })
                    db.write()
                    resolve(true)
                }).catch(async (e) => {
                    reject(e)
                    return client.sendText(ownerNumber, 'Gagal! Sepertinya Bot pernah dikick dari group penyewa')
                })
        }
    } catch (e) {
        reject(e)
    }
})

// eslint-disable-next-line no-async-promise-executor
const trialSewa = (client, linkGroup) => new Promise(async (resolve, reject) => {
    try {
        db.read()
        let milis = 7 * 86400000 //duration in 7 day
        let groupInfo = await client.inviteInfo(linkGroup)
        const find = db.chain.get('groups').find({ groupId: groupInfo.id }).value()
        if (find && find.groupId === groupInfo.id) {
            client.joinGroupViaLink(linkGroup).catch(async (e) => {
                reject(e)
            })
            resolve(false)
        } else {
            let expireAt = new Date(Date.now() + milis)
            await client.joinGroupViaLink(linkGroup)
                .then(async () => {
                    setTimeout(async () => {
                        await client.sendText(groupInfo.id, `Trial Penyewaan Berhasil!\nBot akan keluar sendiri pada hari ${expireAt.toLocaleDateString('id-ID', LOCAL_DATE_OPTIONS)}`)
                        await client.sendText(groupInfo.id, `Hai guys 👋 perkenalkan saya SeroBot. Untuk melihat perintah atau menu yang tersedia pada bot, kirim *${prefix}menu*. Tapi sebelumnya pahami dulu *${prefix}tnc*`)
                    }, 2000)
                    db.data.groups.push({ groupId: groupInfo.id, expire: expireAt })
                    db.write()
                    resolve(true)
                }).catch(async (e) => {
                    reject(e)
                    return client.sendText(ownerNumber, 'Gagal! Sepertinya Bot pernah dikick dari group penyewa')
                })
        }
    } catch (e) {
        reject(e)
    }
})

const checkExpireSewa = (client) => new Promise((resolve, reject) => {
    try {
        db.read()
        let now = new Date()
        let oneDayAfterNow = new Date(Date.now() + 86400000)
        let { groups } = db.data
        groups.forEach(async (group) => {
            let dateExpire = new Date(group.expire)
            let { groupId } = group
            if (dateExpire <= now) {
                deleteSewa(groupId)
                let info = await client.getGroupInfo(groupId)
                await client.sendText(groupId, `‼️〘 Bye 〙‼️\nPenyewaan telah berakhir.\nTerima kasih telah menggunakan bot. Selamat tinggal 👋🏼🤩`)
                await client.sendText(ownerNumber, `Penyewaan untuk group dengan:\n-> \`\`\`Id   :\`\`\` ${groupId}\n-> \`\`\`Name :\`\`\` ${info.title}\nTelah selesai.`)
                setTimeout(async () => {
                    await client.leaveGroup(groupId)
                }, 2000)
                setTimeout(async () => {
                    await client.deleteChat(groupId)
                }, 4000)
            } else if (dateExpire <= oneDayAfterNow) {
                client.sendText(groupId, `‼️〘 Notice 〙‼️\nPenyewaan bot akan berakhir pada hari: \n${dateExpire.toLocaleDateString('id-ID', LOCAL_DATE_OPTIONS)}.\nChat /owner untuk perpanjang.`)
            }
        })
        resolve(true)
    } catch (e) {
        reject(e)
    }
})

const deleteSewa = (id) => {
    db.read()
    let res = db.chain.get('groups').remove({ groupId: id }).value()
    db.data = db.chain
    db.write()
    return res.length == 0 ? false : true
}

// eslint-disable-next-line no-async-promise-executor
const getListSewa = (client) => new Promise(async (resolve, reject) => {
    try {
        db.read()
        let { groups } = db.data
        groups = await groups.map(async (group) => {
            let { title } = await client.getGroupInfo(group.groupId)
            let date = new Date(group.expire)
            let expire = date.toLocaleDateString('id-ID', LOCAL_DATE_OPTIONS)
            return {
                title: title,
                groupId: group.groupId,
                expire: expire
            }
        })
        Promise.all(groups).then(res => {
            resolve(res)
        })
    } catch (e) {
        reject(e)
    }
})

const isSewa = (id) => {
    db.read()
    const find = db.chain.get('groups').find({ groupId: id }).value()
    return !!find
}

const getExp = (id) => {
    db.read()
    let msg = ''
    const find = db.chain.get('groups').find({ groupId: id }).value()
    if (find && find.groupId === id) {
        let date = new Date(find.expire)
        msg = date.toLocaleDateString('id-ID', LOCAL_DATE_OPTIONS)
    } else {
        msg = false
    }
    return msg
}
//Capek ngasih dokumentasi. lo pahamin aje sendiri

export default {
    checkExpireSewa,
    listenSaweria,
    getListSewa,
    deleteSewa,
    trialSewa,
    sewaBot,
    getExp,
    isSewa
}