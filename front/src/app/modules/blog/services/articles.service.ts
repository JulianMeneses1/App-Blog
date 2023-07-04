import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient) { }

  private url:string = environment.url+'articles/';

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type':'application/json'
    })
  }  

  public getAllArticles (page?:number):Observable <any> {    
    return this.httpClient.get<any>(this.url + '/' + page);
  }

  public getArticlesByCategory(category:string, page?:number):Observable<any>{
    return this.httpClient.get<any>(this.url+'category/' + category + '/' +page)
  }

  public getArticlesBySearcher (search:string, page?:number): Observable<any> {
    return this.httpClient.get<any>(this.url+'search/'+ search + '/'+page)
  }

  public getArticleById (id:number): Observable<any> {
    return this.httpClient.get<any>(this.url+'id/'+id)
  }

  public addArticle (article: ArticleModel):Observable <ArticleModel> {
    return this.httpClient.post<ArticleModel>(this.url,article,this.httpOptions);
  }

  public updatePerson (article: ArticleModel): Observable <ArticleModel> {
    return this.httpClient.put<ArticleModel>(this.url+article._id,article,this.httpOptions);
  }

  public  deletePerson (id: number) :Observable <ArticleModel> {
    return this.httpClient.delete<ArticleModel>(this.url+id);
  }
}

