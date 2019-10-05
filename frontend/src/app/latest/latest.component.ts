import { Component, OnInit } from '@angular/core';
import { BulliesService } from '../bullies.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {

  bullies$: Object;
  ln = localStorage.getItem('language') || 'es';
  filter = {
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
