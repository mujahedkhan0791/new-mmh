import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
    constructor(private route: Router, private authService: AuthService) {

    }
  ngOnInit(): void {
   this.authService.autoAuthUser();
  }
    title = 'Test';

    test() {
  this.route.navigate(['/home']);
    }
}
