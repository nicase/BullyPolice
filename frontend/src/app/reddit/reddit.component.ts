import { Component, OnInit } from '@angular/core';
import { BulliesService } from '../bullies.service';

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.scss']
})
export class RedditComponent implements OnInit {

  bullies$: Object;
  ln = localStorage.getItem('language') || 'es';
  filter = {
    platform: 'rd',
    language: localStorage.getItem('language') || 'es',
  };

  constructor(private data: BulliesService) { }

  ngOnInit() {
    this.ln = localStorage.getItem('language') || 'es';

    this.data.getBullies(this.filter).subscribe(
      data => this.bullies$ = data
    );
  }
}