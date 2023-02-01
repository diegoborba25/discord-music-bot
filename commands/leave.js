const commandName = 'leave'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  run: async (client, message) => {
    client.distube.voices.leave(message)
  }
}
