import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/modules/blog/services/articles.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article!:any;
  isLoading:boolean = false;

  constructor(private articlesService : ArticlesService,
              private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.isLoading=true;
      this.articlesService.getArticleById(params['id']).subscribe(data => {
        this.article=data;     
        this.isLoading=false;
      })
    })  
  }

}
