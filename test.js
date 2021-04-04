const schedule = require('node-schedule')

const when = new Date(Date.now() + 5000)
const job = schedule.scheduleJob(when, function(fireDate){
  console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date())
})