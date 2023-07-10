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
            return res.status(200).send(article); 
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
            return res.status(200).send(result);
        }).catch((error) => {
            return res.status(500).json({
              status: "error",
              message: "Error al guardar los artículos en la base de datos",
        });
    });
}

const getAllArticles = (req, res) => { 
    const page = req.params.page ? req.params.page : 1;
    // en el método paginate (si no paginamos usamos find) pasamos los filtros (where) y con exec ejecutamos la consulta (si es find en vez de paginator). 
    // En este caso obtenemos todos los documentos, por eso no pasamos filtros
    Article.paginate({}, {page, limit: 6, sort: { created: -1 }})
            .then((result)=>{       
        return res.status(200).send(result); 
    }).catch((error) => {
        return res.status(500).json({
            status: "error",    
            message: "Error al obtener los artículos"
        })
    })
}

const getArticlesByCategory = (req, res) => {
    const page = req.params.page ? req.params.page : 1;

    Article.paginate({"category":req.params.category}, {page, limit:6, sort: { created: -1 }})
      
    .then((result)=> {
        return res.status(200).send(result)
    }).catch(error=> {
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
            return res.status(200).send(article) 
        }        
    }).catch((error) => {
        return res.status(404).json({
            status: "not found",    
            message: "El artículo no existe"
        })
    })
}

const getArticlesBySearcher = (req, res) => {
    const page = req.params.page ? req.params.page : 1;
    Article.paginate(
        // verificamos si hay algún título que incluya el parámetro pasado (lo tomamos dentro de una expresión regular)
        {"title": {"$regex": req.params.string, "$options": "i"}}, {page, limit:6, sort: { created: -1 }}
    )
    .then ((result) => {
        if (result.docs.length==0) {
            return res.status(404).json({
                status: "not found", 
                message: "No se encontraron artículos"
            }) 
        }
        return res.status(200).send(result); 
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
            return res.status(200).send(article);  
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
            return res.status(200).send(article)  
        }).catch((error)=>{
            if (error.status === 404) {
                return res.status(404).json({
                  status: "not found",
                  message: "El artículo no existe"
                });
            } else {
                return res.status(500).json({
                  status: "internal server error",
                  message: "Ocurrió un error en el servidor"
                });
            }
        })
}

module.exports = {
    save,
    saveArticles,
    getAllArticles,
    getArticleById,
    getArticlesByCategory,
    getArticlesBySearcher,
    deleteById,
    update    
}