import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameService} from '../games/game.service';
import {Game} from '../games/game.model';
import {Gamecharacter} from "../games/gamecharacter.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-advanced',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvancedComponent implements OnInit {
  game: Game = new Game({name: 'loading', imagePath: ''});
  character: Gamecharacter;
  @Input() gameId: string;
  id: string;
  index: number;
  subsription: Subscription;
  relGame: Game[];

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
          })
            .then(() => this.gameService.getGamesRel(this.game.genre)
            .then((res) => this.relGame = res) );
        }
      );
    this.subsription = this.gameService.charChanged
      .subscribe(
        () => {
          this.gameService.getGame(this.id)
            .then(() => {
              this.gameService.getGame(this.id).then(res => {
                this.game = res;
              });

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
