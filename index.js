const tmi = require('tmi.js')
var fs = require('fs')
var nconf = require('nconf')

nconf.use('file', { file: './counter.json' })
nconf.load()

var counter = nconf.get('counter')

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
    nconf.set('counter', counter)
    nconf.save(function (err) {
      if (err) {
        console.error(err.message)
        return
      }
      console.log('Configuration saved successfully.')
    })
  }
})
