const commandName = 'volume'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Fila vazia!`)
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Coloque um número válido!`)
    queue.setVolume(volume)
    message.channel.send(`${client.emotes.success} | Volume alterado para: \`${volume}\``)
  }
}
