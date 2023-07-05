import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { specialValidators } from 'src/app/helpers/validations';
import { FilesService } from 'src/app/modules/blog/services/files.service';
import { Store } from '@ngrx/store';
import { onAddArticle } from 'src/app/state/actions/articles.actions';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit{
  articleForm!: FormGroup;
  invalidForm: boolean = false;
  article!: ArticleModel;
  actualDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  actualStrDate: string = this.pd.transform(this.actualDate,"yyyy-MM-dd") || '';
  faCircleCheck= faCircleCheck;
  peopleSubscription?: Subscription;
  maxSize:number = 4000000;
  errorImage:boolean = false;
  urlUploadedImage = '';
  isLoading:boolean = false;

  constructor(private formBuilder: FormBuilder,
              private filesService: FilesService,
              private store: Store<any>,
              private pd:DatePipe) 
  { }

  ngOnInit ():void {
    this.articleForm = this.formBuilder.group({
      title: ['',[Validators.required, Validators.minLength(10)]],
      content: ['',[Validators.required, Validators.minLength(10)]],
      created: ['',[Validators.required, specialValidators.validateDate]],
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
      this.articleForm.get('image')!.setValue(this.urlUploadedImage);
      this.store.dispatch(onAddArticle({article:this.articleForm.value}));
      this.resetForm();       
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
      if (file.size > 4000000) {
        this.errorImage=true;
        this.urlUploadedImage='';
        return;
      }     
      this.isLoading = true;
      const formData = new FormData();
      formData.append('file', file);
      this.filesService.uploadImage(formData).subscribe(
        {
          next: (data) => {
          this.urlUploadedImage = data.url;
          this.errorImage = false;
          this.isLoading = false;
        }, error: (error) => {
          this.isLoading = false;
          throw error;
          }}
        );        
      }                        
  }
}