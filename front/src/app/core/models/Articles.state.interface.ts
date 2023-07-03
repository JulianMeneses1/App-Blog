import { ArticleModel } from "./Article.interface";

export interface ArticlesState {
    isLoading:boolean,
    articles: ArticleModel[]
}