const commandName = 'rewind'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Fila vazia!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Coloque o tempo (em segundos)!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Coloque um número válido!`)
    if (time > queue.currentTime) return message.channel.send(`${client.emotes.error} | Número maior que o tempo atual da reprodução (${queue.currentTime.toFixed(1)} segundos)!`)
    queue.seek((queue.currentTime - time))
    message.channel.send(`Música rebobinada em ${time} segundos!`)
  }
}
