import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuScrollDirective } from './header/directives/menu-scroll.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    MenuScrollDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FontAwesomeModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
