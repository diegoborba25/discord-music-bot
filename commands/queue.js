const { getMessage, getError } = require("../language")

module.exports = {
  name: 'queue',
  aliases: [
    "q"
  ],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))
    
    const q = queue.songs
      .map((song, i) => `${i === 0 ? getMessage(guild, "PLAYING") : `${i}.`} \`${song.name}\` - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send(`${getMessage(guild, "SERVER_QUEUE", client.emotes.queue)}\n${q}`)
  }
}