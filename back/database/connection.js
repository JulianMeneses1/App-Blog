const mongoose = require("mongoose");

const connection = async () => {
    try {
         //await mongoose.connect("mongodb://127.0.0.1:27017/app_blog");
        await mongoose.connect("mongodb+srv://root:b06UCOWAHWdaLQLe@app-blog.ynp5pxg.mongodb.net/app_blog?retryWrites=true&w=majority");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    connection
}