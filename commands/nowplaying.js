const { getMessage, getError } = require("../language")

module.exports = {
  name: 'nowplaying',
  aliases: [
    "np"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)

    if (!queue) return message.channel.send(getError(message.guild, "EMPTY_QUEUE"))

    const song = queue.songs[0]
    message.channel.send(`${getMessage(guild, "PLAYING", client.emotes.play)} **\`${song.name}\`**, ${getMessage(guild, "ADDED_BY")} ${song.user}`)
  }
}