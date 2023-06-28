const express = require("express");

const router = express.Router();
const CategoryController = require("../controllers/categoryController");

router.get("",CategoryController.getCategories);

router.post("",CategoryController.save);

router.delete("/:id",CategoryController.deleteById);

module.exports = router;