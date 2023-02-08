module.exports = {
  name: 'rfilter',
  aliases: [
    "rfilters"
  ],
  inVoiceChannel: true,
  run: async (client, message) => {
    client.commands.get('filter').run(client, message, ['off'])
  }
}