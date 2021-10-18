const commandInvitelinkSchema = require('@schemas/command-invitelink-schema')

module.exports = {
    commands: ['Set invitelink', 'setinvite', 'set-invitelink'],
    category: 'Admin Commands',
    description: 'Sets the invite link',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<invitelink>',
    permissions: ['ADMINISTRATOR'],

    callback: async ({message, text}) => {
        const guildId = message.guild.id
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

        message.channel.send(`The invitelink for this bot is now ${invitelinkend}`)
        console.log(invitelinkend)
    },
}