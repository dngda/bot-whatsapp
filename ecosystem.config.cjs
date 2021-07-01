// eslint-disable-next-line no-undef
module.exports = {
  apps: [{
    name: "Bot WhatsApp",
    script: "./index.js",
    watch: "true",
    ignore_watch: [
      "data",
      "node_modules",
      "media",
      "logs",
      ".*"
    ],
    args: ["--color"],
    error_file: './logs/pm2/XXXerr.log',
    combine_logs: true
  }]
}