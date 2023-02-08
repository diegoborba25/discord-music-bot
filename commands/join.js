const { Constants } = require('discord.js')
const { getError } = require('../language')

module.exports = {
  name: 'join',
  aliases: [
    "enter",
  ],
  run: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel
    const { guild } = message

    if (args[0]) {
      try {
        voiceChannel = await client.channels.fetch(args[0])
        if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
          return message.channel.send(getError(guild, "NOT_VALID_VOICE_CHANNEL", args[0]))
        }
      } catch (e) {
        return message.channel.send(getError(guild, "NOT_VALID_VOICE_CHANNEL", args[0]))
      }
    }
    if (!voiceChannel) {
      return message.channel.send(getError(guild, "IN_VOICE_CHANNEL_OR_ID"))
    }
    client.distube.voices.join(voiceChannel)
  }
}