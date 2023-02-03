const { EmbedBuilder } = require('discord.js')
const config = require('./../config.json')

const commandName = 'help'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

module.exports = {
  name: commandName,
  aliases: commandaliases,
  run: async (client, message, args) => {
    if (!args[0]) {
      const description = client.commands.map(function (cmd) {
        const cmdName = cmd.name
        const cmdInfo = commandsInfo[cmdName]
        return `\`${cmdName}\`** - ${cmdInfo.summary}**\nAlternativas: *${cmdInfo.aliases.map(alias => alias).join(', ')}*\n`
      }).join('')
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle('Comandos:')
            .setColor('Blue')
            .setDescription(`${description}\nDigite ${config.prefix}help \`<Comando>\` para mais informações!`)
        ]
      })
    } else {
      message.channel.send(commandInfo.description)
    }
  }
}