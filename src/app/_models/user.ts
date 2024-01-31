export interface User{
  id:number,
  username: string,
  password: string,
  email: string,
  isAdmin: string,
  likedMovies: number[],
  watchlist:number[]
}
