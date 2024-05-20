const mongoose = require("mongoose")

const TicketSchema = new mongoose.Schema({
    creator: String,
    subject: String,
    priority: String,
    description: String,
    asignee: String
})

const TicketModel = mongoose.model("Tickets", TicketSchema)
module.exports = TicketModel