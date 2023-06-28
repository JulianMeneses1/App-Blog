const {model, Schema} = require("mongoose");

const CategorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },    
    articles: {
        type: Array,
        default: []
    }
})

module.exports = model("Category", CategorySchema)