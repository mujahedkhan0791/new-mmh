import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authService: AuthService, private router: Router){}

  onSignUp(form: NgForm) {
    if(form.invalid) {
      return;
    }
    console.log(form.value);
    this.authService.createUser(form.value.email, form.value.pswd).subscribe(result => {
      console.log(result);
    });
  }
  onLogin(){
    this.router.navigate(['/login']);
  }
}
