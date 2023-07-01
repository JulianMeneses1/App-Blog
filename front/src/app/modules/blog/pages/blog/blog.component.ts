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

  constructor(private articlesService: ArticlesService) {
    this.articlesSubscription = this.articlesService.onUpdateArticles().subscribe(
      data => this.articles = data)
  }

  ngOnInit():void {
    sessionStorage.getItem('articles')
    ? this.articles = JSON.parse(sessionStorage.getItem('articles')!)
    : this.articlesService.setStorage();
  }

  filterArticles () {
   
  }

  showAllArticles () {
    this.articlesService.setStorage();
  }

}
