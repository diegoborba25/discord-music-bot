const { getError, getMessage } = require("../language")

module.exports = {
  name: 'volume',
  aliases: [
    "v",
    "set",
    "set-volume"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))
    const volume = parseInt(args[0])

    if (isNaN(volume)) return message.channel.send(getError(guild, "ENTER_VALID_NUMBER"))
    queue.setVolume(volume)

    message.channel.send(`${getMessage(guild, "VOLUME_CHANGED_TO", client.emotes.success)} \`${volume}\``)
  }
}