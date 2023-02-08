//  Imports
const { DisTube } = require('distube')
const Discord = require('discord.js')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const { loadLanguages, getError, getMessage, getQueue } = require('./language')

const fs = require('fs')

// Instantiating client
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
})

//  Importing configurations
client.config = require('./config.json')

//  Importing emotes
client.emotes = require('./emotes.json')

//  Distube instance
client.distube = new DisTube(client, {
  leaveOnEmpty: true,
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

// Warns in the log when the bot is ready
client.on('ready', () => {
  loadLanguages(client)
  console.log(`${client.user.tag} online!`)
})

// Commands verifier
client.on('messageCreate', async message => {
  const { guild } = message

  // Check the source of the message
  if (message.author.bot || !guild) return

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
    message.reply(getError(guild, "COMMAND_NOT_FOUND"))
    return
  }
  // Check if command need a voice channel
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(getError(guild, "IN_VOICE_CHANNEL"))
  }

  // Run command (or return errors)
  try {
    await cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${getError(guild, "ERROR_OCCURRED")} \`${e}\``)
  }
})

// Queue stats
const status = queue => getQueue(queue)

// Messages config
client.distube
  .on('playSong', (queue, song) => {
    const { guild } = queue.textChannel
    queue.textChannel.send(
      `${getMessage(guild, "PLAYING", client.emotes.play)} \`${song.name}\` - \`${song.formattedDuration}\`\n${getMessage(guild, "ADDED_BY")} ${song.user
      }\n${status(queue)}`
    )
  })

  .on('addSong', (queue, song) => {
    const { guild } = queue.textChannel
    queue.textChannel.send(
      `${getMessage(guild, "ADDED_TO_QUEUE", client.emotes.success)} \`${song.name}\` - \`${song.formattedDuration}\`\n${getMessage(guild, "ADDED_BY")} ${song.user}`
    )
  })

  .on('addList', (queue, playlist) => {
    const { guild } = queue.textChannel
    queue.textChannel.send(
      `${getMessage(guild, "ADDED", client.emotes.success)} \`${playlist.name}\` playlist (${playlist.songs.length
      } ${getMessage(guild, "SONGS_IN_QUEUE")}\n${status(queue)}`
    )
  })

  // .on('error', (channel, e) => {
  //   if (channel) channel.send(`${getError(guild, "ERROR_OCCURRED")} ${e.toString().slice(0, 1974)}`)
  //   else console.error(e)
  // })

  .on('empty', queue => {
    const { guild } = queue.textChannel
    queue.textChannel.send(getMessage(guild, "VOICE_CHANNEL_EMPTY"))
  })

  .on('searchNoResult', (message, query) =>
    message.channel.send(`${getError(message.guild, "NO_RESULTS_FOUND")} \`${query}\`!`)
  )

  .on('finish', (queue) => {
    const { guild } = queue.textChannel
    queue.textChannel.send(getMessage(guild, "ENDED_QUEUE"))
  })

// Run the bot
client.login(client.config.token)