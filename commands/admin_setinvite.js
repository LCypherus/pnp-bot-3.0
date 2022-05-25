const commandInvitelinkSchema = require('@schemas/command-invitelink-schema')

module.exports = {
    commands: ['z_setinvite', 'admin_setinvite'],
    category: 'Admin Commands',
    description: 'Sets the invite link',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<invitelink>',
    slash: true,
    permissions: ['ADMINISTRATOR'],

    callback: async ({message, text, interaction, guild}) => {
        const guildId = guild.id
        const invitelinkend = text

        await commandInvitelinkSchema.findOneAndUpdate(
            {
                _id: guildId,
            },
            {
                _id: guildId,
                invitelink: invitelinkend,
            },
            {
                upsert: true,
            }
        )
        
        console.log(invitelinkend)
        console.log(guildId)
        
        return `The invitelink for this bot is now ${invitelinkend}`
    },
}