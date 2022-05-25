const Discord = require('discord.js');
const commandInvitelinkSchema = require('@schemas/command-invitelink-schema')

module.exports = {
    commands: ['invitelink', 'player_get-invitelink'],
    slash: 'both',  
    
    category: 'Player Commands',
    description: 'Receive this server\'s invite link.',

    // minArgs: 0,
    // maxArgs: 0,
    
    callback: async ({ guild }) => {
        const guildId = guild.id
        const result = await commandInvitelinkSchema.findOne({ _id: guildId })
        const invitelink = result.invitelink

        return `https://discord.gg/${invitelink}`
    }
}