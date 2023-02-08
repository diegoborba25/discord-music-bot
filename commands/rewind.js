const { getError, getResources } = require("../language")

module.exports = {
  name: 'rewind',
  aliases: [
    "rwnd"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    if (!args[0]) return message.channel.send(getError(guild, "ENTER_TIME"))

    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(getError(guild, "ENTER_VALID_NUMBER"))

    if (time > queue.currentTime) {
      const rewindResourceError = getResources(guild, "SONG_REWINDED_ERROR")
      return message.channel.send(`${client.emotes.error} | ${rewindResourceError[0]}${queue.currentTime.toFixed(1)} ${rewindResourceError[1]}`)
    }

    const rewindResource = getResources(guild, "SONG_REWINDED")
    queue.seek((queue.currentTime - time))
    message.channel.send(`${rewindResource[0]} ${time} ${rewindResource[1]}`)
  }
}