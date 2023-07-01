import { Component } from '@angular/core';
import { ArticlesService } from 'src/app/modules/blog/services/articles.service';

@Component({
  selector: 'app-nav-categories',
  templateUrl: './nav-categories.component.html',
  styleUrls: ['./nav-categories.component.css']
})
export class NavCategoriesComponent {

  constructor(private articlesService: ArticlesService) { }

  filterArticles (category:string) {
    this.articlesService.getArticlesByCategory(category).subscribe(
      data => {
        this.articlesService.updateArticles(data.articles);
      })
  }

  showAllArticles () {
    this.articlesService.setStorage();
  }
}
