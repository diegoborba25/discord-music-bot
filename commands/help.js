const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

const { getCommandInfo, getMessage, getResources } = require('../language')

module.exports = {
  name: 'help',
  aliases: [
    "h",
    "cmds",
    "commands"
  ],
  run: async (client, message, args) => {
    const { guild } = message

    if (!args[0]) {
      const description = client.commands.map(function (cmd) {
        const cmdName = cmd.name
        const cmdInfo = getCommandInfo(guild, cmdName)
        return `\`${cmdName}\`** - ${cmdInfo.summary}**\n${getMessage(guild, "ALTERNATIVES")} *${cmd.aliases.map(alias => alias).join(', ')}*\n`
      }).join('')

      const descResource = getResources(guild, "HELP_DESC")

      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(getMessage(guild, "COMMANDS"))
            .setColor('Blue')
            .setDescription(`${description}\n${descResource[0]} ${config.prefix}${descResource[1]}`)
        ]
      })
    } else {
      message.channel.send(getCommandInfo(guild, args[0]).description)
    }
  }
}