const fs = require("fs");
const path = require("path");

const uploadImage = (req, res) => {
    // si no se manda ningún archivo, lanzamos error
    if (!req.file) {
        return res.status(400).json({
            status: "error",
            message: "Petición inválida"
        })
    }
    // Nombre del archivo
    let fileName = req.file.originalname;
    // Extensión del archivo
    let file_split = fileName.split("\.");
    // Comprobar extensión correcta
    let file_extension = file_split[1];

    if (file_extension != "png" && file_extension != "jpg" && file_extension != "jpeg" && file_extension != "webp") {
        // si no es una imagen, borramos el archivo de nuestra carpeta con fs.unlink y lanzamos un error
        fs.unlink(req.file.path, (error)=> {
            return res.status(400).json({
                status: "error",
                message: "Extensión inválida, sólo se admiten imágenes"
            })
        }) 
    }         
    return res.status(200).send("http://localhost:3900/api/images/" + req.file.filename);  
}

const getImage = (req,res) => {
    let fileName = req.params.imageName;
    let physicalPath = "./images/articles/"+fileName;
    // accedemos a la ruta y si existe devolvemos un get de la imagen
    fs.stat(physicalPath, (error, exists) => {
        if (exists) {
            return res.sendFile(path.resolve(physicalPath));
        } else{
            return res.status(404).json({
                status: "not found", 
                message: "La imagen no existe"
            }) 
        }
    })
}

module.exports = {
    getImage,
    uploadImage
}