import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService){}
private token = '';
  onLigin(form:NgForm) {
    if(form.invalid) {
      return;
    }
    console.log(form.value);
    // this.authService.login(form.value.email, form.value.pswd).subscribe((result:any) => {
    //   console.log(result);
    //   const token = result.token;
    //   this.token = token;
    // })
    this.authService.login(form.value.email, form.value.pswd);
  }

}
