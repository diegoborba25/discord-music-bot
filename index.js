//  Imports
const { DisTube } = require('distube')
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
})
const fs = require('fs')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

//  Importing configurations
client.config = require('./config.json')

//  Importing emotes
client.emotes = require('./emotes.json')

//  Distube instance
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})

//  Creating lists of commands and aliases
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

// Import prefix
const prefix = client.config.prefix

// Instantiating commands
fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Não foi encontrado nenhum comando!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Não foi encontrado nenhum comando!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Comando carregado: ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

// Warns in the log when the bot is ready
client.on('ready', () => {
  console.log(`${client.user.tag} online!`)
})

// Commands verifier
client.on('messageCreate', async message => {
  // Check the source of the message
  if (message.author.bot || !message.guild) return

  // Check prefix
  if (!message.content.startsWith(prefix)) return

  // Slice command args
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  
  // Get command 
  const command = args.shift().toLowerCase()

  // Instance command
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

  // Check if command is valid
  if (!cmd) {
    message.reply(`${client.emotes.error} | Digite um comando válido!`)
    return
  }
  // Check if command need a voice channel
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`${client.emotes.error} | Você deve estar em um canal de voz!`)
  }

  // Run command (or return errors)
  try {
    await cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Erro: \`${e}\``)
  }
})

// Queue stats
const status = queue =>
  `Volume: \`${queue.volume}%\` | Filtro(s): \`${queue.filters.names.join(', ') || 'Desligado'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Desligado'
  }\` | Autoplay: \`${queue.autoplay ? 'Ligado' : 'Desligado'}\``

// Messages config
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.play} | Tocando: \`${song.name}\` - \`${song.formattedDuration}\`\nAdicionado por: ${
        song.user
      }\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | Adicionado na fila: \`${song.name}\` - \`${song.formattedDuration}\`\nAdicionado por: ${song.user}`
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | Adicionado: \`${playlist.name}\` playlist (${
        playlist.songs.length
      } músicas) na fila\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`${client.emotes.error} | Ocorreu um erro: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  // .on('empty', channel => channel.send('O canal de voz está vazio! Valeu, falou!'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | Nenhum resultado encontrado para: \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Fila finalizada!'))
// // DisTubeOptions.searchSongs = true
// .on("searchResult", (message, result) => {
//     let i = 0
//     message.channel.send(
//         `**Choose an option from below**\n${result
//             .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
//             .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     )
// })
// .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
// .on("searchInvalidAnswer", message =>
//     message.channel.send(
//         `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
//     )
// )
// .on("searchDone", () => {})

// Run the bot
client.login(client.config.token)