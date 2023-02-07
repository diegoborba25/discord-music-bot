const commandName = 'language'
const commandsInfo = require('./commands-info.json')
const commandInfo = commandsInfo[commandName]
const commandaliases = commandInfo.aliases

const mongo = require('../mongo')
const languageSchema = require('../schemas/language-schema')
const { languages } = require('../lang.json')
const { setLanguage, getLang } = require('../language')

module.exports = {
    name: commandName,
    aliases: commandaliases,
    run: async (client, message, args) => {
        const { guild } = message
        const arg = args[0];
        
        if(!arg) return message.reply(`Lang: ${getLang()}`)

        const targetLanguage = arg.toLowerCase()
        if (!languages.includes(targetLanguage)) {
            message.reply('That language is not supported.')
            return
        }

        setLanguage(guild, targetLanguage)

        await mongo().then(async (mongoose) => {
            try {
                await languageSchema.findOneAndUpdate({
                    _id: guild.id
                }, {
                    _id: guild.id,
                    language: targetLanguage
                }, {
                    upsert: true
                })
                message.reply('Language set!')
            } finally {
                mongoose.connection.close()
            }
        })
    }
}