import { createReducer, on } from "@ngrx/store"
import { loadAllArticles, loadArticlesByCategory, loadArticlesBySearcher, loadedAllArticles, loadedArticlesByCategory, loadedArticlesBySearcher } from "../actions/articles.actions"
import { ArticlesState } from "src/app/core/models/Articles.state.interface"

const initialArticles = JSON.parse(sessionStorage.getItem('articles')!) || {
    Todos:[],
    Política:[],
    Deportes:[],
    Economía:[],
    Medioambiente:[],
    Vacaciones:[],
    Búsqueda:[]
}

export const initialState: ArticlesState = { isLoading: false, articles : initialArticles } 

export const articlesReducer = createReducer(
    initialState,
    on(loadAllArticles, (state) => ({...state, isLoading : true})),
    on(loadArticlesByCategory, (state) => ({...state, isLoading : true})),
    on(loadArticlesBySearcher, (state) => ({...state, isLoading : true})),
    // para acceder al argumento que le pasamos en la acción hay que desestructurarlo con el nombre que le asignamos al argumento
    on(loadedAllArticles, ((state, {articles}) => {
        const updatedArticles = {
            ...state.articles,
            Todos: articles
          };
        sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
        return {...state, 
                isLoading : false,
                articles: updatedArticles
                }
        })
    ),
    on(loadedArticlesByCategory, ((state, {articles, category}) => {
        const updatedArticles = {
            ...state.articles,
            [category]: articles
          };
        sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
        return {...state, 
                isLoading : false,
                articles: updatedArticles
                }
        })
    ),
    on(loadedArticlesBySearcher, ((state, {articles}) => {
        const updatedArticles = {
            ...state.articles,
            Búsqueda: articles
          };
        sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
        return {...state, 
                isLoading : false,
                articles: updatedArticles
                }
        })
    ),
    // on(loadedAllArticlesScrolling, ((state, {articles}) => { 
    //     const updatedArticles = {
    //         ...state.articlesScrolling,
    //         TodosScrolling: state.articlesScrolling['TodosScrolling'].concat(articles),
    //         };              
    //     return {
    //         ...state, 
    //         isLoading: false,
    //         articles: updatedArticles
    //         }
    //     })   
    // ),
    
    // on(loadedArticlesByCategoryScrolling, ((state, {articles, category}) => { 
        
    //     const updatedArticles = {
    //         ...state.articles,
    //         [category]: state.articles[category].concat(articles),
    //         };              
    //     return {
    //         ...state, 
    //         isLoading: false,
    //         articles: updatedArticles
    //         }        
    //     })
    // ) 
)