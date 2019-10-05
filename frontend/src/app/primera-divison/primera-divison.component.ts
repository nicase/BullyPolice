import { Component, OnInit } from '@angular/core';
import { PrimeraDivisionService } from '../primera-division.service';

@Component({
  selector: 'app-primera-divison',
  templateUrl: './primera-divison.component.html',
  styleUrls: ['./primera-divison.component.scss']
})
export class PrimeraDivisonComponent implements OnInit {

  matches$: Object;

  constructor(private data: PrimeraDivisionService,) { }

  ngOnInit() {
    if (localStorage.getItem('token')){
      this.data.getMatches().subscribe(
        data => this.matches$ = data
      )
    }
    else {
      window.location.href='/login'
    }
  }
}
