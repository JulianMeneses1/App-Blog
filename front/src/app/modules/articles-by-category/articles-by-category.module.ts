import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesByCategoryRoutingModule } from './articles-by-category-routing.module';
import { ArticlesByCategoryComponent } from './pages/articles-by-category/articles-by-category.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ArticlesByCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesByCategoryRoutingModule
  ]
})
export class ArticlesByCategoryModule { }
