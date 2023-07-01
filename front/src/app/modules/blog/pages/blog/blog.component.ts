import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles: ArticleModel[] = [];
  articlesSubscription?: Subscription;
  searcherVisible: boolean = false;
  editionMode: boolean = false;
  noArticleFound: boolean = false;
  idArticleSelected: string = "";

  constructor(private articlesService: ArticlesService) {
    this.articlesSubscription = this.articlesService.onUpdateArticles().subscribe(
      data => this.articles = data)
  }

  ngOnInit():void {
    sessionStorage.getItem('articles')
    ? this.articles = JSON.parse(sessionStorage.getItem('articles')!)
    : this.articlesService.setStorage();
  } 

  filterArticles (category:string) {
    this.articlesService.getArticlesByCategory(category).subscribe(
      data => {
        this.articlesService.updateArticles(data.articles);
        this.noArticleFound = false;
      })
  }

  showAllArticles () {
    this.articlesService.setStorage();
    this.noArticleFound = false;
  }

  toggleSearcher () {
    this.searcherVisible = !this.searcherVisible;
  }

  onEnter (event:any) {
    if(event.target.value != "") {
      this.articlesService.getArticleBySearcher(event.target.value).subscribe({
        next: (data => {
          this.articles = data.articles;
          this.noArticleFound = false;
        }), error: (() => this.noArticleFound = true)
      })
    }   
  }

  toggleEdition (article: ArticleModel) {
    this.editionMode = !this.editionMode;
    this.idArticleSelected = article._id!;
  }

}