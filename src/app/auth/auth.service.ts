import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const BACKEDN_URL = environment.apiURI + "/user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: any;
  private authStatusListener = new Subject<boolean>();
  private isAuthentitated = false;
  private tokenTimer: any;
  private userId: any = '';
  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    const authData = { email: email, password: password};
   return this.http.post(BACKEDN_URL+"singup", authData);
  }
  getIsAuth() {
    return this.isAuthentitated;
  }
  getUserID() {
    return this.userId;
  }
  login(email: string, password: string) {
    const authData = { email: email, password: password};
    return this.http.post<any>(BACKEDN_URL+"login", authData).subscribe(res =>{
      console.log('login', res);
      const token = res.token;
        this.token = token;
        if (token) {
          const expireInDuration =res.expiresIn;
          this.setAuthTimer(expireInDuration);
          // this.tokenTimer = setTimeout(() => {
          // this.logOut();
          // }, expireInDuration * 1000);
          this.isAuthentitated = true;
          this.userId = res.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expireInDuration * 1000);
          console.log('expirationDate',expirationDate);

          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(['/student'])
        }
    }, error => {
      console.log('You have enter Wrong Email or Password.');

    })
  }
  getToken() {
    return this.token;
  }
  logOut(){
    this.token = null;
    this.isAuthentitated = false;
    this.authStatusListener.next(false);
    this.clearAuthDate();
    clearTimeout(this.tokenTimer);
    this.userId = '';
    this.router.navigate(['/login'])
  }
  saveAuthData(token: string, expirationDate: Date, userId: any) {
    localStorage.setItem('token',token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId)
  }
  clearAuthDate() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  autoAuthUser() {
    const authInformation= this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expirationDate = authInformation?.expirationDate;

    // const isInFuture = expirationDate?expirationDate > now: NaN;
    const expiresIn = expirationDate?expirationDate.getTime() - now.getTime(): NaN;
    if(expiresIn > 0) {
      this.token = authInformation?.token;
      this.isAuthentitated = true;
      this.userId = authInformation?.userId;
      this.setAuthTimer(expiresIn/1000)
      this.authStatusListener.next(true);
    }
  }
  setAuthTimer(duration: number) {
    console.log("setting timer: " + duration);

    this.tokenTimer = setTimeout(() => {
      this.logOut();
      }, duration * 1000);
  }
  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate  = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate){
      return ;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
