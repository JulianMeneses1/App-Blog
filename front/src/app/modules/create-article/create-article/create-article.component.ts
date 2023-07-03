import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {
  count$!: Observable<object>;
  counter: number = 0;
  decounter: number = 0;


  constructor (private store: Store<{ count: object}>) {
    
    }




}