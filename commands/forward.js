const { getError, getResources } = require("../language")

module.exports = {
  name: 'forward',
  aliases: [
    "fwrd"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    if (!args[0]) return message.channel.send(getError(guild, "ENTER_TIME"))

    const time = Number(args[0])

    if (isNaN(time)) return message.channel.send(getError(guild, "ENTER_VALID_NUMBER"))

    const forwardResource = getResources(guild, "SONG_FORWARDED")
    queue.seek((queue.currentTime + time))
    message.channel.send(`${forwardResource[0]} ${time} ${forwardResource[1]}`)
  }
}