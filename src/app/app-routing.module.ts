import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesComponent} from './games/games.component';
import {GameStartComponent} from './games/game-list/game-start/game-start.component';
import {GameDetailComponent} from './games/game-detail/game-detail.component';
import {AdvancedComponent} from './advanced/advanced.component';
import { GameAddComponent } from "./games/game-add/game-add.component";
import {CharacterDetailComponent} from "./character/character-detail/character-detail.component";
import {CharacterAddComponent} from "./games/character-add/character-add.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/games', pathMatch: 'full'},
  {path: 'games', component: GamesComponent, children: [
    {path: '', component: GameStartComponent},
    {path: 'add', component: GameAddComponent},
    {path: ':id', component: GameDetailComponent},
    {path: ':id/edit', component: GameAddComponent},
    {path: 'editChar/:id', component: CharacterAddComponent},
    {path: 'editChar/:id/:charid', component: CharacterAddComponent}
  ]},
  {path: 'advanced/:id', component: AdvancedComponent, children: [
    {path: '', component: GameStartComponent},
    {path: ':name', component: CharacterDetailComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
