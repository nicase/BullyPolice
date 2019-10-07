import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bullying Police';
  ln = localStorage.getItem('language') || 'en';
  logged = !!localStorage.getItem('token');


  logout(){
    localStorage.clear();
    window.location.href='/latest';
  }

  english() {
    localStorage.setItem('language', 'en');
    this.ln = localStorage.getItem('language');
    this.refresh();
  }

  spanish() {
    localStorage.setItem('language', 'es');
    this.ln = localStorage.getItem('language');
    this.refresh();
  }

  private refresh() {
    location.reload()
  }
}
