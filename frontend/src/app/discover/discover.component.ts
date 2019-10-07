import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiscoverService } from '../discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  discovering = false;
  end = false;
  title = null;
  interests = [
    'POSITIVE',
    'NEUTRAL',
    'NEGATIVE'
  ];

  user: String;
  numD: any;

  fetchData;
  interval;
  arrayTweets = [];
  problem;

  constructor(private data: DiscoverService) { }

  ngOnInit() {
    if (!localStorage.getItem('token')){
      window.location.href='/login'
    }
    this.user = localStorage.getItem('id')
    this.getDiscover();
  }

  onSubmit(form: NgForm) {
    this.title = form.value.discover;
    this.data.startDiscover(form.value, this.user).toPromise()
      .then (resp => {
        if (resp.status) {
          this.problem = resp.status;
        }
        else {
          this.discovering = true;
          this.end = false;
          setTimeout(() => {
            console.log('start')
            this.discover();
          }, 10000);
        }
      })
      .catch(err => {
      })
  }

  getDiscover(){
    this.data.getDiscover(this.user).toPromise()
    .then (resp => {
      this.numD = resp;
    })
    .catch(err => {
    });
  }

  private discover(){
    this.interval = setInterval(() => {
      this.data.fetchData().subscribe(
        data => {
          console.log(data[0])
          if (data[0]) {
            this.fetchData = data[0];
            this.arrayTweets = data[0].tweetsInterest.concat(this.arrayTweets);
          }
          else {
            this.end = true;
            clearInterval(this.interval);
          }
        }
      );
    },2000)
  }
}
