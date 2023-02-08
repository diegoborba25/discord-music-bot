module.exports = {
  name: 'leave',
  aliases: [
    "disconnect"
  ],
  run: async (client, message) => {
    client.distube.voices.leave(message)
  }
}