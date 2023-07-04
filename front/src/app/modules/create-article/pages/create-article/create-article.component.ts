import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { Router } from '@angular/router';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { specialValidators, phonePattern, adressPattern, countryPattern } from 'src/app/helpers/validations';

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

  constructor(private formBuilder: FormBuilder,
              private route: Router,
              private pd:DatePipe) 
  { }

  ngOnInit ():void {
    this.articleForm = this.formBuilder.group({
      title: ['',[Validators.required, Validators.minLength(10)]],
      content: ['',[Validators.required, Validators.minLength(500)]],
      created: ['',[Validators.required]],
      image: ['',[Validators.required]]
    })
  }
  
  resetForm () {        
      this.articleForm.reset();
      this.invalidForm = false  
  } 

  onSubmit ():void {
    if(this.articleForm.invalid) {    
      this.invalidForm=true;
    } else {   
      // this.person = this.createPersonForm.value;     
      // this.peopleService.addPerson(this.person).subscribe( 
      //   {
      //     next: (person) => {
      //       this.people.push(person);        
      //       this.peopleService.updatePeople(this.people);
      //       this.createPersonForm.reset();
      //       this.invalidForm = false;
      //       $('#confirmation-modal').modal('show')
      //       this.route.navigate(['/home'])                  
      //     }, error: () => {
      //       alert('Error: No se pudo crear la persona, por favor intente nuevamente')
      //     }
      //   }
      // )  
    }    
  }

  hideErrorMessage () {       
    this.invalidForm=false
  }  



}