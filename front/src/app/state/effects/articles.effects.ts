import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ArticlesService } from 'src/app/modules/blog/services/articles.service';

// Los efectos se encargan de interactuar con los servicios para así evitar que el componente llame al servicio para obtener la data.
// De esta forma el componente sólo escucha los cambios en los estados (select) y dispara acciones.
// El effecto está escuchando todas las acciones y en este caso, cuando se dispara la acción "Load Articles", llama al método getArticles del servicio
// y si todo sale bien dispara la otra acción de Loaded success, cambiando el estado de isLoading y de articles.
@Injectable()
export class ArticlesEffects {

  loadAllArticles$ = createEffect(() => this.actions$.pipe(
    ofType('[Blog Page] Load All Articles'),
    exhaustMap(({page}) => this.articlesService.getAllArticles(page)
      .pipe(
        map(data => { 
            sessionStorage.setItem('articles',JSON.stringify(data.docs));
            return { type: '[Blog Page] Loaded success', articles: data.docs }
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  loadArticlesByCategory$ = createEffect(() => this.actions$.pipe(
    ofType('[Blog Page] Load Articles By Category'),
    exhaustMap(({category, page}) => this.articlesService.getArticlesByCategory(category,page)
      .pipe(
        map(data => { 
            sessionStorage.setItem('articles',JSON.stringify(data.docs));
            return { type: '[Blog Page] Loaded success', articles: data.docs }
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  loadArticlesBySearcher$ = createEffect(() => this.actions$.pipe(
    ofType('[Blog Page] Load Articles By Searcher'),
    exhaustMap(({search,page}) => this.articlesService.getArticlesBySearcher(search,page)
      .pipe(
        map(data => { 
            sessionStorage.setItem('articles',JSON.stringify(data.docs));
            return { type: '[Blog Page] Loaded success', articles: data.docs }
        }),
        catchError(() => {
            sessionStorage.setItem('articles',JSON.stringify([]));
            return of({ type: '[Blog Page] Loaded success', articles: [] })
        })
      ))
    )
  );  

  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService
  ) {}
}