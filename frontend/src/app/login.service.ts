import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  formData: Login;

  constructor(private http:HttpClient) { }

  confirmLogin(body){
    return this.http.post(environment.apiURL + '/auth/login', body).pipe(
      map((res: any) => {
        localStorage.setItem('token', res.token);
        return res;
      })
    );
  }

  status(){
    return this.http.get((environment.apiURL + '/status'));
  }
}