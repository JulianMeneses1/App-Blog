import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleDetailsRoutingModule } from './article-details-routing.module';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';


@NgModule({
  declarations: [
    ArticleDetailsComponent
  ],
  imports: [
    CommonModule,
    ArticleDetailsRoutingModule
  ]
})
export class ArticleDetailsModule { }
