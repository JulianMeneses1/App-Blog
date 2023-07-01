const express = require("express");

// creamos la variable router de express para configurar cada ruta
const router = express.Router();

// acá creamos una variable para acceder a todos los métodos definidos en el controlador de article
const ArticleController = require("../controllers/articleController");

// con el ? hacemos que el parámetro de ruta sea opcional
router.get("/:quantity?",ArticleController.getAllArticles);

router.get("/category/:category/:quantity?",ArticleController.getArticlesByCategory);

router.get("/id/:id",ArticleController.getArticleById);

router.get("/search/:string",ArticleController.searcher);

router.post("",ArticleController.save);

router.post("/list", ArticleController.saveArticles);

router.delete("/:id",ArticleController.deleteById);

router.put("/:id",ArticleController.update);

module.exports = router;