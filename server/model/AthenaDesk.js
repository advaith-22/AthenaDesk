const mongoose = require("mongoose")

const AthenaSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String
})

const AthenaModel = mongoose.model("AthenaDesk", AthenaSchema)
module.exports = AthenaModel