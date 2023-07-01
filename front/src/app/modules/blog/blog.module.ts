import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './pages/blog/blog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,    
    BlogRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class BlogModule { }
