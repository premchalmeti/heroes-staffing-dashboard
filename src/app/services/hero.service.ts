import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '../interfaces/heroes.interface';
import { NotificationService } from '../services/notification.service';
import { NotificationTypes } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private notificationSVC: NotificationService,
    private http: HttpClient
  ) {}

  log(message: string) {
    this.notificationSVC.addNotification(
      NotificationTypes.INFO,
      `HeroService: ${message}`
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('Fetched Heroes!')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap((_) => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions)
      .pipe(
        tap((_) => this.log(`Updated hero id=${hero.id}`)),
        catchError(this.handleError<any>(`Update hero id=${hero.id}`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(`${this.heroesUrl}`, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`Added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>(`addHero`))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number'? hero: hero.id;

    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap((_) => this.log(`Deleted hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    );
  }

  searchHero(term: string): Observable<Hero[]> {
    term = term.trim();

    if(!term)
      return of([]);

    return this.http.get<Hero[]>(
      `${this.heroesUrl}/?name=${term}`
    ).pipe(
      tap(
        h => h.length? this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes found matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }
}
