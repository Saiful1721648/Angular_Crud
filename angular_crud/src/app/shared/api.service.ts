import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { informationModel } from '../model/informationmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiUrl ='http://localhost:3000/information';

  getAllInformation(): Observable<informationModel[]> {
    return this.http.get<informationModel[]>(this.apiUrl);
  }
  getInformationById(id: any): Observable<informationModel> {
    return this.http.get<informationModel>(this.apiUrl+ '/' +id);
  }
  createInformation(informationData: any) {
    return this.http.post(this.apiUrl, informationData);
  }
  RemoveInformationbycode(id: any) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
  UpdateInformation(id: any, tabledata: any) {
    return this.http.put(this.apiUrl + '/' + id, tabledata);
  }
}
