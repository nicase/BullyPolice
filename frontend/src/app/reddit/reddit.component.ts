import { Component, OnInit } from '@angular/core';
import { BulliesService } from '../bullies.service';

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.scss']
})
export class RedditComponent implements OnInit {

  bullies$: Object;
  ln = localStorage.getItem('language') || 'en';
  filter = {
    platform: 'rd',
    language: localStorage.getItem('language') || 'en',
  };

  timeLeft;

  constructor(private data: BulliesService) { }

  ngOnInit() {
    this.ln = localStorage.getItem('language') || 'en';

    this.data.getBullies(this.filter).subscribe(
      data => this.bullies$ = data
    );

    setInterval(() => {
      this.timeLeft = (7200 - (new Date().getTime()/1000) % 7200).toFixed(0);
      if(this.timeLeft == 0){
        this.data.getBullies(this.filter).subscribe(
          data => {
            this.bullies$ = data
          }
        );
      }

    },1000)
  }
}