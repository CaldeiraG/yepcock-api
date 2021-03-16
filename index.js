const tmi = require('tmi.js')

var counter = 0

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: ['codemiko'],
})

client.connect()

client.on('message', (channel, tags, message, self) => {
  if (message.includes('YEP COCK')) {
    counter++
    console.log(`${tags['display-name']}: ${message} (${counter})`)
  }
})
