import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BulliesService {

  constructor(private http: HttpClient) { }

  getBullies(filter){
    return this.http.get(environment.apiURL + '/bully?' + this.parseFilter(filter));
  }

  private parseFilter(filter){
    let aux = '';
    const vec = Object.keys(filter);
    for (let i = 0; i < vec.length; i++){
      aux += vec[i] + '=' + filter[vec[i]] + '&'
    }
    return aux;
  }
}
