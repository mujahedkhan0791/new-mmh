import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const BACKEDN_URL = environment.apiURI + "/billing/";
@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor(private http: HttpClient) { }
  createBill(obj: any) {
    return this.http.post<any>(BACKEDN_URL, obj);
  }
  getBill(studentID:number){
    return this.http.get<any>(BACKEDN_URL+studentID);

  }
  getAllBills(){
    return this.http.get<any>(BACKEDN_URL);

  }
  getBillNo(){
    return this.http.get<any>(BACKEDN_URL);
  }
}
