import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { AdminTableComponent } from './admin/admin-table/admin-table.component';
import { NewMovieComponent } from './admin/new-movie/new-movie.component';
import { FooterComponent } from './footer/footer.component';
import { MovieCardComponent } from './home/movie-card/movie-card.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { SearchMovieComponent } from './home/search-movie/search-movie.component';
import { SearchFilterPipe } from './home/search-filter.pipe';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    BrowserModule,
    JwPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    HeaderComponent,
    AdminTableComponent,
    NewMovieComponent,
    FooterComponent,
    CarouselComponent,
    SearchMovieComponent,
    SearchFilterPipe,
    MovieDetailsComponent,
    MovieCardComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
