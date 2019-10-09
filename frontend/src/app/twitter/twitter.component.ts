import { Component, OnInit } from '@angular/core';
import { BulliesService } from '../bullies.service';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {

  bullies$: Object;
  ln = localStorage.getItem('language') || 'en';
  filter = {
    platform: 'tw',
    language: localStorage.getItem('language') || 'en',
  };

  timeLeft;

  constructor(private data: BulliesService) { }

  ngOnInit() {
    console.log(localStorage.getItem('language'))
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
