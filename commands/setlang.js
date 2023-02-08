const mongo = require('../mongo')
const languageSchema = require('../schemas/language-schema')
const { languages } = require('../language.json')
const { setLanguage, getError, getMessage } = require('../language')

module.exports = {
    name: 'setlang',
    aliases: [
        "lang",
        "language"
    ],
    run: async (client, message, args) => {
        const { guild } = message
        const arg = args[0];

        if (!arg) return message.reply(getMessage(guild, "CURRENT_LANGUAGE"))

        const targetLanguage = arg.toLowerCase()
        if (!languages.includes(targetLanguage)) return message.reply(getError(guild, "LANGUAGE_NOT_SUPPORTED"))
            
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
                message.reply(getMessage(guild, "LANGUAGE_SET"))
            } finally {
                mongoose.connection.close()
            }
        })
    }
}