const DiscordJS = require('discord.js')
const welcomeSchema = require('@schemas/welcome-schema')

module.exports = (client, member, guild) => {
    client.on("guildMemberAdd", async (member) => {
        const results = await welcomeSchema.findOne({ _id: member.guild.id })
            
        const channelId = results.channelId
        const text = results.text

        console.log(`${channelId} and ${text}`)
        
        const channel = member.guild.channels.cache.get(channelId)

        console.log(`${channel} and ${text}`)

        channel.send({
            content: text.replace(/<@>/g, `<@${member.id}>`)
        })
    })
}
  
module.exports.config = {
    displayName: 'Welcome Channel',
    dbName: 'WELCOME_CHANNEL'
  }