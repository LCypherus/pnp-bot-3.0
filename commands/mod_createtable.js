const DiscordJS = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    // Best practice for the built-in help menu
    commands: ['x_createtable', 'mod_createtable'],
    
    category: 'Moderator Commands',
    description: 'Create a table with role, category and channels',

    slash: true,

    options: [
        {
            name: 'gametype',
            description: 'The games type. Text based or Voice based',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
            choices: [
                {
                    "name": "text",
                    "value": "text"
                },
                {
                    "name": "voice",
                    "value": "voice"
                },
                {
                    "name": "both",
                    "value": "both"
                }
            ],
        },
        {
            name: 'gameformat',
            description: 'The games format, ie. Dungeons and Dragons.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.ROLE,
        },
        {
            name: 'dungeonmaster',
            description: 'The Dungeons Master of this new table.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER,
        },
        {
            name: 'tablename',
            description: 'The tables name.',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        }
    ],

    callback: async ({ args, client, guild, channel }) => {
        // Basic variables
        const type = args[0]
        const format = args[1]
        const formatInfo = guild.roles.cache.find(r => r.id === format);
        const formatName = formatInfo.name
        const dm = args[2]
        const dmTag = `<@${args[2]}>`
        const tableName = args.slice(3).join(" ")
        const tableShortName = tableName.match(/(?:^| )(\w)/g).join("").replace(/ /gi, "");
        
        // Create a role
        let role = await guild.roles.create({
            name: tableName + " Player",
            color: 'GREEN',
            position: 6,
        })
        rolesId = await role.id;

        // Create a category
        let cat = await guild.channels.create("(X/Y) " + tableName, {
            type: 'GUILD_CATEGORY',
            permissionOverwrites: [
                {
                    id: guild.roles.everyone, // Everyone
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: format, // Game Format
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: rolesId,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS"]
                },
                {
                    id: dm,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "MANAGE_THREADS"]
                }
            ]
        });

        // Create the info channel
        await guild.channels.create(tableShortName + "-info", {
            type: 'GUILD_TEXT',
            parent: cat,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone, // Everyone
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: format, // Game Format
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: rolesId,
                    allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                },
                {
                    id: dm,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "MANAGE_THREADS"]
                }
            ]
        });

        // Create the main channel
        if(type == "text") {
            await guild.channels.create(tableShortName + "-main", {
                type: 'GUILD_TEXT',
                parent: cat,
            });
        } else if(type == "voice") {
            await await guild.channels.create(tableShortName + "-voice", {
                type: 'GUILD_VOICE',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone, // Everyone
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: format, // Game Format
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: rolesId,
                        allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK", "USE_VAD", ]
                    },
                    {
                        id: dm,
                        allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS", "PRIORITY_SPEAKER", "STREAM", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                    }
                ]
            });
        } else if(type == "both") {
            await guild.channels.create(tableShortName + "-main", {
                type: 'GUILD_TEXT',
                parent: cat,
            });
            await guild.channels.create(tableShortName + "-voice", {
                type: 'GUILD_VOICE',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone, // Everyone
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: format, // Game Format
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: rolesId,
                        allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK", "USE_VAD", ]
                    },
                    {
                        id: dm,
                        allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS", "PRIORITY_SPEAKER", "STREAM", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD"]
                    }
                ]
            });
        } else {
            return "Please specify if your making a Text, voice or both campaign."
        }

        // Create the ooc channel
        await guild.channels.create(tableShortName + "-ooc", {
            type: 'GUILD_TEXT',
            parent: cat,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone, // Everyone
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS"]
                },
                {
                    id: format, // Game Format
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS"]
                },
                {
                    id: rolesId,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS"]
                },
                {
                    id: dm,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "MANAGE_THREADS"]
                }
            ]
        });

        // Create rolls channel
        await guild.channels.create(tableShortName + "-rolls", {
            type: 'GUILD_TEXT',
            parent: cat,
            permissionOverwrites: [
                {
                    id: rolesId,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "ADD_REACTIONS", "SEND_TTS_MESSAGES", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS"]
                },
                {
                    id: dm,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "MANAGE_THREADS"]
                }
            ]
        });

        // Create dm channel
        let dmChannel = await guild.channels.create(tableShortName + "-dm", {
            type: 'GUILD_TEXT',
            parent: cat,
            permissionOverwrites: [
                {
                    id: dm,
                    allow: ["MANAGE_CHANNELS", "ADD_REACTIONS", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "USE_VAD", "SEND_MESSAGES_IN_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "MANAGE_THREADS"]
                }
            ]
        });

        // Create the ending embed on succes
        const createtableEmbed = new MessageEmbed()
	        .setColor('#3CA489')
	        .setTitle('You succesfully added a new table')
	        .setDescription('This is the summary of the new table')
	        .setThumbnail('https://cdn.discordapp.com/attachments/834882298268221460/840171923093585940/icon.png')
	        .addFields(
		        { name: 'Dungeon Master', value: dmTag, inline: true },
	         	{ name: 'Format & type', value: formatName + ' ' + type, inline: true },
                { name: 'Table Name:', value: tableName, inline: false },
                { name: 'Table Shorthand', value: tableShortName, inline: true },
                { name: 'Playersrole', value: tableName + " Player", inline: true },
	        )
	        .setFooter('/createtable - Contact L_Cypherus when you\'re having problems with this command.');

        channel.send({ embeds: [createtableEmbed] })

        // dmChannelId = await dmChannel.id
        // console.log(dmChannel.id)
        dmChannel.send({ content: `Hello ${dmTag}, Your table has been created.\n`, embeds: [createtableEmbed] });
    }
}