module.exports = {
    commands: ['z_simjoin', 'admin_simjoin'],
    
    category: 'Moderator Commands',
    description: 'Simulates a new player joining the server"',
    
    permissions: ['ADMINISTRATOR'],
    
    permissions: ['ADMINISTRATOR'],
    slash: true,
    
    callback: ({ member, client }) => {
        client.emit('guildMemberAdd', member)
        return `Join simulated`
    }
}