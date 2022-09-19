const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todoSchema = new Schema({
    content: {
        type: "string",
        required: true,
    },
    completed: {
        type: "Boolean",
        required: true
    }


}, { timestamps: true })
module.exports = mongoose.model("Todo", todoSchema)


