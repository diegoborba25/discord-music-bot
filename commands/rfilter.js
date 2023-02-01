const commandName = 'rfilter'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    client.commands.get('filter').run(client, message, ['off'])
  }
}
