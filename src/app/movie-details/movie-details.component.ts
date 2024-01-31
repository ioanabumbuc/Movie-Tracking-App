import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

import {Movie} from '../_models/movie';
import {MovieService} from '../_services/movie.service';
import {User} from "../_models/user";
import {LoginService} from "../_services/login.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  // @ts-ignore
  movie: Movie;
  relatedMovies: Movie[] = [];
  pageOfMovies: Movie[] = [];
  // @ts-ignore
  user: User;
  isLikedArray: boolean[] = [];
  isInWatchlistArray: boolean[] = [];
  isLoggedIn: boolean = false;
  isLiked: boolean = false
  isInWatchlist: boolean = false;
  foundRelated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public sanitizer: DomSanitizer,
    private loginService: LoginService
    // ,private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      const id = Number(routeParams['id']);
      this.getMovies(id);
    });


  }


  getRelatedMovies(): void {
    //get a list of movies with the same genre as the active one
    if (this.movie) {
      this.relatedMovies = [];
      const relatedSubscription = this.movieService.searchMovieByGenre(this.movie.genre).subscribe({
          next: (m) => {
            for (let i = 0; i < m.length; i++) {
              if (m[i].id != this.movie!.id) {
                this.relatedMovies.push(m[i]);
                this.foundRelated = true;
              }
            }
          },
          complete: () => {
            //relatedSubscription.unsubscribe();
            if (this.relatedMovies.length) {
              this.foundRelated = true;
              this.getUserData()
            }
            setTimeout(() => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              })
            })
          }
        }
      )
    }
  }

  getMovies(id: number): void {
    // console.log(id);
    const movieSubscription = this.movieService.getMovieById(id).subscribe(
      {
        next: (m) => {
          this.movie = m;

        },
        complete: () => {
          this.getRelatedMovies();
          //movieSubscription.unsubscribe();
        }
      }
    );
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
              this.isLiked = this.loginService.isLiked(this.user, this.movie.id);
              this.isInWatchlist = this.loginService.isInWatchlist(this.user, this.movie.id);
              for (let i = 0; i < this.relatedMovies.length; i++) {
                this.isLikedArray[i] = this.loginService.isLiked(this.user, this.relatedMovies[i].id);
                this.isInWatchlistArray[i] = this.loginService.isInWatchlist(this.user, this.relatedMovies[i].id);
              }
            }
          })
      }
    }
  }

  getSafeVideoUrl() {
    //sanitize url and then pass it to the iframe
    if (this.movie) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.movie?.videoUrl);
    } else {
      return "";
    }
  }

  onChangePage(pageOfMovies: Movie[]) {
    // update current page of items
    this.pageOfMovies = pageOfMovies;
  }

  onLike() {
    this.isLiked = !this.isLiked;
    // @ts-ignore
    const subscription = this.loginService.addToLikedMovies(this.user, this.movie.id).subscribe({
      next: (resp) => {
        this.user = resp;
      },
      complete: () => {
        //subscription.unsubscribe();
      }
    });
  }

  onWatchlist() {
    this.isInWatchlist = !this.isInWatchlist;

    // @ts-ignore
    const subscription = this.loginService.addToWatchlist(this.user, this.movie.id).subscribe({
      next: (resp) => {
        this.user = resp;
      },
      complete: () => {
        ///subscription.unsubscribe();
      }
    });
  }

}
