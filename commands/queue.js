const commandName = 'queue'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Fila vazia!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Tocando:' : `${i}.`} \`${song.name}\` - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send(`${client.emotes.queue} | **Fila do servidor**\n${q}`)
  }
}
