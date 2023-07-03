import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { Observable, map, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAllArticles, loadArticlesBySearcher, loadArticlesByCategory } from 'src/app/state/actions/articles.actions';
import { selectListArticles, selectLoadingArticles } from 'src/app/state/selectors/articles.selector';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  // el $ indica que la variable va a ser de tipo observable 
  isLoading$: Observable<boolean> = new Observable();
  articles$:Observable<any> = new Observable();
  searcherVisible: boolean = false;
  search: string = '';
  editionMode: boolean = false;
  noArticleFound: boolean = false;
  idArticleSelected: string = '';
  selectedLink: string = 'todos';
  page:number = 2;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(selectLoadingArticles);
    this.articles$ = this.store.select(selectListArticles);
  }

  ngOnInit():void { 
    // si articles no está definido los obtenemos de la bd   
    sessionStorage.getItem('articles') || this.store.dispatch(loadAllArticles({}));
    this.articles$=this.store.select(selectListArticles).pipe(
      map(type => sessionStorage.getItem('typeOfFilter') ? type[sessionStorage.getItem('typeOfFilter')!] : type['Todos'])
    ); 
    // si articles está definido pero está vacío (cuando no se encontró ningún artículo en el buscador) devolvemos el "Sin Resultados" 
    JSON.parse(sessionStorage.getItem('articles')!).Búsqueda?.length==0 && (this.noArticleFound = true);
    // para mantener el color activo de la categoría seleccionada
    sessionStorage.getItem('selectedLink') && (this.selectedLink = sessionStorage.getItem('selectedLink')!);
    // para mantener visible el buscador si estaba activo
    if (sessionStorage.getItem('search')) {
      this.searcherVisible = true;
      this.search = sessionStorage.getItem('search')!;
    }
  }

  filterArticlesByCategory (category:string) {
    if(!(JSON.parse(sessionStorage.getItem('articles')!).category)) {
      this.store.dispatch(loadArticlesByCategory({category}))
    }      
    this.articles$=this.store.select(selectListArticles).pipe(
      map(type => type[category])
    );  
    this.noArticleFound = false;
    this.removeSearch();
    sessionStorage.setItem('typeOfFilter',category)
  }

  showAllArticles () {
    this.articles$=this.store.select(selectListArticles).pipe(
      map(type => type['Todos'])
    ); 
    this.noArticleFound = false;
    this.removeSearch();
    sessionStorage.setItem('typeOfFilter','Todos');
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
      sessionStorage.setItem('typeOfFilter','Búsqueda');
      sessionStorage.removeItem('selectedLink');
    }   
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
  }

  toggleEdition (article: ArticleModel) {
    if (this.idArticleSelected === article._id) {
      this.editionMode = !this.editionMode;
    } else {
      this.editionMode = true;
      this.idArticleSelected = article._id!;
    }
  }
  changeLinkColor(link: string) {
    this.selectedLink = link;
    sessionStorage.setItem('selectedLink',link);
  }
}