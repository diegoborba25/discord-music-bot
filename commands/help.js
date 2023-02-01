const { EmbedBuilder } = require('discord.js')

const commandName = 'help'
const aliasesList = require('./aliases.json')
const commandsHelp = require('./help.json')

module.exports = {
  name: commandName,
  aliases: aliasesList[commandName],
  run: async (client, message, args) => {
    if (!args[0]) {
      const description = client.commands.map(function (cmd) {
        const cmdName = cmd.name
        const commandHelp = commandsHelp[cmdName]
        return `\`${cmdName}\`** - ${commandHelp.summary}**\nAlternativas: *${aliasesList[cmdName].map(alias => alias).join(', ')}*\n`
      }).join('')
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle('Comandos:')
            .setColor('Blue')
            .setDescription(`${description}\nDigite your-prefix-here!help \`<Comando>\` para mais informações!`)
        ]
      })
    } else {
      const commandHelp = commandsHelp[args[0]]
      message.channel.send(commandHelp.description)
    }
  }
}
