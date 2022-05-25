module.exports = {
    commands: ['z_simleave', 'admin_simleave'],
    
    category: 'Moderator Commands',
    description: 'Simulates a player leaving the server"',
    
    permissions: ['ADMINISTRATOR'],
    
    permissions: ['ADMINISTRATOR'],
    slash: true,
    
    callback: ({ member, client }) => {
        client.emit('guildMemberLeave', member)
        return `Leave simulated`
    }
}