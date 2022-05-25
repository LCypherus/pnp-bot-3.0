module.exports = {
    commands: ['p'],
    
    category: 'Moderator Commands',
    description: 'Replies with "Pong!"',
    
    minArgs: 0,
    maxArgs: 0,
    expectedArgs: '',
    
    permissions: ['ADMINISTRATOR'],
    requireRoles: true,
    
    cooldown: '60s',
    globalCooldown: '10m',
    
    testOnly: true,
    slash: 'both',
    
    options: [],
    
    callback: ({
        guild,      // The guild where the command was sent
        member,     // The member who ran the command
        user,       // The user who ran the command
        message,    // The DJS message object
        channel,    // The DJS channel object
        args,       // An array of arguments without the command prefix/name
        text,       // A joined string of the above arguments
        client,     // Your bot's client object
        prefix,     // The prefix used to run this command
        instance,   // Your WOKCommands instance
        interaction // The interaction for slash commands
    }) => {}
}