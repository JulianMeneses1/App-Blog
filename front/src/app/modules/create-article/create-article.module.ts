import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateArticleRoutingModule } from './create-article-routing.module';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    CreateArticleRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class CreateArticleModule { }
