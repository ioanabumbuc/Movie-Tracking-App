import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { Movie } from 'src/app/_models/movie';
import { MovieService } from 'src/app/_services/movie.service';


@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {

  newMovie!: Movie;
  @Output() newItemEvent = new EventEmitter<Movie[]>();

  movies: Movie[] = [];

  newMovieForm = new FormGroup({
    title: new FormControl("", Validators.required),
    genre: new FormControl("", Validators.required),
    year: new FormControl("", Validators.compose(
      [
        Validators.required,
        Validators.pattern(`^[12][0-9]{3}$`)
      ]
    )),
    rating: new FormControl("", Validators.compose(
      [
        Validators.required,
        Validators.pattern(`[1-9]|10`)
      ]
    )),
    videoUrl: new FormControl(),
    imageUrl: new FormControl(),
    description: new FormControl()
  })

  constructor(private movieService: MovieService) { }

  //get all movies and create a new movie object
  ngOnInit(): void {
    this.movieService.getMovies().subscribe(m => this.movies = m);
    this.newMovie = {
      id: 0,
      title:"",
      genre: "",
      year: 0,
      rating: 0,
      videoUrl: "",
      imageUrl: "",
      description: " ",
    }
  }

  getNextId(): number {
    console.log(this.movies);
    return this.movies[this.movies.length - 1].id + 1;
  }

  onSubmit(): void {

    this.newMovie.id = this.getNextId();
    if (this.newMovieForm.controls['title'].value) {
      this.newMovie.title = this.newMovieForm.controls['title'].value;
    }
    if (this.newMovieForm.controls['genre'].value) {
      this.newMovie.genre = this.newMovieForm.controls['genre'].value;
    }
    if (this.newMovieForm.controls['year'].value) {
      this.newMovie.year = parseInt(this.newMovieForm.controls['year'].value);
    }
    if (this.newMovieForm.controls['rating'].value) {
      this.newMovie.rating = parseFloat(this.newMovieForm.controls['rating'].value);
    }

    this.newMovie.videoUrl = this.newMovieForm.controls['videoUrl'].value;
    this.newMovie.imageUrl = this.newMovieForm.controls['imageUrl'].value;
    this.newMovie.description = this.newMovieForm.controls['description'].value;

    console.log(this.newMovie);
    this.movieService.addMovie(this.newMovie).subscribe(movie => {
      //add a new movie to the array and emit that a new movie has been added
      this.movies.push(movie)
      this.newItemEvent.emit(this.movies);
    });
  }

}
