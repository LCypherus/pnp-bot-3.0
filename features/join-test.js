// Basic welcome message feature
module.exports = (client, instance) => {
    // Listen for new members joining a guild
    client.on("guildMemberAdd", (member) => {
        console.log(`${member.id} has joined the server`)
    })

    client.on("guildMemberLeave", (member) => {
        console.log(`${member.id} has left the server`)
    })
}
  
  // Configuration for this feature
  module.exports.config = {
    displayName: 'Join Test',
    dbName: 'JOINTEST',
  }