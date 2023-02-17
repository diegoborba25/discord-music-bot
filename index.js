//  Imports
const { DisTube } = require('distube')
const Discord = require('discord.js')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const { loadLanguages, getError, getMessage, getQueue } = require('./language')
const commands = require('./commands')
const ready = require('./ready')

const fs = require('fs')

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
})

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

client.config = require('./config.json')
client.emotes = require('./emotes.json')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
const prefix = client.config.prefix

commands(client)
client.on('ready', () => {
  loadLanguages(client)
  ready(client)
})

client.on('messageCreate', async message => {
  const { guild } = message

  if (message.author.bot || !guild) return

  if (!message.content.startsWith(prefix)) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

  if (!cmd) {
    message.reply(getError(guild, "COMMAND_NOT_FOUND"))
    return
  }

  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(getError(guild, "IN_VOICE_CHANNEL"))
  }

  try {
    await cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${getError(guild, "ERROR_OCCURRED")} \`${e}\``)
  }
})

client.distube
  .on('playSong', (queue, song) => {
    const { guild } = queue.textChannel
    queue.textChannel.send(
      `${getMessage(guild, "PLAYING", client.emotes.play)} \`${song.name}\` - \`${song.formattedDuration}\`\n${getMessage(guild, "ADDED_BY")} ${song.user
      }\n${getQueue(queue)}`
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
      } ${getMessage(guild, "SONGS_IN_QUEUE")}\n${getQueue(queue)}`
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


client.login(client.config.token)