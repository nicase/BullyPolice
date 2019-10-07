import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {

  constructor(private http:HttpClient) { }

  get httpOptions() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-Type': 'application/json'}) 
      .append('Authorization', `Bearer ${token}`);
    return { headers };
  }

  getDiscover(id){
    console.log(id)
    return this.http.get(environment.apiURL + "/nDiscover?id="+id);
  }

  startDiscover(form, user){
    form.user = user;
    return this.http.post(environment.apiURL + "/startDiscover", form, this.httpOptions);
  }

  fetchData(){
    const data = this.http.get(environment.apiURL + "/discover");
    return data
  }
}
