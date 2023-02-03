const commandName = 'queue'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

module.exports = {
  name: commandName,
  aliases: commandaliases,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Fila vazia!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Tocando:' : `${i}.`} \`${song.name}\` - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send(`${client.emotes.queue} | **Fila do servidor**\n${q}`)
  }
}
