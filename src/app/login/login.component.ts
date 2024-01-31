import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../_services/login.service";
import {User} from "../_models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  rememberLogin: boolean = false;
  invalidLogin: boolean = false;
  isAdmin:string = "false";

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {

  }

  onRegisterClick() {
    this.router.navigate(['register']).then();
  }

  onLogin() {
    const subscription = this.loginService.getUser(this.username, this.password).subscribe({
      next: (resp: User[]) => {
        if (resp.length === 0) {
          this.invalidLogin = true;
        } else {
          this.invalidLogin = false;
          this.isAdmin = resp[0].isAdmin;
        }
      },
      complete: () => {
        // subscription.unsubscribe();
        if (!this.invalidLogin) {
          localStorage.setItem("username", this.username);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("rememberLogin", String(this.rememberLogin));
          localStorage.setItem("isAdmin", String(this.isAdmin));
          if(this.isAdmin === "true"){
            this.router.navigate(['admin']).then();
          }else{
            this.router.navigate(['home']).then();
          }

        }
      }
    })
  }

}
