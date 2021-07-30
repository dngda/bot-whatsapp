// eslint-disable-next-line no-undef
module.exports = {
  apps: [{
    name: "Bot WhatsApp",
    script: "./index.js",
    args: ["--color"],
    error_file: './logs/pm2/err.log',
    combine_logs: true,
    cron_restart: '30 */12 * * *'
  }]
}