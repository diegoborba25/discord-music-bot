const commandName = 'nowplaying'
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
    const song = queue.songs[0]
    message.channel.send(`${client.emotes.play} | Estou tocando: **\`${song.name}\`**, colocado por: ${song.user}`)
  }
}
