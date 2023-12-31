import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';



const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'create-article',
    loadChildren: () =>
      import('./modules/create-article/create-article.module').then((m) => m.CreateArticleModule)
  },
  {
    path: 'edit-article/:id',
    loadChildren: () => 
      import ('./modules/edit-article/edit-article.module').then((m)=> m.EditArticleModule)
  },
  {
    path: 'article-details/:id',
    loadChildren: () =>
      import('./modules/article-details/article-details.module').then((m) => m.ArticleDetailsModule)
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/blog/blog.module').then((m) => m.BlogModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },  
  {
    path:'**', 
    redirectTo: '/home', 
    pathMatch: 'full'
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
