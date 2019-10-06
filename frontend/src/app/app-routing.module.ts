import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LatestComponent } from './latest/latest.component';
import { TopComponent } from './top/top.component';
import { TwitterComponent } from './twitter/twitter.component';
import { RedditComponent } from './reddit/reddit.component';
import { AboutComponent } from './about/about.component';
import { DiscoverComponent } from './discover/discover.component';

const routes: Routes = [
  { path: '', redirectTo: 'latest', pathMatch: 'full' },
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
