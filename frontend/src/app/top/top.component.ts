import { Component, OnInit } from '@angular/core';
import { BulliesService } from '../bullies.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

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
