const express = require("express");
const multer = require("multer");

// creamos la variable router de express para configurar cada ruta
const router = express.Router();

// acá creamos una variable para acceder a todos los métodos definidos en el controlador de article
const ImageController = require("../controllers/imageController");

// en la variable storage configuramos el almacenamiento de los archivos que subamos
const Storage = multer.diskStorage({
    // carpeta a la que se van a subir los archivos
    destination: function (req, file, cb) {
        cb(null, './images/articles/');
    },
    // nombre con el que se va a guardar el archivo
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// este es el middleware que aplicamos antes de que se ejecute el método uploadFile para indicar la carpeta donde se van a guardar los archivos
const uploads = multer({storage: Storage});

router.get("/:imageName",ImageController.getImage);

// single indica que se va a subir un solo archivo, bajo el campo "file"
router.post("",uploads.single("file"),ImageController.uploadImage);

module.exports = router;