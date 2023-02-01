const { EmbedBuilder } = require('discord.js')

const commandName = 'pix'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  run: async (client, message) => {
    const embed = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`Pix do Dev: **9318573f-67e6-4c57-a29c-ae0edb5ef2d9**\n A sua ajuda torna o bot gratuito, e da forças para continuar!`)

    message.reply({ embeds: [embed] })
  }
}
