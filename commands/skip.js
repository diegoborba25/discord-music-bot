const commandName = 'skip'
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
