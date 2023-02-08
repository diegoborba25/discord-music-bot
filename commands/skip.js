const { getMessage, getError } = require("../language")

module.exports = {
  name: 'skip',
  aliases: [
    "skp"
  ],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message 

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    try {
      const song = await queue.skip()
      message.channel.send(`${getMessage(guild, "SKIPPED_BY", client.emotes.success)} ${song.user}\n`)
    } catch (e) {
      message.channel.send(`${getError(guild, "ERROR_OCCURRED")} ${e}`)
    }
  }
}