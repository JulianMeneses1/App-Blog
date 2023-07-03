import { createAction, props } from "@ngrx/store";
import { ArticleModel } from "src/app/core/models/Article.interface";

export const loadAllArticles = createAction(
    '[Blog Page] Load all articles',
    props<{ page?: number, isScrolling?:boolean }>()
);

export const loadArticlesByCategory = createAction(
    '[Blog Page] Load articles by category',
    props<{ page?:number,category: string, isScrolling?:boolean }>()
);

export const loadArticlesBySearcher = createAction(
    '[Blog Page] Load articles by searcher',
    props<{  page?:number, search: string, isScrolling?:boolean }>()
);

// con props pasamos un argumento a la acción, en este caso un array de artículos bajo la propiedad articles
export const loadedAllArticles = createAction(
    '[Blog Page] Loaded all articles success',
    props<{ articles: ArticleModel[] }>()
);

export const loadedArticlesByCategory = createAction(
    '[Blog Page] Loaded articles by category success',
    props<{ articles: ArticleModel[], category : string }>()
);

export const loadedArticlesBySearcher = createAction(
    '[Blog Page] Loaded articles by searcher success',
    props<{ articles: ArticleModel[] }>()
);

export const loadedArticlesScrolling = createAction(
    '[Blog Page] Loaded scrolling success',
    props<{ articles: ArticleModel[] }>()
);

export const addArticle = createAction(
    '[Create Article Page] Add article',
    props<{ article: ArticleModel }>()
);

export const removeArticle = createAction(
    '[Blog Page] Remove article',
    props<{ id: number }>()
);

export const updateArticle = createAction(
    '[Blog Page] Update Article',
    props<{ article: ArticleModel }>()
);