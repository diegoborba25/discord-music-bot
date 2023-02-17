const { ActivityType } = require('discord.js')
const { playing } = require('./config.json')

module.exports = async (client) => {
    client.user.setPresence({
        activities: [
            {
                name: playing,
                type: ActivityType.Playing
            }
        ],
        status: 'online',
    });
    console.log(`Bot logged with ${client.users.cache.size} users, on ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`)
    console.log(`${client.user.tag} online!`)
}