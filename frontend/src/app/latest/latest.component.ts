import { Component, OnInit } from '@angular/core';
import { BulliesService } from '../bullies.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {

  bullies$: Object;
  ln = localStorage.getItem('language') || 'en';
  filter = {
    language: localStorage.getItem('language') || 'en',
  };
  
  timeLeft;

  constructor(private data: BulliesService) { }

  ngOnInit() {
    this.ln = localStorage.getItem('language') || 'en';
    localStorage.clear();

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
