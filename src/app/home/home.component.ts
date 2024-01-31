import {Component, OnInit, Output} from '@angular/core';
import {Movie} from '../_models/movie';
import {MovieService} from '../_services/movie.service';
import {User} from "../_models/user";
import {LoginService} from "../_services/login.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  pageOfMovies: Movie[] = [];
  movieTitle = '';
  isLoggedIn: boolean = false;
  // @ts-ignore
  user: User;
  isLiked: boolean[] = [];
  isInWatchlist: boolean[] = [];

  constructor(private movieService: MovieService, private loginService: LoginService) {

  }

  ngOnInit(): void {
    const subscription = this.movieService.getMovies().subscribe({
      next: (m) => {
        this.movies = m
      },
      complete: () => {
        //subscription.unsubscribe();
        this.getUserData();
      }
    });
  }

  getUserData() {
    const log = localStorage.getItem("isLoggedIn");
    if (log) {
      this.isLoggedIn = Boolean(log);
      const username = localStorage.getItem("username");
      if (username) {
        const subscription =
          this.loginService.getUser(username).subscribe({
            next: (resp) => {
              this.user = resp[0]
            },
            complete: () => {
              //subscription.unsubscribe();
              for (let i = 0; i < this.movies.length; i++) {
                this.isLiked[i] = this.loginService.isLiked(this.user, this.movies[i].id);
                this.isInWatchlist[i] = this.loginService.isInWatchlist(this.user, this.movies[i].id);
              }
            }
          })
      }
    }
  }

  searchedItems(newMovies: Movie[]) {
    this.movies = newMovies;
  }

  searchedMovie(title: string) {
    this.movieTitle = title;
  }

  onChangePage(pageOfMovies: Movie[]) {
    // update current page of items
    this.pageOfMovies = pageOfMovies;
  }

}
