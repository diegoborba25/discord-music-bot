const { getError, getMessage } = require("../language")

module.exports = {
  name: 'skipto',
  aliases: [
    "skpto"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))

    if (!args[0]) return message.channel.send(getError(guild, "ENTER_POSITION"))

    const num = Number(args[0])
    if (isNaN(num)) return message.channel.send(getError(guild, "ENTER_VALID_NUMBER"))

    await client.distube.jump(message, num).then(song => {
      message.channel.send(`${getMessage(guild, "SKIPPED_TO")} \`${song.name}\``)
    })
  }
}