import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const BACKEDN_URL = environment.apiURI + "/settings/";
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  createPost(obj: any) {
    return this.http.post<any>(BACKEDN_URL, obj);
  }
  getCoursesDetails() {
    return this.http.get<any>(BACKEDN_URL);
  }
  updatePost(id: string, obj: any) {
   return this.http.put(BACKEDN_URL+id, obj);
  }
  deletedPost(id: string) {
    return this.http.delete<any>(BACKEDN_URL+id);
  }
}
