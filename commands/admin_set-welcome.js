const DiscordJS = require('discord.js')
const welcomeSchema = require('@schemas/welcome-schema')

module.exports = {
    commands: ['z_setwelcome', 'admin_set-welcome'],
    
    category: 'Configuration',
    description: 'Sets the welcome channel',
    
    minArgs: 2,
    expectedArgs: '<channel> <text>',
    
    permissions: ['ADMINISTRATOR'],
    slash: true,
    
    options: [
        {
            name: 'channel',
            description: 'The target channel.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
        {
            name: 'text',
            description: 'The welcome message.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],
    
    callback: async ({ guild, message, interaction, args }) => {
        if (!guild) {
            return 'Please use this command within a server.'
        }
        
        const target = interaction.options.getChannel('channel')
        if (!target || target.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.'
        }
        console.log(`${target.id}`)

        let text = interaction?.options.getString('text')
        console.log(`${text}`)

        await welcomeSchema.findOneAndUpdate({
           _id: guild.id,
        }, {
            _id: guild.id,
            text,
            channelId: target.id
        }, {
            upsert: true
        })

        return 'Welcome channel set'
    }
}