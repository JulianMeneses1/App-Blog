import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ArticlesState } from "src/app/core/models/Articles.state.interface";

export const selectArticlesFeature = (state: AppState) => state.articles;

// acá agregamos cada uno de los estados a los que vamos a acceder
export const selectListArticles = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.articles
);

export const selectLoadingArticles = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.isLoading
);