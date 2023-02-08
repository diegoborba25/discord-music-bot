const mongo = require('./mongo')
const languageSchema = require('./schemas/language-schema')
const lang = require('./language.json')
const emotes = require('./emotes.json')

// { 'guildId': 'language' }
const guildLanguages = {}

const loadLanguages = async (client) => {
    await mongo().then(async (mongoose) => {
        try {
            for (const guild of client.guilds.cache) {
                const guildId = guild[0]

                const result = await languageSchema.findOne({
                    _id: guildId,
                })

                guildLanguages[guildId] = result ? result.language : 'english'
            }
        } finally {
            mongoose.connection.close()
        }
    })
}

const setLanguage = (guild, language) => {
    guildLanguages[guild.id] = language.toLowerCase()
}

const getMessage = (guild, textId, emote) => {
    if (!lang.messages[textId]) {
        throw new Error(`Unknown text ID "${textId}"`)
    }

    const selectedLanguage = guildLanguages[guild.id].toLowerCase()
    const message = lang.messages[textId][selectedLanguage]

    if (!emote) {
        return message
    }
    return `${emote} | ${message}`
}

const getError = (guild, errorId, arg) => {
    if (!lang.errors[errorId]) {
        throw new Error(`Unknown error ID "${errorId}"`)
    }

    const selectedLanguage = guildLanguages[guild.id].toLowerCase()

    if (!arg) return `${emotes.error} | ${lang.errors[errorId][selectedLanguage]}`

    return `${emotes.error} | \`${arg}\` ${lang.errors[errorId][selectedLanguage]}`
}

const getCommandInfo = (guild, command) => {
    if (!lang.commands[command]) {
        throw new Error(`Unknown command ID "${command}"`)
    }

    const selectedLanguage = guildLanguages[guild.id].toLowerCase()

    return lang.commands[command][selectedLanguage]
}

const getResources = (guild, resourceId) => {
    if (!lang.resources[resourceId]) {
        throw new Error(`Unknown resource ID "${resourceId}"`)
    }

    const selectedLanguage = guildLanguages[guild.id].toLowerCase()

    return lang.resources[resourceId][selectedLanguage]
}

const getResourceProperty = (guild, resourceId, property, emote) => {
    const resource = getResources(guild, resourceId)

    const message = resource[property]

    if (!emote) {
        return message
    }
    return `${emote} | ${message}`
}

module.exports.loadLanguages = loadLanguages
module.exports.setLanguage = setLanguage

module.exports.getMessage = getMessage
module.exports.getError = getError
module.exports.getCommandInfo = getCommandInfo
module.exports.getResources = getResources
module.exports.getResourceProperty = getResourceProperty

// Compound Messages
// Will be overwritten soon
const getQueue = (queue) => {
    const { guild } = queue.textChannel
    const selectedLanguage = guildLanguages[guild.id].toLowerCase()

    const resources = lang.resources["QUEUE"][selectedLanguage]
    const loopModesResources = lang.resources["LOOP_MODES"][selectedLanguage]

    const offMessage = lang.messages["OFF"][selectedLanguage]
    const onMessage = lang.messages["ON"][selectedLanguage]

    return `${resources.volume} \`${queue.volume}%\` | ${resources.filters} \`${queue.filters.names.join(', ') || offMessage}\` | ${resources.loop} \`${queue.repeatMode ? (queue.repeatMode === 2 ? loopModesResources.allQueue : loopModesResources.thisSong) : offMessage}\` | ${resources.autoplay} \`${queue.autoplay ? onMessage : offMessage}\``
}
module.exports.getQueue = getQueue