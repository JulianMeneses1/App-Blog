import { createReducer, on } from "@ngrx/store"
import { loadAllArticles, addArticle, removeArticle, updateArticle, loadArticlesByCategory, loadArticlesBySearcher, loadedAllArticles, 
        loadedArticlesByCategory, loadedArticlesBySearcher, onAddArticle, onRemoveArticle, onUpdateArticle } from "../actions/articles.actions"
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
    on(onAddArticle, ((state)=> {
        return {
            ...state,
            isLoading : true
        }
    })),
    on(onRemoveArticle, ((state)=> {
        return {
            ...state,
            isLoading : true
        }
    })),
    on(onUpdateArticle, ((state)=> {
        return {
            ...state,
            isLoading : true
        }
    })),
    on(addArticle, ((state, {article}) => {
        console.log(article.category)
        const updatedArticles = {
            ...state.articles,
            Todos: [...state.articles['Todos'], article],
            [article.category]: [...state.articles[article.category], article]
          };   
        sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
        return {...state, 
                isLoading : false,
                articles: updatedArticles
                }
        })
    ),
    on(removeArticle, ((state, {article}) => {
        
        const updatedArticles = {
            ...state.articles,
            Todos: [...state.articles['Todos'].filter(existingArticle => existingArticle._id!=article._id)],
            [article.category]: [...state.articles[article.category].filter(existingArticle => existingArticle._id!=article._id)]
          };   
        sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
        return {...state, 
                isLoading : false,
                articles: updatedArticles
                }
        })
    ),
    on(updateArticle, ((state, {article}) => {
        
        const updatedArticles = {
            ...state.articles,
            Todos: [...state.articles['Todos'].map(existingArticle => {
                if (existingArticle._id == article._id) {
                    return{
                        ...article
                    }
                };
                return existingArticle;
            })],
            [article.category]: [...state.articles['Todos'].map(existingArticle => {
                if (existingArticle._id == article._id) {
                    return{
                        ...article
                    }
                };
                return existingArticle;
            })]
          };   
        sessionStorage.setItem('articles',JSON.stringify(updatedArticles));
        return {...state, 
                isLoading : false,
                articles: updatedArticles
                }
        })
    )
   
)