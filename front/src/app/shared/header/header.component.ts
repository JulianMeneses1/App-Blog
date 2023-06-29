import { Component } from '@angular/core';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
declare var $: any;  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faBars = faBars;
  faX = faX; 
  visibleScroll:boolean=true;

  closeMenuDelay () {
    if(window.innerHeight>=600) {
      setTimeout(this.closeMenu,400)
      } else { setTimeout(this.closeMenu, 800)
    } 
  }

  closeMenu () {
    $("#collapsedMenu").modal('hide')
  }

}
