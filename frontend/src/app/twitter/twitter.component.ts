import { Component, OnInit } from '@angular/core';
import { BulliesService } from '../bullies.service';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {

  bullies$: Object;
  ln = localStorage.getItem('language') || 'es';
  filter = {
    platform: 'tw',
    language: localStorage.getItem('language') || 'es',
  };

  constructor(private data: BulliesService) { }

  ngOnInit() {
    console.log(localStorage.getItem('language'))
    this.ln = localStorage.getItem('language') || 'es';

    this.data.getBullies(this.filter).subscribe(
      data => this.bullies$ = data
    );

    setInterval(() => {
      this.data.getBullies(this.filter).subscribe(
        data => {
          this.bullies$ = data
        }
      );
    },2500)
  }
}
