import { Directive,  HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appMenuScroll]'
})
export class MenuScrollDirective {

  constructor() { }

  lastYScroll:number = window.scrollY 
 
  @HostBinding('class.hide-menu') toggleHide!:boolean
  @HostBinding('class.animation-menu') toggleAnimation!:boolean

  @HostListener('window:scroll') onScroll (){ 
   
    if (this.lastYScroll<window.scrollY) {
      this.toggleAnimation = false        
      this.toggleHide = true        
    } else {      
      this.toggleAnimation=true
      this.toggleHide = false    
    }
    this.lastYScroll = window.scrollY
  }
}


