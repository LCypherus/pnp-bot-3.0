const mongoose = require('mongoose')

const reqString= {
    type: String,
    required: true
}

const ticketAdminSchema = mongoose.Schema({
    guildId: reqString,
    categoryId: reqString,
    adminRoleId: reqString,
    moderatorRoleId: reqString
})

module.exports = mongoose.model('ticket-admin', ticketAdminSchema)