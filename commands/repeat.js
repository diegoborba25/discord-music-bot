const commandName = 'repeat'
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
    let mode = null
    if (!args[0]) {
      if (queue.songs.length > 1) {
        mode = 2
      } else {
        mode = 1
      }
    } else {
      switch (args[0]) {
        case 'off':
          mode = 0
          break
        case 'song':
          mode = 1
          break
        case 'queue':
          mode = 2
          break
      }
    }
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Repetir fila' : 'Repetir música') : 'Desligado'
    message.channel.send(`${client.emotes.repeat} | Modo de repetição alterado para: \`${mode}\``)
  }
}
