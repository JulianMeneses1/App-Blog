import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EditArticleRoutingModule } from './edit-article-routing.module';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    EditArticleRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class EditArticleModule { }
