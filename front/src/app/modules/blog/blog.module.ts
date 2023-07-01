import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './pages/blog/blog.component';

@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,    
    BlogRoutingModule
  ],
  providers: [
    DatePipe
  ]
})
export class BlogModule { }
