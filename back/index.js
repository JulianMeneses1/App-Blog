const {connection} = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Conexión Base de Datos
connection();

// Crear Servidor Node
const app = express();
const port = 3900;

// Configurar cors (esto es un middleware, se va a ejecutar antes de cada petición HTTP)
app.use(cors());

// Convertir el body de cualquier petición HTTP a un objeto js (estos también son middlewares)
app.use(express.json({limit: '4mb'})); // esto se aplica cuando el content-type de los datos sea json
app.use(express.urlencoded({extended:true})); // para content-type igual a x-www-form-urlencoded

// Importamos las rutas
const article_routes = require("./routes/articleRoute"); 
const image_routes = require("./routes/imageRoute");

// Cargamos las rutas en el servidor (en este caso anteponemos "api" a todas las rutas definidas en article)
app.use("/api/articles", article_routes);
app.use("/api/images", image_routes);

// Escuchar peticiones HTTP
app.listen(port, () => console.log("Started on port " + port));



