/**
 * @ Author: ArugaZ
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Danang Dwiyoga A (https://github.com/dngda/)
 * @ Modified time: 2021-06-21 00:40:36
 * @ Description: 
 */

import { fetchJson } from '../utils/fetcher.js'

/**
 * Get Resi Information
 *
 * @param {string} ekspedisi - nama ekpedisi
 * @param {string} resi - no / kode resi
 */
const cekResi = (ekspedisi, resi) => new Promise((resolve, reject) => {
    fetchJson(`https://api.terhambar.com/resi?resi=${resi}&kurir=${ekspedisi}`)
        .then((result) => {
            if (result.status.code != 200 && result.status.description != 'OK') return resolve(result.status.description)
            // eslint-disable-next-line camelcase
            const { result: { summary, details, delivery_status, manifest } } = result
            const manifestText = manifest.map(x => `⏰ ${x.manifest_date} ${x.manifest_time}\n ├ Status: ${x.manifest_description}\n └ Lokasi: ${x.city_name}`)
            const resultText = `
📦 Data Ekspedisi
├ ${summary.courier_name}
├ Nomor: ${summary.waybill_number}
└ Dikirim Pada: ${details.waybill_date}  ${details.waybill_time}
      
📮 Status Pengiriman
└ ${delivery_status.status}
                 
🚧 POD Detail\n
${manifestText.join('\n')}`
            resolve(resultText)
        }).catch((err) => {
            console.error(err)
            reject(err)
        })
})

export default cekResi