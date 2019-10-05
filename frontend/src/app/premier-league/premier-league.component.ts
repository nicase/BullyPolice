import { Component, OnInit } from '@angular/core';
import { PremierLeagueService } from '../premier-league.service';

@Component({
  selector: 'app-premier-league',
  templateUrl: './premier-league.component.html',
  styleUrls: ['./premier-league.component.scss']
})
export class PremierLeagueComponent implements OnInit {

  matches$: Object;

  constructor(private data: PremierLeagueService,) { }

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
