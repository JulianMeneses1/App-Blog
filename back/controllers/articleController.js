const {validateArticle} = require("../helpers/validationArticle");
const Article = require("../models/Article");

const save = (req, res) => {
    // Validar los datos
    try {
        validateArticle(req.body);
    } catch (error) {
        return res.status(400).json({
            status: "error",    
            message: "Datos incorrectos"
        })
    }  
    // Crear el objeto a guardar con los valores que obtenemos del body
    const article = new Article(req.body);

    // Guardar el artículo en la base de datos
    article.save(article)
        // Si la promesa se resuelve bien, o sea se carga el artículo en la bd, lo devolvemos en la respuesta
        .then( () => {            
            return res.status(200).json({  
                status: "success",  
                article: article
            })   
        // Si hay algún error, devolvemos un status 500   
        }).catch((error) => {
            return res.status(500).json({
                status: "error",    
                message: "Error al guardar el artículo en la base de datos"
            })
        })
}

const saveArticles = (req, res) => {
    const articles = req.body;
    try{
        articles.forEach((article)=> {
            validateArticle(article);
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",    
            message: "Datos incorrectos"
        })
    };
    const savedArticles = articles.map((article)=> {
        const newArticle = new Article(article);
        return newArticle.save();
    });    
    Promise.all(savedArticles)
        .then((result) => {
            return res.status(200).json({
                status: "success",
                articles: result,
              });
        }).catch((error) => {
            return res.status(500).json({
              status: "error",
              message: "Error al guardar los artículos en la base de datos",
        });
    });
}

const getAllArticles = (req, res) => { 
    // en el método find pasamos los filtros (where) y con exec ejecutamos la consulta. 
    // En este caso obtenemos todos los documentos, por eso no pasamos filtros
    const query = Article.find({})
    // los ordenamos de más nuevo a más viejo
                         .sort({date: -1})
    // limitamos la cantidad de documentos a traer, según el parámetro de ruta ingresado
                         .limit(req.params.quantity)
                         .exec()
                         .then((articles)=>{
        return res.status(200).json({  
            status: "success",
            counter: articles.length,  
            articles
        })  
    }).catch((error) => {
        return res.status(500).json({
            status: "error",    
            message: "Error al obtener los artículos"
        })
    })
}

const getArticleById = (req, res) => { 
    Article.findById(req.params.id)
                    .exec()
                    .then((article)=>{
        if (article) {
            return res.status(200).json({  
                status: "success",
                article
            }) 
        }        
    }).catch((error) => {
        return res.status(404).json({
            status: "not found",    
            message: "El artículo no existe"
        })
    })
}

const searcher = (req, res) => {
    Article.find(
        // verificamos si hay algún título que incluya el parámetro pasado (lo tomamos dentro de una expresión regular)
        {"title": {"$regex": req.params.string, "$options": "i"}}
    )
    .sort({fecha: -1})
    .exec()
    .then ((articles) => {
        if (articles.length==0) {
            return res.status(404).json({
                status: "not found", 
                message: "No se encontraron artículos"
            }) 
        }
        return res.status(200).json({  
            status: "success",
            articles
        })
    }).catch(error => {
        return res.status(500).json({
            status: "error", 
            message: "Error del servidor"
        }) 
    })
}

const deleteById = (req, res) => {
    Article.findOneAndDelete({_id:req.params.id})
        .then ( (article) => {
            return res.status(200).json({  
                status: "success",
                article, 
                message: "Artículo eliminado"
            })  
        }).catch((error)=>{
            return res.status(404).json({
                status: "not found", 
                message: "El artículo no existe"
            })
        })
}

const update = (req, res) => {
    try {
        validateArticle(req.body);
    } catch (error) {
        return res.status(400).json({
            status: "error",    
            message: "Datos incorrectos"
        })
    }  
    // el primer parámetro es el filtro, en este caso buscamos por el id, después pasamos los nuevos datos que obtenemos del body, 
    // y por último ponemos que nos devuelva el objeto actualizado (si está en false new te devuelve el objeto original)
    Article.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then((article)=>{
            return res.status(200).json({  
                status: "success",
                article, 
                message: "Artículo actualizado"
            })  
        }).catch((error)=>{
            return res.status(404).json({
                status: "not found", 
                message: "El artículo no existe"
            })
        })
}

module.exports = {
    save,
    saveArticles,
    getAllArticles,
    getArticleById,
    deleteById,
    update,
    searcher
}