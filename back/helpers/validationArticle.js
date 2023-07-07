const validator = require("validator");

const validateArticle = (article) => {    
    let validate_title = !validator.isEmpty(article.title) && validator.isLength(article.title, {min: 10, max: 80});
    let validate_content = !validator.isEmpty(article.content) && validator.isLength(article.content, {min: 100, max: 5000});
    let validate_category = !validator.isEmpty(article.category);
    let validate_image = !validator.isEmpty(article.image);

    if (!validate_title || !validate_content || !validate_category || !validate_image) {
        throw new Error("Campos inválidos");
    }   
}

module.exports = {
    validateArticle
}