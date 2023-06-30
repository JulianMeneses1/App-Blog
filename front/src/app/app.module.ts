import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeModule } from './modules/home/home.module';
import { CreateArticleModule } from './modules/create-article/create-article.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuScrollDirective } from './shared/header/directives/menu-scroll.directive';
import { BlogModule } from './modules/blog/blog.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuScrollDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlogModule,
    HomeModule,
    FontAwesomeModule,
    CreateArticleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
