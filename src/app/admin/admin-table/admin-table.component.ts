import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Movie } from 'src/app/_models/movie';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {

  @Input() movies: Movie[] = [];

  newMovie!: Movie ;
  activeModal: number = 0;
  submitted:boolean = false;

  editMovieForm = new FormGroup({
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
  });

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(m => this.movies = m);
  }

  deleteMovie(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this.movieService.deleteMovie(movie.id).subscribe();
  }

  //get next available id
  getNextId(): number {
    return this.movies[this.movies.length - 1].id + 1;
  }

  onSubmit(): void {

    this.newMovie.id = this.activeModal;
    if (this.editMovieForm.controls['title'].value) {
      this.newMovie.title = this.editMovieForm.controls['title'].value;
    }
    if (this.editMovieForm.controls['genre'].value) {
      this.newMovie.genre = this.editMovieForm.controls['genre'].value;
    }
    if (this.editMovieForm.controls['year'].value) {
      this.newMovie.year = parseInt(this.editMovieForm.controls['year'].value);
    }
    if (this.editMovieForm.controls['rating'].value) {
      this.newMovie.rating = parseFloat(this.editMovieForm.controls['rating'].value);
    }

    this.newMovie.videoUrl = this.editMovieForm.controls['videoUrl'].value;
    this.newMovie.imageUrl = this.editMovieForm.controls['imageUrl'].value;
    this.newMovie.description = this.editMovieForm.controls['description'].value;

    this.movieService.updateMovie(this.newMovie).subscribe(movie => {
      for (let i = 0; i < this.movies.length; i++) {
        if (this.movies[i].id == movie.id) {
          this.movies[i] = movie;
        }
      }
      this.submitted = true;
    })

  }

  openEdit(id: number) {
    this.submitted = false;
    this.activeModal = id;
    this.movieService.getMovieById(id).subscribe(movie => {
      this.newMovie = movie;
      this.editMovieForm.setValue({
        title: this.newMovie.title,
        genre: this.newMovie.genre,
        year: this.newMovie.year.toString(),
        rating: this.newMovie.rating.toString(),
        videoUrl: this.newMovie.videoUrl,
        imageUrl: this.newMovie.imageUrl,
        description: this.newMovie.description
      }
      )
    })
  }

  addItem(newMovies: Movie[]) {
    this.movies = newMovies;
  }
}
