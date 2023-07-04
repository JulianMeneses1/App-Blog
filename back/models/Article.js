const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

// con Schema definimos el esquema que van a tener todos los artículos 
const ArticleShema = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

ArticleShema.plugin(mongoosePaginate)
// Exportamos este esquema bajo un modelo con un determinado nombre, el cual debería ser el mismo que la colección en Mongo pero 
// con mayúscula y en singular (mongoose se encarga de agregarle una s, ponerlo en minúscula y buscar en Mongo si hay una
// colección con ese nombre, si es así la acción se hace sobre esa colección, y si en cambio la colección no existe se crea).
// También le podemos agregar un tercer parámetro indicando el nombre de la colección en Mongo.
module.exports = model("Article", ArticleShema)