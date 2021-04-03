const schedule = require('node-schedule')

const job = schedule.scheduleJob('0 52 * * *', function(fireDate){
  console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date())
})