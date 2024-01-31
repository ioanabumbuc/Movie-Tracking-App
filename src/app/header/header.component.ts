import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = "";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const log = localStorage.getItem("isLoggedIn");
    if (log) {
      this.isLoggedIn = Boolean(log);
      const user = localStorage.getItem("username");
      if (user) {
        this.username = user;
      }
    }
  }

  onLoginClick() {
    this.router.navigate(['login']).then();
  }

  onRegisterClick() {
    this.router.navigate(['register']).then();
  }

  onHomeClick() {
    this.router.navigate(['']).then();
  }

  onProfileClick(){
    this.router.navigate(['profile']).then();
  }

  logout() {
    this.router.navigate(['home']).then();
    localStorage.clear();
    if(this.router.url==='/home'){
      window.location.reload();
    }
  }
}
