const commandName = 'resume'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Fila vazia!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Música despausada!')
    } else {
      message.channel.send('A fila não está pausada!')
    }
  }
}
