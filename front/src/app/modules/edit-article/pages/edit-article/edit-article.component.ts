import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { DatePipe } from '@angular/common';
import { specialValidators } from 'src/app/helpers/validations';
import { FilesService } from 'src/app/modules/blog/services/files.service';
import { Store } from '@ngrx/store';
import { onUpdateArticle } from 'src/app/state/actions/articles.actions';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/modules/blog/services/articles.service';
import { Observable } from 'rxjs';
import { selectLoadingArticles } from 'src/app/state/selectors/articles.selector';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  articleForm!: FormGroup;
  invalidForm: boolean = false;
  article!: ArticleModel;
  actualDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  actualStrDate: string = this.pd.transform(this.actualDate,"yyyy-MM-dd") || '';
  maxSize:number = 4000000;
  errorImage:boolean = false;
  urlUploadedImage = '';
  isLoadingImage:boolean = false;
  isLoading$: Observable<boolean> = new Observable();

  constructor(private formBuilder: FormBuilder,
              private filesService: FilesService,
              private articlesService: ArticlesService,
              private store: Store<any>,
              private pd:DatePipe,
              private route: ActivatedRoute) 
    { 
      this.isLoading$ = this.store.select(selectLoadingArticles);
    }

  ngOnInit ():void {
    this.articleForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(100)]],
      created: ['', [Validators.required, specialValidators.validateDate]],
      category: ['', [Validators.required]],
      image: ['']
    });

    this.route.params.subscribe(params => {
      this.isLoadingImage = true;
      this.articlesService.getArticleById(params['id']).subscribe(data => {
        this.article = data;
        this.isLoadingImage = false;
        this.urlUploadedImage = this.article.image;
        this.articleForm.patchValue({
          title: this.article.title,
          content: this.article.content,
          created: this.pd.transform(this.article.created, 'yyyy-MM-dd'),
          category: this.article.category
        });
      });
    });
  }

  onSubmit ():void {    
    if(this.articleForm.invalid) {
      console.log("asdsa") 
      this.invalidForm=true;
    } else {
      const articleFormData = {
        ...this.articleForm.value,
        image: this.urlUploadedImage,
        _id: this.article._id
      }    
      this.store.dispatch(onUpdateArticle({article:articleFormData}));   
    }    
  }

  hideErrorMessage () {       
    this.invalidForm=false
  }  

  uploadImage (event:any) {              
    const file = event.target.files[0]; 
    if (!file) {
        this.urlUploadedImage = '';
        return;
    } 
    if (file) {
      if (file.size > this.maxSize) {
        this.errorImage=true;
        this.urlUploadedImage='';
        return;
      }     
      this.isLoadingImage = true;
      const formData = new FormData();
      formData.append('file', file);
      this.filesService.uploadImage(formData).subscribe(
        {
          next: (data) => {
          this.urlUploadedImage = data.url;
          this.errorImage = false;
          this.isLoadingImage = false;
        }, error: (error) => {
          this.isLoadingImage = false;
          throw error;
          }}
        );        
      }                        
  }
}
