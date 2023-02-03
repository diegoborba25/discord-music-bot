const { EmbedBuilder } = require('discord.js')

const commandName = 'pix'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

module.exports = {
  name: commandName,
  aliases: commandaliases,
  run: async (client, message) => {
    const embed = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`Pix do Dev: **9318573f-67e6-4c57-a29c-ae0edb5ef2d9**\n A sua ajuda torna o bot gratuito, e da forças para continuar!`)

    message.reply({ embeds: [embed] })
  }
}
