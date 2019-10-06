import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiscoverService } from '../discover.service';
import { Chart } from 'chart.js';

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

  fetchData;
  interval;
  arrayTweets = [];

  constructor(private data: DiscoverService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.title = form.value.discover;
    this.data.startDiscover(form.value).toPromise()
      .then (resp => {
        this.discovering = true;
        this.end = false;
        setTimeout(() => {
          this.discover();
        }, 5000);
      })
      .catch(err => {
      })
  }

  private discover(){
    this.interval = setInterval(() => {
      this.data.fetchData().subscribe(
        data => {
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
    },1000)
  }
}
