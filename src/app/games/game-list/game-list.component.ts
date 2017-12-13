import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../game.model';
import {Subscription} from 'rxjs/Subscription';
import {GameService} from '../game.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {
  games: Game[];
  subscription: Subscription;
  filteredStatus = '';
  filteredGenre = '';
  filteredCreator = '';

  constructor(private gameService: GameService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.gameService.gameChanged
      .subscribe(
        () => {
          this.gameService.getGames()
            .then(res => {
              this.games = res;
            });
        }
      );
    this.gameService.getGames().then(res => {
      this.games = res;
    });
  }

  onNewGame() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
