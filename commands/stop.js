const commandName = 'stop'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

module.exports = {
  name: commandName,
  aliases: commandaliases,
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Fila vazia!`)
    queue.stop()
    message.channel.send(`${client.emotes.success} | Parei! Parei!`)
  }
}