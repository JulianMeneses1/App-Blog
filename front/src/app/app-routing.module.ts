import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';

const blogOrCategoryMatcher = (segments: UrlSegment[]): UrlMatchResult | null => {
  if (segments.length === 1 && segments[0].path === 'blog') {
    return { consumed: segments };
  } else if (segments.length === 2 && segments[0].path === 'categories') {
    return { consumed: segments };
  } else {
    return null;
  }
};

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
    matcher: blogOrCategoryMatcher,
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
