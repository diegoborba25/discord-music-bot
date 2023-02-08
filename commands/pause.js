const { getError, getMessage } = require("../language")

module.exports = {
  name: 'pause',
  aliases: [
    "pause",
    "hold",
    "pausar"
  ],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    if (queue.paused) {
      queue.resume()
      return message.channel.send(getMessage(guild, "RESUMED"))
    }

    queue.pause()
    message.channel.send(getMessage(guild, "PAUSED"))
  }
}