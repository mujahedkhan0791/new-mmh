import { FormStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

const BACKEDN_URL = environment.apiURI + "/posts/";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  getList() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  getpPost(obj: any) {
    return this.http.post<any>(BACKEDN_URL, obj);
  }
  getData(queryParms: any){
   return this.http.get<any>(BACKEDN_URL+queryParms)

  }
  DeletedPost(id: string) {
    return this.http.delete<any>(BACKEDN_URL+id);
  }
  updatePost(id: string, postData:any) {

   return this.http.put(BACKEDN_URL+id, postData);
  }

}
