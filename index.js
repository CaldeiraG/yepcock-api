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
  if ((message.match(/YEP COCK/g) || []).length > 0) {
    counter = counter + (message.match(/YEP COCK/g) || []).length
    console.log(`${tags['display-name']}: ${message} (${counter})`)
  }
})
