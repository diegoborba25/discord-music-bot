const { getError, getResources, getMessage } = require("../language")

module.exports = {
  name: 'loop',
  aliases: [
    "repeat",
    "rp"
  ],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    const { guild } = message

    if (!queue) return message.channel.send(getError(message.guild, "EMPTY_QUEUE"))
    let mode = null
    if (!args[0]) {
      if (queue.songs.length > 1) {
        mode = 2
      } else {
        mode = 1
      }
    } else {
      switch (args[0]) {
        case 'off':
          mode = 0
          break
        case 'song':
          mode = 1
          break
        case 'queue':
          mode = 2
          break
      }
    }

    mode = queue.setRepeatMode(mode)

    loopModeResources = getResources(guild, "LOOP_MODES")
    mode = mode ? (mode === 2 ? loopModesResources.allQueue : loopModesResources.thisSong) : getMessage(guild, "OFF")
    message.channel.send(`${getMessage(guild, "LOOP_MODE_CHANGED", client.emotes.repeat)} \`${mode}\``)
  }
}