const { getError, getResources, getMessage } = require("../language")

module.exports = {
  name: 'filter',
  aliases: [
    "filters"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(guild, "EMPTY_QUEUE"))
    const filter = args[0]

    if (filter === 'off' && queue.filters.size) {
      queue.filters.clear()
    } else {
      if (Object.keys(client.distube.filters).includes(filter)) {
        if (queue.filters.has(filter)) {
          queue.filters.remove(filter)
        } else {
          queue.filters.add(filter)
        }
      } else {
        if (args[0]) return message.channel.send(getError(guild, "ENTER_VALID_FILTER"))
      }
    }

    const activeFilterResource = getResources(guild, "ACTIVE_FILTER")
    return message.channel.send(`${queue.filters.names.length < 1 ? activeFilterResource.singular : activeFilterResource.plural}: \`${queue.filters.names.join(', ') || getMessage(guild, "OFF")}\``)
  }
}