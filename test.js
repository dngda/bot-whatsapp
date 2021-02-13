// import { create, Client } from '@open-wa/wa-automate';
const wa = require('@open-wa/wa-automate');

wa.create().then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, '👋 Hello!');
    }
  });
}