import { Component, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/core/models/Article.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAllArticles, loadArticlesByCategory, loadArticlesBySearcher } from 'src/app/state/actions/articles.actions';
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
  articles$:Observable<ArticleModel[]> = new Observable();
  searcherVisible: boolean = false;
  search: string = '';
  editionMode: boolean = false;
  noArticleFound: boolean = false;
  idArticleSelected: string = '';
  page : number = 2;
  selectedLink: string = '';
  typeOfFilter: string = "all";

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(selectLoadingArticles);
    this.articles$ = this.store.select(selectListArticles);
  }

  ngOnInit():void { 
    // si articles no está definido los obtenemos de la bd   
    sessionStorage.getItem('articles') || this.store.dispatch(loadAllArticles({}));
    // si articles está definido pero está vacío (cuando no se encontró ningún artículo en el buscador) devolvemos el "Sin Resultados" 
    JSON.parse(sessionStorage.getItem('articles')!)?.length==0 && (this.noArticleFound = true);
    // para mantener el color activo de la categoría seleccionada
    sessionStorage.getItem('selectedLink') && (this.selectedLink = sessionStorage.getItem('selectedLink')!);
    // para mantener visible el buscador si estaba activo
    if (sessionStorage.getItem('search')) {
      this.searcherVisible = true;
      this.search = sessionStorage.getItem('search')!;
    }
  } 

  filterArticlesByCategory (category:string, page?:number) {
    this.store.dispatch(loadArticlesByCategory({category, page}))
    this.noArticleFound = false;
    this.typeOfFilter = category;
    this.removeSearch();
  }

  showAllArticles (page?:number) {
    this.store.dispatch(loadAllArticles({page}));
    this.noArticleFound = false;
    this.typeOfFilter = "all";
    this.removeSearch();
    this.selectedLink='';
    sessionStorage.removeItem('selectedLink');
  }

  filterArticlesBySearcher (event?:any, page?:number) {
    const search = event.target.value;
    if(search != "") {
      this.store.dispatch(loadArticlesBySearcher({search, page}));      
      this.articles$.subscribe((data) => {
        if (data.length == 0) {
          this.noArticleFound = true;
        } else {
          this.noArticleFound = false;
        }
      }) 
      this.typeOfFilter = search; 
      sessionStorage.setItem('search',search); 
      sessionStorage.removeItem('selectedLink');
      this.selectedLink= ''
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

   onScrollDown () {
    switch (this.typeOfFilter) {
      case "all":
        console.log(this.page)
        this.showAllArticles(this.page);
        break;
        case "Política":
        case "Deportes":
        case "Economía":
        case "Medioambiente":
        case "Vacaciones":
        console.log(this.typeOfFilter)
        this.filterArticlesByCategory(this.typeOfFilter, this.page)
        break;
      default:
        this.filterArticlesBySearcher(this.typeOfFilter)
    }
    this.page += 1;
   }

   changeLinkColor(link: string) {
    this.selectedLink = link;
    sessionStorage.setItem('selectedLink',link);
  }
}