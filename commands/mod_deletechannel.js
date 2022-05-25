module.exports = {
    commands: ['x_deletechannel', 'mod_deletechannel'],
    
    category: 'Moderator Commands',
    description: 'Deletes a channel were this command is used in.',
    
    slash: true,
    
    callback: ({ message, channel }) => {
        channel.delete()
    },
}