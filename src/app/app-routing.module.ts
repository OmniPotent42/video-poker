import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameMenuComponent } from './game-menu/game-menu.component';
import { VideoPokerComponent } from './video-poker/video-poker.component';

const routes: Routes = [
  { path: '', redirectTo: '/video-poker', pathMatch: 'full' },
  { path: 'menu', component: GameMenuComponent },
  { path: 'video-poker', component: VideoPokerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
