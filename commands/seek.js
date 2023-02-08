const { getError, getMessage } = require("../language")

module.exports = {
  name: 'seek',
  aliases: [
    "sk"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    if (!args[0]) return message.channel.send(getError(guild, "ENTER_TIME"))

    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(getError(guild, "ENTER_VALID_NUMBER"))

    queue.seek(time)
    message.channel.send(`${getMessage(guild, "SEEKED_TO")} ${time}!`)
  }
}