const Category = require("../models/Category");
const validator = require("validator");

const save = (req, res) => {
    try {        
        if (validator.isEmpty(req.body.name) || !validator.isLength(req.body.name, {min: 4, max: 20})) {
            throw new Error("Nombre inválido");
        }   
    } catch (error) {
        return res.status(400).json({
            status: "error",    
            message: "Datos incorrectos"
        })
    }  
    const category = new Category(req.body);

    category.save(req.body)
        .then( () => {            
            return res.status(200).json({  
                status: "success",  
                category: category
            })   
        }).catch((error) => {
            return res.status(500).json({
                status: "error",    
                message: "Error al guardar la categoría en la base de datos"
            })
        })
}

const getCategories = (req, res) => { 
    Category.find({}).exec()
                     .then((categories)=>{
        return res.status(200).json({  
            status: "success",
            counter: categories.length,  
            categories
        })  
    }).catch((error) => {
        return res.status(500).json({
            status: "error",    
            message: "Error al obtener las categorías"
        })
    })
}

const deleteById = (req, res) => {
    Category.findOneAndDelete({_id:req.params.id})
        .then ((category) => {
            return res.status(200).json({  
                status: "success",
                category, 
                message: "Categoría eliminado"
            })  
        }).catch((error)=>{
            return res.status(404).json({
                status: "not found", 
                message: "La categoría no existe"
            })
        })
}


module.exports = {
    save,
    deleteById,
    getCategories
}