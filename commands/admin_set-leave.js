const DiscordJS = require('discord.js')
const leaveSchema = require('@schemas/leave-schema')

module.exports = {
    commands: ['z_setleave', 'admin_set-leave'],
    
    category: 'Configuration',
    description: 'Sets the leave channel',
    
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

        await leaveSchema.findOneAndUpdate({
           _id: guild.id,
        }, {
            _id: guild.id,
            text,
            channelId: target.id
        }, {
            upsert: true
        })

        return 'leave channel set'
    }
}