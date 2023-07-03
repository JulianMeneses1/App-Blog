import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateArticleRoutingModule } from './create-article-routing.module';
import { CreateArticleComponent } from './create-article/create-article.component';


@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    CreateArticleRoutingModule
  ]
})
export class CreateArticleModule { }
