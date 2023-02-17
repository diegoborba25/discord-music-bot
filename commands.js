const fs = require('fs')

module.exports = async (client) => {
    fs.readdir('./commands/', (err, files) => {
        if (err) return console.log('No command found')
        const jsFiles = files.filter(f => f.split('.').pop() === 'js')
        if (jsFiles.length <= 0) return console.log('No command found')
        jsFiles.forEach(file => {
            const cmd = require(`./commands/${file}`)
            console.log(`Command loaded: ${file}`)
            client.commands.set(cmd.name, cmd)
            if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
        })
    })
}