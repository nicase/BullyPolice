import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LatestComponent } from './latest/latest.component';
import { TwitterComponent } from './twitter/twitter.component';
import { RedditComponent } from './reddit/reddit.component';
import { AboutComponent } from './about/about.component';
import { DiscoverComponent } from './discover/discover.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from '../app/login/guards/authguard';

const routes: Routes = [
  { path: '', redirectTo: 'latest', pathMatch: 'full' },
  { path: 'latest', component: LatestComponent },
  { path: 'twitter', component: TwitterComponent },
  { path: 'reddit', component: RedditComponent },
  { path: 'about', component: AboutComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
