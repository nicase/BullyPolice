import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bullying Police';
  ln = localStorage.getItem('language') || 'es';


  logout(){
    localStorage.clear();
    window.location.href='/login';
  }

  english() {
    localStorage.setItem('language', 'en');
    this.ln = localStorage.getItem('language');
  }

  spanish() {
    localStorage.setItem('language', 'es');
    this.ln = localStorage.getItem('language');
  }
}
