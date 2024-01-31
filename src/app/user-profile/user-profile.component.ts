import {Component, OnInit} from '@angular/core';
import {User} from "../_models/user";
import {LoginService} from "../_services/login.service";
import {Movie} from "../_models/movie";
import {MovieService} from "../_services/movie.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    isAdmin: "false",
    likedMovies: [],
    watchlist: []
  };
  liked: Movie[] = [];
  watchlist: Movie[] = [];

  constructor(private loginService: LoginService, private movieService: MovieService) {
  }

  ngOnInit(): void {
    const username = localStorage.getItem("username");
    if (username) {
      this.loginService.getUser(username).subscribe({
        next: (resp) => {
          this.user = resp[0];
          let watchlistSubscription: any;
          let likedSubscription: any;
          for (let i = 0; i < this.user.watchlist.length; i++) {
            watchlistSubscription = this.movieService.getMovieById(this.user.watchlist[i])
              .subscribe({
                next: (movie) => {
                  this.watchlist.push(movie);
                }
              })
          }
          for (let i = 0; i < this.user.likedMovies.length; i++) {
            likedSubscription = this.movieService.getMovieById(this.user.likedMovies[i]).subscribe({
              next: (movie: Movie) => {
                this.liked.push(movie);
              }
            })
          }
        }
      });
    }
  }

}
