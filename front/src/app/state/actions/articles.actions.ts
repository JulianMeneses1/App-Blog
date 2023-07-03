import { createAction, props } from "@ngrx/store";
import { ArticleModel } from "src/app/core/models/Article.interface";

export const loadAllArticles = createAction(
    '[Blog Page] Load All Articles',
    props<{ page?: number }>()
);

export const loadArticlesByCategory = createAction(
    '[Blog Page] Load Articles By Category',
    props<{ category: string, page?:number }>()
);

export const loadArticlesBySearcher = createAction(
    '[Blog Page] Load Articles By Searcher',
    props<{ search: string, page?:number }>()
);

// con props pasamos un argumento a la acción, en este caso un array de artículos bajo la propiedad articles
export const loadedArticles = createAction(
    '[Blog Page] Loaded success',
    props<{ articles: ArticleModel[] }>()
);

export const addArticle = createAction(
    '[Create Article Page] Add Article',
    props<{ article: ArticleModel }>()
);

export const removeArticle = createAction(
    '[Blog Page] Remove Article',
    props<{ id: number }>()
);

export const updateArticle = createAction(
    '[Blog Page] Update Article',
    props<{ article: ArticleModel }>()
);