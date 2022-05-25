const DiscordJS = require('discord.js')
const leaveSchema = require('@schemas/leave-schema')

module.exports = (client, member, guild) => {
    client.on("guildMemberLeave", async (member) => {
        const results = await leaveSchema.findOne({ _id: member.guild.id })
            
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
    displayName: 'Leave channel',
    dbName: 'LEAVE_CHANNEL'
  }