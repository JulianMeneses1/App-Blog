import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { ArticlesService } from 'src/app/modules/blog/services/articles.service';

@Component({
  selector: 'app-articles-by-category',
  templateUrl: './articles-by-category.component.html',
  styleUrls: ['./articles-by-category.component.css']
})
export class ArticlesByCategoryComponent {
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
}
