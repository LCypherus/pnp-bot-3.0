const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const leaveSchema = mongoose.Schema({
    _id: reqString,
    channelId: reqString,
    text: reqString,
})

const name = "leave-command"
module.exports = mongoose.model(name, leaveSchema, name)