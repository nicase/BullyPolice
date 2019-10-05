import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BulliesService {

  constructor(private http: HttpClient) { }

  getBullies(filter){
    return this.http.get(environment.apiURL + '/bully', filter);
  }
}
