import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {

  constructor(private http:HttpClient) { }

  startDiscover(form){
    return this.http.post(environment.apiURL + "/startDiscover", form);
  }

  fetchData(){
    const data = this.http.get(environment.apiURL + "/discover");
    return data
  }
}
