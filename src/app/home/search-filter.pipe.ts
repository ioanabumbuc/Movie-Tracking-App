import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../_models/movie';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  //filter the list of movies with those that include the searched string
  //apply toLowerCase() to both to not be case sensitive
  transform(list: Movie[], args: string): any {
    return list.filter((movie) => movie.title.toLowerCase().includes(args.toLocaleLowerCase()));
  }

}
