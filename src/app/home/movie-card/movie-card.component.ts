import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Movie} from 'src/app/_models/movie';
import {LoginService} from "../../_services/login.service";
import {User} from "../../_models/user";


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: Movie | undefined;
  @Input() isLoggedIn: boolean = false;
  @Input() isLiked: boolean = false;
  @Input() isInWatchlist: boolean = false;
  // @ts-ignore
  @Input() user: User;
  @Input() isInProfile: boolean = false;

  isReadMore = true;

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {

  }

  showDescription() {
    this.isReadMore = !this.isReadMore;
  }

  goToMovie(id: number) {
    this.router.navigate(['movie', id]).then();
  }

  onLike() {
    this.isLiked = !this.isLiked;
    // @ts-ignore
    this.loginService.addToLikedMovies(this.user, this.movie.id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.user = resp;
      }
    });
  }

  onWatchlist() {
    this.isInWatchlist = !this.isInWatchlist;

    // @ts-ignore
    this.loginService.addToWatchlist(this.user, this.movie.id).subscribe({
      next: (resp) => {
        this.user = resp;
      }
    });
  }

}
