import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, delay } from 'rxjs/operators';
import { ArticlesService } from 'src/app/modules/blog/services/articles.service';

// Los efectos se encargan de interactuar con los servicios para así evitar que el componente llame al servicio para obtener la data.
// De esta forma el componente sólo escucha los cambios en los estados (select) y dispara acciones.
// El effecto está escuchando todas las acciones y en este caso, cuando se dispara la acción "Load Articles", llama al método getArticles del servicio
// y si todo sale bien dispara la otra acción de Loaded success, cambiando el estado de isLoading y de articles.
@Injectable()
export class ArticlesEffects {

  loadAllArticles$ = createEffect(() => this.actions$.pipe(
    ofType('[Blog Page] Load all articles'),
    exhaustMap(({page, isScrolling}) => this.articlesService.getAllArticles(page)
      .pipe(
        delay(2000),
        map(data => { 
            if(isScrolling) {              
              return { type: '[Blog Page] Loaded all articles scrolling success', articles: data.docs }
            } 
            return { type: '[Blog Page] Loaded all articles success', articles: data.docs }
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  loadArticlesByCategory$ = createEffect(() => this.actions$.pipe(
    ofType('[Blog Page] Load articles by category'),
    exhaustMap(({category, page, isScrolling}) => this.articlesService.getArticlesByCategory(category,page)
      .pipe(
        map(data => { 
          if(isScrolling) {
            return { type: '[Blog Page] Loaded articles by categories scrolling success', articles: data.docs, category: `${category}Scrolling` }
          }
          return { type: '[Blog Page] Loaded articles by category success', articles: data.docs, category }
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  loadArticlesBySearcher$ = createEffect(() => this.actions$.pipe(
    ofType('[Blog Page] Load articles by searcher'),
    exhaustMap(({search}) => this.articlesService.getArticlesBySearcher(search)
      .pipe(
        map(data => {           
          return { type: '[Blog Page] Loaded articles by searcher success', articles: data.docs }
        }),
        catchError(() => {
            return of({ type: '[Blog Page] Loaded articles by searcher success', articles: [] })
        })
      ))
    )
  );  

  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService
  ) {}
}