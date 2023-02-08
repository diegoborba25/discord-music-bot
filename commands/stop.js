const { getMessage, getError } = require("../language")

module.exports = {
  name: 'stop',
  aliases: [
    "parar"
  ],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))
    
    queue.stop()
    message.channel.send(getMessage(guild, "STOPED_QUEUE", client.emotes.success))
  }
}