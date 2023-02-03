const commandName = 'language'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

const { languages } = require('../lang.json')

module.exports = {
    name: commandName,
    aliases: commandaliases,
    run: async (client, message, args) => {
        //const { guild } = message

        const targetLanguage = args[0]
        if (!targetLanguage) return 

        if (languages.includes(targetLanguage.toLowerCase())) {
            return message.reply('That language is supported!')
        } else {
            return message.reply('That language is not supported.')
        }
    }
}