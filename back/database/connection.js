const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/app_blog");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    connection
}