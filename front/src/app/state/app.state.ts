import { ActionReducerMap } from "@ngrx/store";
import { ArticlesState } from "../core/models/Articles.state.interface";
import { articlesReducer } from "./reducers/articles.reducer";

// acá vamos a poner todos los estados de la aplicación, en este caso sólo tenemos el estado de los artículos
export interface AppState {
    articles: ArticlesState
}

// luego exportamos cada estado con su respectivo reducer, esto es lo que usamos en StoreModule.forRoot en el app.module
export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    articles: articlesReducer 
  }