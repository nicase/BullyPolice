import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PremierLeagueComponent } from './premier-league/premier-league.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PrimeraDivisonComponent } from './primera-divison/primera-divison.component';
import { InfoComponent } from './info/info.component';
import { LatestComponent } from './latest/latest.component';
import { TopComponent } from './top/top.component';
import { TwitterComponent } from './twitter/twitter.component';
import { RedditComponent } from './reddit/reddit.component';
import { AboutComponent } from './about/about.component';
import { DiscoverComponent } from './discover/discover.component';

@NgModule({
  declarations: [
    AppComponent,
    PremierLeagueComponent,
    LoginComponent,
    SignupComponent,
    PrimeraDivisonComponent,
    InfoComponent,
    LatestComponent,
    TopComponent,
    TwitterComponent,
    RedditComponent,
    AboutComponent,
    DiscoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
