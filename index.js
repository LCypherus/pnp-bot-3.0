require('module-alias/register')
const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')

require('dotenv').config();

const { Intents } = DiscordJS

const client = new DiscordJS.Client({
    // These intents are recommended for the built in help menu
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})

client.on('ready', () => {
    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
  
    const wok = new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        delErrMsgCooldown: 10,
        dbOptions,
        mongoUri: process.env.MONGODB,
        testServers: ['833783765699788850']
    })

    wok.on('databaseConnected', async (connection, state) => {
        console.log(`The connection state to Mongo is "${state}"`)
    })
})

client.login(process.env.BOTTOKEN)