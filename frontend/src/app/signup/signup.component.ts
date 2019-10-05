import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error = null;
  password = false;

  constructor(private service:SignupService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.value.password != form.value.password2){
      this.password = true;
    } else {
      this.service.newUser(form.value).toPromise()
      .then (res => {
        this.toastr.success(res.toString(), 'New User')
        this.router.navigate(['/login'])
      })
      .catch(err => {
        this.error = err.error.message;
        if (this.error == 'BadPasswordError') this.error = 'Use numbers, low letters and capital letters for the password';
        this.toastr.error(err, 'Error')
      })
    }
  }

}
