import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { specialValidators } from 'src/app/helpers/validations';
import { FilesService } from 'src/app/modules/blog/services/files.service';
import { Store } from '@ngrx/store';
import { loadAllArticles, loadArticlesByCategory, onAddArticle } from 'src/app/state/actions/articles.actions';
import { selectLoadingArticles } from 'src/app/state/selectors/articles.selector';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit{
  articleForm!: FormGroup;
  invalidForm: boolean = false;
  actualDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  actualStrDate: string = this.pd.transform(this.actualDate,"yyyy-MM-dd") || '';
  maxSize:number = 4000000;
  errorImage:boolean = false;
  urlUploadedImage = '';
  isLoadingImage:boolean = false;
  isLoading$: Observable<boolean> = new Observable();

  constructor(private formBuilder: FormBuilder,
              private filesService: FilesService,
              private store: Store<any>,
              private pd:DatePipe) 
  {
      this.isLoading$ = this.store.select(selectLoadingArticles);
  }

  ngOnInit ():void {
    this.articleForm = this.formBuilder.group({
      title: ['',[Validators.required, Validators.minLength(10)]],
      content: ['',[Validators.required, Validators.minLength(100)]],
      created: [this.actualStrDate,[Validators.required, specialValidators.validateDate]],
      category: ['', [Validators.required]],
      image: ['',[Validators.required]]
    })
  }
  
  resetForm () {        
      this.articleForm.reset();
      this.invalidForm = false;
      this.errorImage = false; 
      this.urlUploadedImage='';
  } 

  onSubmit ():void {
    if(this.articleForm.invalid) { 
      this.invalidForm=true;
    } else { 
      const articleFormData = {
        ...this.articleForm.value,
        image: this.urlUploadedImage
      }  
      if(!sessionStorage.getItem('articles')) {
        this.store.dispatch(loadAllArticles({}));
        this.store.dispatch(loadArticlesByCategory({category:articleFormData.category}));
        this.store.dispatch(onAddArticle({article:articleFormData}));
      } else if (JSON.parse(sessionStorage?.getItem('articles')!)[articleFormData.category].length==0 ) {
        this.store.dispatch(loadArticlesByCategory({category:articleFormData.category}));
        this.store.dispatch(onAddArticle({article:articleFormData}));
      } else {
        this.store.dispatch(onAddArticle({article:articleFormData}));
      }      
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