const commandName = 'seek'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Fila vazia!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Coloque a posição (em segundos)!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Coloque um número válido!`)
    queue.seek(time)
    message.channel.send(`Música ajustada para o segundo: ${time}!`)
  }
}
