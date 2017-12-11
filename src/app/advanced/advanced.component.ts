import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameService} from '../games/game.service';
import {Game} from '../games/game.model';
import {Gamecharacter} from "../games/gamecharacter.model";

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.css']
})
export class AdvancedComponent implements OnInit {
  game: Game = new Game({name: 'loading', imagePath: ''});
  character: Gamecharacter;
  id: string;
  index: number;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.gameService.getGame(this.id).then(res => {
            this.game = res;
          });
        }
      );
  }

  onGameSelected(character: Gamecharacter) {
    console.log('click');
    this.character = character;
    console.log(character);

  }

  onCancel() {
    this.router.navigate(['../../games'], {relativeTo: this.route});
  }
}
