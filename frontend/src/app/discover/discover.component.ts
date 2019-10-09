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
  resp: any;

  fetchData;
  interval;
  arrayTweets = [];
  problem;
  problemTweet;

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
        this.resp = resp;
        if (this.resp.status) {
          this.problem = this.resp.status;
        }
        else {
          this.discovering = true;
          this.end = false;
          this.discover();
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
          if (data[0]) {
            this.fetchData = data[0];
            if (this.fetchData.nTweetsAnalys < this.fetchData.nTweetsTotal) {
              this.problemTweet = "Didn't found all the tweets you have requested"
            }
            this.arrayTweets = data[0].tweetsInterest.concat(this.arrayTweets);
            this.end = true;
            clearInterval(this.interval);
          }
          else {
            this.problemTweet = "Didn't found any tweets about your topic, try something more popular"
          }
        }
      );
    },2000)
  }
}
