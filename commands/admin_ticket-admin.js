const DiscordJS = require('discord.js')
const ticketAdminSchema = require('@schemas/ticket-admin-schema')

module.exports = {
    commands: ['z_ticket-admin', 'admin_ticket-admin'],
    
    category: 'Moderator Commands',
    description: 'Sets the parent category for the ticket system.',
    
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<category ID> <admin role Id> <moderator role Id (or admin role second time)',
    
    permissions: ['ADMINISTRATOR'],
    slash: true,
    
    options: [
        {
            name: 'catid',
            description: 'The category ID of the ticket category',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.CHANNEL,
        },
        {
            name: 'adminrole',
            description: 'The adminrole to include in adminsOnly tickets',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.ROLE,
        },
        {
            name: 'moderatorrole',
            description: 'The moderatorsrole to include in tickets.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.ROLE,
        }
    ],
    
    callback: async ({ interaction, args, guild }) => {
        const categoryId = args[0]
        const adminRoleId = args[1]
        const moderatorRoleId = args[2]

        await ticketAdminSchema.findOneAndUpdate({
            guildId: guild.id, 
        }, {
            guildId: guild.id,
            categoryId,
            adminRoleId,
            moderatorRoleId
        }, {
            upsert: true
        })

        return 'Category id set'
    }
}