const { Client, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    commands: ['z_addrole', 'admin_addrole'],
    
    category: 'Admin Commands',
    description: 'Add a role to the autorole message.',
    
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'], 
    
    permissions: ['ADMINISTRATOR'],
    
    slash: true,

    init: (client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction

            if (customId === 'auto_roles') {
                const component = interaction.component
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    content: 'Roles update!',
                    ephemeral: true
                })
            }
        })
    },
    
    callback: async ({ interaction, args, client }) => {
        const channel = interaction.options.getChannel('channel')
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel'
        }

        const messageId = args[1]
        const role = interaction.options.getRole('role')
        if (!role) {
            return 'Unknown role!'
        }

        const targetMessage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true
        })

        if (!targetMessage) {
            return 'Unknown message ID'
        }

        if (targetMessage.author.id !== client.user?.id) {
            return `Please provide a message ID that was send from <@${client.user?.id}>`
        }

        let row = targetMessage.components[0]
        if (!row) {
            row = new MessageActionRow()
        }

        const option = [{
             label: role.name,
             value: role.id
        }]

        let menu = row.components[0]


        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    console.log(menu.options.indexOf(o))
                    menu.spliceOptions(menu.options.indexOf(o), 1)
                    menu.setMaxValues(menu.options.length)
                    targetMessage.edit({
                        components: [row]
                    })
                     return {
                         custom: true,
                         content: `<@&${o.value}> is already part of this menu. The role has been deleted`,
                         ephemeral: true
                     }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                    .setCustomId('auto_roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder('Select your roles...')
                    .addOptions(option)
            )
        }

        targetMessage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Added <@${role.id}> to the auto roles menu.`,
            allowedMentions: {
                roles: [],
            },
            ephemeral: true,
        }
    }
}