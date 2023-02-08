const { getError } = require("../language")

module.exports = {
  name: 'playtop',
  aliases: [
    "pt"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')

    if (!string) return message.channel.send(getError(message.guild, "ENTER_A_SONG"))
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      position: 1
    })
  }
}