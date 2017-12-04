import {Component, OnInit} from '@angular/core';
import {Game} from '../game.model';
import {GameService} from '../game.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})

export class GameDetailComponent implements OnInit {
  game: Game = new Game({name: 'wait', imagePath: ''});
  id: string;

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
            this.game = res[0];
          });
        }
      );
  }

  onEditGame() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteGame() {
    this.gameService.deleteGame(this.id);
    this.router.navigate(['/games']);
  }
}
