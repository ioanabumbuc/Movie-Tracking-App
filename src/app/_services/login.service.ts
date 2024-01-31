import {Injectable} from '@angular/core';
import {Movie} from "../_models/movie";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {User} from "../_models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:3000/users';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getUser(username: string, password?: string): Observable<User[]> {
    if (password)
      return this.http.get<User[]>(`${this.url}/?username=${username}&password=${password}`);
    else
      return this.http.get<User[]>(`${this.url}/?username=${username}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions)
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.url}/${user.id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap()
    );
  }

  addToLikedMovies(user: User, movieId: number): Observable<any> {
    const liked = user.likedMovies;
    const newLiked = [];
    let found = false;
    for (let i = 0; i < liked.length; i++) {
      if (liked[i] != movieId) {
        newLiked.push(liked[i]);
      } else {
        found = true;
      }
    }
    if (!found) {
      newLiked.push(movieId);
    }
    const newUser: User = {
      ...user,
      likedMovies: newLiked
    }
    return this.updateUser(newUser);
  }

  addToWatchlist(user: User, movieId: number): Observable<any> {
    const watchlist = user.watchlist;
    const newWatchlist = [];
    let found = false;
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i] !== movieId) {
        newWatchlist.push(watchlist[i]);
      } else {
        found = true;
      }
    }
    if (!found) {
      newWatchlist.push(movieId);
    }
    const newUser: User = {
      ...user,
      watchlist: newWatchlist
    }
    return this.updateUser(newUser);
  }

  isLiked(user: User, movieId: number): boolean {
    const liked = user.likedMovies;
    for (let i = 0; i < liked.length; i++) {
      if (liked[i] === movieId) {
        return true;
      }
    }
    return false;
  }

  isInWatchlist(user: User, movieId: number): boolean {
    const watchlist = user.watchlist;
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i] === movieId) {
        return true;
      }
    }
    return false;
  }


}
