import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { Movie } from '../_models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'http://localhost:3000/movies';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        tap(_ => console.log('fetched movies')),
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }

  searchMovie(movieName: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.moviesUrl}/?title=${movieName}`)
      .pipe(
        tap(x => x.length ?
          console.log(`found movies matching "${movieName}"`) :
          console.log(`no heroes matching "${movieName}"`)),
        catchError(this.handleError<Movie[]>('searchMovie', []))
      );
  }

  searchMovieByGenre(genre:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.moviesUrl}/?genre=${genre}`)
    .pipe(
      tap(x => x.length ?
        console.log(`found movies matching "${genre}"`) :
        console.log(`no heroes matching "${genre}"`)),
      catchError(this.handleError<Movie[]>('searchMovie', []))
    );
  }


  getMovieById(id: number): Observable<Movie> {
    /** GET movie by id. Will 404 if id not found */
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => console.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, this.httpOptions)
      .pipe(
        tap((newMovie: Movie) => console.log(`added movie w/ id=${newMovie.id}`)),
        catchError(this.handleError<Movie>('addMovie'))
      );
  }

  updateMovie(movie: Movie): Observable<any> {
    const url = `${this.moviesUrl}/${movie.id}`;
    return this.http.put(url, movie, this.httpOptions).pipe(
      tap(_ => console.log(`updated movie id=${movie.id}`)),
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  deleteMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.delete<Movie>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted movie id=${id}`)),
      catchError(this.handleError<Movie>('deleteMovie'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
