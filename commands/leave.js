const commandName = 'leave'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

module.exports = {
  name: commandName,
  aliases: commandaliases,
  run: async (client, message) => {
    client.distube.voices.leave(message)
  }
}
