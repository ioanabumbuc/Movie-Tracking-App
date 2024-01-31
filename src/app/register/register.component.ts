import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";
import {User} from "../_models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  password: string = "";
  email: string = "";
  invalidRegister: boolean = false;
  registerSuccess: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    const subscription =
      this.loginService.getUser(this.username).subscribe({
        next: (resp) => {
          if (resp.length) {
            this.invalidRegister = true;
          }else{
            this.invalidRegister = false;
          }
        },
        complete: () => {
          //subscription.unsubscribe();
          if (!this.invalidRegister) {
            const newUser: User = {
              id: 0,
              username: this.username,
              password: this.password,
              email: this.email,
              isAdmin: "false",
              likedMovies: [],
              watchlist: []
            }
            const addSubscription = this.loginService.addUser(newUser).subscribe({
              complete: () => {
                //addSubscription.unsubscribe();
                this.registerSuccess = true;
              }
            })
          }
        }
      })
  }

  onLogin(): void {
    this.router.navigate(['login']).then();
  }


}
