import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient: HttpClient) { }

  private url:string = environment.url+'articles/';

  private subjectUpdateArticles = new Subject<ArticleModel[]>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }  

  public onUpdateArticles():Observable<ArticleModel[]>{
    return this.subjectUpdateArticles.asObservable();
  }

  public updateArticles(articles:ArticleModel[]):void {    
    this.subjectUpdateArticles.next(articles); 
    sessionStorage.setItem('articles',JSON.stringify(articles));  
  }

  public setStorage():void {
    this.getArticles().subscribe(data => {
      sessionStorage.setItem('articles',JSON.stringify(data.articles));      
      this.subjectUpdateArticles.next(data.articles);
    })      
  }

  public getArticles ():Observable <any> {    
    return this.httpClient.get<any>(this.url);
  }

  public getArticlesByCategory(category:string):Observable<any>{
    return this.httpClient.get<any>(this.url+'category/'+category)
  }

  public getArticleBySearcher (string:string): Observable<any> {
    return this.httpClient.get<any>(this.url+'search/'+string)
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

