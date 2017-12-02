import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesComponent} from './games/games.component';
import {GameStartComponent} from './games/game-list/game-start/game-start.component';
import {GameDetailComponent} from './games/game-detail/game-detail.component';
import {AdvancedComponent} from './advanced/advanced.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/games', pathMatch: 'full'},
  {path: 'games', component: GamesComponent, children: [
    {path: '', component: GameStartComponent},
    {path: ':id', component: GameDetailComponent}
  ]},
  {path: 'advanced/:id', component: AdvancedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
