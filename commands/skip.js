const commandName = 'skip'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)

    if (!queue) return message.channel.send(`${client.emotes.error} | Fila vazia!`)

    if (queue.songs.length === 1) {
      client.commands.get('stop').run(client, message)
      return
    }

    try {
      const song = await queue.skip()
      message.channel.send(`${client.emotes.success} | Skipado! Por: ${song.user}\n`)
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}
