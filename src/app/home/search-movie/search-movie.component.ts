import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Movie } from 'src/app/_models/movie';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {

  movies: Movie[] = [];
  movieTitle = '';
  @Output() newMoviesEvent = new EventEmitter<Movie[]>();
  @Output() movieTitleEmitter = new EventEmitter<string>();

  ratingAsc: boolean = true;
  yearAsc: boolean = true;

  constructor(private movieService: MovieService) {
  }

  searchTitle(){
    this.movieTitleEmitter.emit(this.movieTitle);
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(m => this.movies = m);
  }

  searchByName(movieTitle: string): void {
    this.movieService.searchMovie(movieTitle).subscribe(m => {
      this.movies = m;
      this.newMoviesEvent.emit(this.movies);
    });
  }

  searchByGenre(genre: string): void {
    if (genre == "all") {
      this.movieService.getMovies().subscribe(m => {
        this.movies = m;
        this.newMoviesEvent.emit(this.movies);
      })
    } else {
      this.movieService.searchMovieByGenre(genre).subscribe(m => {
        this.movies = m;
        this.newMoviesEvent.emit(this.movies);
      })
    }
  }


  sortByRating(genre: string): void {
    if (genre == "all") {
      //sort all movies
      this.movieService.getMovies().subscribe(m => {
        this.movies = m;
        if (!this.ratingAsc) {
          //if theyre not already sorted ascendingly - sort ascendingly
          this.movies.sort((m1, m2) => m1.rating - m2.rating);
          this.newMoviesEvent.emit(this.movies);
          this.ratingAsc = true;
        } else {
          //sort desendengly and toggle the variable ratingAsc
          this.movies.sort((m1, m2) => m2.rating - m1.rating);
          this.newMoviesEvent.emit(this.movies);
          this.ratingAsc = false;
        }
      })
    } else {
      //get movies by genre and sort only those
      this.movieService.searchMovieByGenre(genre).subscribe(m => {
        this.movies = m;
        if (!this.ratingAsc) {
          this.movies.sort((m1, m2) => m1.rating - m2.rating);
          this.newMoviesEvent.emit(this.movies);
          this.ratingAsc = true;
        } else {
          this.movies.sort((m1, m2) => m2.rating - m1.rating);
          this.newMoviesEvent.emit(this.movies);
          this.ratingAsc = false;
        }
      })
    }
  }

  //same as sort by genre
  sortByYear(genre: string): void {
    if (genre == "all") {
      this.movieService.getMovies().subscribe(m => {
        this.movies = m;
        if (!this.yearAsc) {
          this.movies.sort((m1, m2) => m1.year - m2.year);
          this.newMoviesEvent.emit(this.movies);
          this.yearAsc = true;
        } else {
          this.movies.sort((m1, m2) => m2.year - m1.year);
          this.newMoviesEvent.emit(this.movies);
          this.yearAsc = false;
        }
      })
    } else {
      this.movieService.searchMovieByGenre(genre).subscribe(m => {
        this.movies = m;
        if (!this.yearAsc) {
          this.movies.sort((m1, m2) => m1.year - m2.year);
          this.newMoviesEvent.emit(this.movies);
          this.yearAsc = true;
        } else {
          this.movies.sort((m1, m2) => m2.year - m1.year);
          this.newMoviesEvent.emit(this.movies);
          this.yearAsc = false;
        }
      })
    }
  }

}
