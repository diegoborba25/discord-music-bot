const { EmbedBuilder } = require('discord.js')

const commandName = 'ping'
const aliasesList = require('./aliases.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  run: async (client, message) => {
    const embed = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`*Carregando ping do ${message.author}*`)

    const embed2 = new EmbedBuilder()
      .setColor('Random')
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`${message.author}, seu ping está em: \`${client.ws.ping}ms\`. Tá liso papai.`)

    message.reply({ embeds: [embed] }).then(msg => {
      setTimeout(() => {
        msg.edit({ embeds: [embed2] })
      }, 1500)
    })
  }
}
