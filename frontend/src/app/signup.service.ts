import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Signup } from './signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  formData: Signup;

  constructor(private http:HttpClient) { }

  newUser(body){
    return this.http.post( environment.apiURL + '/auth/signup', body);
  }
}
