import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAllArticles, loadArticlesBySearcher, loadArticlesByCategory, onRemoveArticle } from 'src/app/state/actions/articles.actions';
import { selectListArticles, selectLoadingArticles } from 'src/app/state/selectors/articles.selector';
import { AppState } from 'src/app/state/app.state';
import { ArticlesService } from '../../services/articles.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-filter-collapsed',
  templateUrl: './filter-collapsed.component.html',
  styleUrls: ['./filter-collapsed.component.css']
})
export class FilterCollapsedComponent {


    // el $ indica que la variable va a ser de tipo observable 
    isLoading$: Observable<boolean> = new Observable();
    isLoadingScrolling: boolean = false;
    articles$:Observable<any> = new Observable();
    articlesScrolling : ArticleModel[] = [];
    searcherVisible: boolean = false;
    search: string = '';
    editionMode: boolean = false;
    noArticleFound: boolean = false;
    idArticleSelected: string = '';
    selectedLink: string = '';
    page:number = 2;
    typeOfFilter: string = '';
    moreData: boolean = true;
    scrollHeight = 500;
    showButton = false;
  
    constructor(private store: Store<AppState>, 
                private articlesService : ArticlesService,
                @Inject(DOCUMENT) private document: Document) {
      this.isLoading$ = this.store.select(selectLoadingArticles);
      this.articles$ = this.store.select(selectListArticles);
    }
    ngOnInit() {

// si articles no está definido lo obtenemos de la bd   
sessionStorage.getItem('articles') || this.store.dispatch(loadAllArticles({}));
this.typeOfFilter = sessionStorage.getItem('typeOfFilter')! || 'Todos';
this.articles$=this.store.select(selectListArticles).pipe(      
  map(type => this.typeOfFilter ? type[this.typeOfFilter] : type['Todos'])
);     
// si articles está definido pero no hay artículos en el campo búsqueda (cuando no se encontró ningún artículo en el buscador) 
// y search posee una búsqueda devolvemos el "Sin Resultados" 
const articlesData = JSON.parse(sessionStorage.getItem('articles')!);
if (articlesData && articlesData.Búsqueda?.length === 0 && sessionStorage.getItem('search')) {
  this.noArticleFound = true;
}
// para mantener el color activo de la categoría seleccionada
sessionStorage.getItem('selectedLink') && (this.selectedLink = sessionStorage.getItem('selectedLink')!);
// para mantener visible el buscador si estaba activo
if (sessionStorage.getItem('search')) {
  this.searcherVisible = true;
  this.search = sessionStorage.getItem('search')!;
}

    }

    filterArticles(event:any) {
      const category = event.target.value
      this.articles$=this.store.select(selectListArticles).pipe(
        map(type => type[category])
      ); 
      this.resetVariables('Todos');    
      this.removeSearch();   
    }

filterArticlesByCategory (category:string) {
if((JSON.parse(sessionStorage.getItem('articles')!)[category]).length==0) {     
  this.store.dispatch(loadArticlesByCategory({category}))
}      
this.articles$=this.store.select(selectListArticles).pipe(
  map(type => type[category])
);  
this.removeSearch();
this.resetVariables(category);   
}

showAllArticles () {
this.articles$=this.store.select(selectListArticles).pipe(
  map(type => type['Todos'])
); 
this.resetVariables('Todos');    
this.removeSearch();   
}

filterArticlesBySearcher (event:any) {
const search = event.target.value;
if(search != "") {
  this.store.dispatch(loadArticlesBySearcher({search}))
  this.articles$=this.store.select(selectListArticles).pipe(
    map(type => type['Búsqueda'])
  );      
  this.articles$.subscribe((data) => {    
    if (data.length == 0) {
      this.noArticleFound = true;
    } else {
      this.noArticleFound = false;
    }
  }) 
  this.selectedLink= '';  
  sessionStorage.setItem('search',search);
  this.search = search;
  sessionStorage.setItem('typeOfFilter','Búsqueda');
  sessionStorage.removeItem('selectedLink');
  this.typeOfFilter = search;
  this.page= 2;
  this.articlesScrolling = [];
  this.moreData=true;
}   
}

resetVariables (filter: string) {
this.noArticleFound = false;
this.page= 2;
this.articlesScrolling = [];
this.typeOfFilter = filter;
sessionStorage.setItem('typeOfFilter', filter);
this.moreData = true;
}

removeSearch () {
sessionStorage.removeItem('search');
this.search= '';
this.searcherVisible= false;
}

toggleSearcher () {
this.searcherVisible = !this.searcherVisible;
this.search='';
sessionStorage.removeItem('search');
sessionStorage.removeItem('selectedLink');
this.selectedLink= '';
}

toggleEdition (article: ArticleModel) {
if (this.idArticleSelected === article._id) {
  this.editionMode = !this.editionMode;
} else {
  this.editionMode = true;
  this.idArticleSelected = article._id!;
}
}

onScrollDown() {    
if (this.moreData) {
  switch (this.typeOfFilter) {      
    case "Todos":          
      this.isLoadingScrolling = true;
      this.articlesService.getAllArticles(this.page).subscribe((data) => {
        this.addArticlesScrolling(data, 'Todos');
      }); 
      break;
    case "Política":
    case "Economía":
    case "Medioambiente":
    case "Deportes":
    case "Vacaciones":
        this.isLoadingScrolling = true;
        this.articlesService.getArticlesByCategory(this.typeOfFilter,this.page).subscribe((data) => {
          this.addArticlesScrolling(data, this.typeOfFilter);      
        });
        break;
      default:
        this.isLoadingScrolling = true;
        this.articlesService.getArticlesBySearcher(this.search,this.page).subscribe((data) => {
          this.addArticlesScrolling(data, 'Búsqueda');         
        })
    }
}
}

addArticlesScrolling (data:any, filter: string) {
this.articlesScrolling = this.articlesScrolling.concat(data.docs);
this.articles$ = this.store.select(selectListArticles).pipe(
  map(type => type[filter].concat(this.articlesScrolling))
);
(data.page == data.totalPages || data.totalPages == 1) && (this.moreData=false);     
this.isLoadingScrolling = false;
this.page += 1;
}

changeLinkColor(link: string) {
this.selectedLink = link;
sessionStorage.setItem('selectedLink',link);
}

onDeleteArticle(id: string) {
Swal.fire({
  title:'¿Está seguro que quiere eliminar este artículo?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  cancelButtonText: 'Cancelar',
  confirmButtonText: 'Confirmar'
}).then((result) => {
  if (result.isConfirmed) {
    this.store.dispatch(onRemoveArticle({id}));
    this.articlesScrolling= this.articlesScrolling.filter(article=> article._id != id);
    this.editionMode=false;
  }     
})
}

@HostListener('window:scroll')
onWindowScroll():void {
const yOffSet = window.scrollY;
const scrollTop = this.document.documentElement.scrollTop;
this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
}

scrollTop(): void {
this.document.documentElement.scrollTop = 0;
}
}
