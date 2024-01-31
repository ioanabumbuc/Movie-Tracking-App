import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit {

  constructor(config: NgbCarouselConfig) {
    config.interval = 7000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  images = [
    {title: 'Welcome to my movie tracking app!', short: 'First Slide Short', src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"},
    {title: 'Discover new movies', short: 'Second Slide Short', src: "https://images.pexels.com/photos/3709369/pexels-photo-3709369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
    {title: 'Register to create watchlists', short: 'Third Slide Short', src: "https://images.pexels.com/photos/8263321/pexels-photo-8263321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
  ];

  ngOnInit(): void {
  }

}
