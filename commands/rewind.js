const commandName = 'rewind'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

module.exports = {
  name: commandName,
  aliases: commandaliases,
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
