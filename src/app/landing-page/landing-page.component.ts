import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
constructor(private route: Router, private authService: AuthService) {}

onCreate() {
  this.route.navigate(['/registration'])
}
onStudentDetails() {
  this.route.navigate(['/student'])

}
onSettings() {
  this.route.navigate(['/settings'])

}
onBillDetails() {
  this.route.navigate(['/billing'])

}
onOldregistration() {
  this.route.navigate(['/oldregistration'])

}
onLogout(){
  this.authService.logOut();
}
onSignUp(){
  this.route.navigate(['/signup'])
}
}
