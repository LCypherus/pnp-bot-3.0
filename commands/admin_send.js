module.exports = {
    commands: ['z_send', 'admin_send'],
    
    category: 'Admin Commands',
    description: 'Send a message',
    
    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'], 
    
    permissions: ['ADMINISTRATOR'],
    
    slash: true,
    
    callback: ({ interaction, args }) => {
        const channel = interaction.options.getChannel('channel')
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel'
        }

        args.shift() // Remove the channel from the arguments array
        const text = args.join(' ')

        channel.send(text)

        interaction.reply({
            content: 'send message!',
            ephemeral: true
        })
    }
}