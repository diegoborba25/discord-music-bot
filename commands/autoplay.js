const { getError, getResourceProperty, getResources } = require("../language")

module.exports = {
  name: 'autoplay',
  aliases: [
    "ap"
  ],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(message.guild, "EMPTY_QUEUE"))
    const autoplay = queue.toggleAutoplay()

    statesResource = getResources(guild, "STATES")
    message.channel.send(`${getResourceProperty(guild, "QUEUE", "autoplay", client.emotes.success)} \`${autoplay ? statesResource.on : statesResource.off}\``)
  }
}