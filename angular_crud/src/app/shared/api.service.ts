import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { informationModel } from '../model/informationmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl ='http://localhost:3000/information';

  getAllInformation(): Observable<informationModel[]> {
    return this.http.get<informationModel[]>(this.apiurl);
  }

  getInformationbyId(id: any): Observable<informationModel> {
    return this.http.get<informationModel>(this.apiurl + '/' + id);
  }

  removeInformationbyId(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  createInformation(companydata: any) {
    return this.http.post(this.apiurl, companydata);
  }

  updateInformation(id: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + id, companydata);
  }
}
