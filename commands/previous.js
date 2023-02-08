const { getError, getMessage } = require("../language")

module.exports = {
  name: 'previous',
  aliases: [
    "pvs"
  ],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    try {
      const song = queue.previous()
      message.channel.send(`${getMessage(guild, "PLAYING", client.emotes.success)} \`${song.name}\``)
    } catch (e) {
      message.channel.send(`${getError(guild, "ERROR_OCCURRED")} ${e}`)
    }
  }
}