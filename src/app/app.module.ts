import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing.module';

import { GamesComponent } from './games/games.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { GameItemComponent } from './games/game-list/game-item/game-item.component';
import {GameService} from './games/game.service';
import {HttpModule} from '@angular/http';
import { GameStartComponent } from './games/game-list/game-start/game-start.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { GameAddComponent } from "./games/game-add/game-add.component";
import { CharacterDetailComponent } from "./character/character-detail/character-detail.component";
import { CharacterItemComponent } from "./character/character-item/character-item.component";
import {DropdownDirective} from "./shared/dropdown.directive";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesComponent,
    GameListComponent,
    GameItemComponent,
    GameStartComponent,
    GameDetailComponent,
    GameAddComponent,
    AdvancedComponent,
    CharacterDetailComponent,
    CharacterItemComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
