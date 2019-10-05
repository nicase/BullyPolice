import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service:LoginService,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.status();
  }
  onSubmit(form: NgForm) {
    this.service.confirmLogin(form.value).toPromise()
      .then (res => {
        this.toastr.success('Hello' + res.user.firstName + ' ' + res.user.lastName)
        window.location.href='/info';
      })
      .catch(err => {
        this.toastr.error('Error')
      })
  }
}
