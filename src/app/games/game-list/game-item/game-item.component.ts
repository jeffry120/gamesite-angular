import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;
  @Input() index: string;

  constructor() {
  }

  ngOnInit() {
    this.index = this.game._id;
  }

}
