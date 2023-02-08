const { getError, getMessage } = require("../language")

module.exports = {
  name: 'resume',
  aliases: [
    "unpause"
  ],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    if (queue.paused) {
      queue.resume()
      message.channel.send(getMessage(guild, "RESUMED"))
    } else {
      message.channel.send(getError(guild, "QUEUE_NOT_PAUSED"))
    }
  }
}