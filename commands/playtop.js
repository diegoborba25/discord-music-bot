const commandName = 'playtop'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

module.exports = {
  name: commandName,
  aliases: commandaliases,
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Coloque a url ou o nome da música para pesquisa.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      position: 1
    })
  }
}
