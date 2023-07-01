import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesByCategoryComponent } from './pages/articles-by-category/articles-by-category.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesByCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesByCategoryRoutingModule { }
