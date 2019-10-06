import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InfoComponent } from './info/info.component';
import { PremierLeagueComponent } from './premier-league/premier-league.component';
import { PrimeraDivisonComponent } from './primera-divison/primera-divison.component';
import { LatestComponent } from './latest/latest.component';
import { TopComponent } from './top/top.component';
import { TwitterComponent } from './twitter/twitter.component';
import { RedditComponent } from './reddit/reddit.component';
import { AboutComponent } from './about/about.component';
import { DiscoverComponent } from './discover/discover.component';

const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'premierLeague', component: PremierLeagueComponent },
  { path: 'primeraDivision', component: PrimeraDivisonComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'latest', component: LatestComponent },
  { path: 'top', component: TopComponent },
  { path: 'twitter', component: TwitterComponent },
  { path: 'reddit', component: RedditComponent },
  { path: 'about', component: AboutComponent },
  { path: 'discover', component: DiscoverComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
