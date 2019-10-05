import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrimeraDivisionService {

  constructor(private http: HttpClient) { }

  get httpOptions() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-Type': 'application/json'}) 
      .append('Authorization', `Bearer ${token}`);
    return { headers };
  }

  getMatches(){
    return this.http.get(environment.apiURL + '/match/liga', this.httpOptions);
  }
}
