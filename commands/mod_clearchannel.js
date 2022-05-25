module.exports = {
    commands: ['x_clearchannel', 'mod_clearchannel'],
    
    category: 'Moderator Commands',
    description: 'Deletes multiple messages at once.',
    
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '[amount]',
    
    slash: true,
    
    callback: async ({ message, interaction, channel, args }) => {
        const amount = args.length ? parseInt(args.shift()) : 1

        if (message) {
            await message.delete()
        }

        const messages = await channel.messages.fetch({ limit: amount })
        const { size } = messages
        messages.forEach((message) => message.delete())

        const reply = `Deleted ${size} message(s).`

        return reply
    }
}