import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: 'blog',
    loadChildren: () =>
      import('./modules/articles/articles.module').then((m) => m.ArticlesModule)
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
