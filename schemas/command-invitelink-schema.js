const mongoose = require('mongoose')

const commandInvitelinkSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    invitelink: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('guild-invitelink', commandInvitelinkSchema)

