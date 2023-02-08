const { getMessage, getError } = require("../language")

module.exports = {
  name: 'shuffle',
  aliases: [
    "sfl"
  ],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    queue.shuffle()
    message.channel.send(getMessage(guild, "SONGS_SHUFFLED"))
  }
}