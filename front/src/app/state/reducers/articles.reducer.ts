import { createReducer, on } from "@ngrx/store"
import { loadAllArticles, loadArticlesByCategory, loadArticlesBySearcher, loadedArticles } from "../actions/articles.actions"
import { ArticlesState } from "src/app/core/models/Articles.state.interface"

const initialArticles = JSON.parse(sessionStorage.getItem('articles')!) || []

export const initialState: ArticlesState = { isLoading: false, articles : initialArticles } 

export const articlesReducer = createReducer(
    initialState,
    on(loadAllArticles, (state) => ({...state, isLoading : true})),
    on(loadArticlesByCategory, (state) => ({...state, isLoading : true})),
    on(loadArticlesBySearcher, (state) => ({...state, isLoading : true})),
    // para acceder al argumento que le pasamos en la acción hay que desestructurarlo con el nombre que le asignamos al argumento
    on(loadedArticles, ((state, {articles}) => {
        return {...state, 
                isLoading : false,
                articles};
        })
    )  
)