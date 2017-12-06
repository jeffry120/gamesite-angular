import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../game.model';
import {Platform} from "../../platform.model";

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;
  @Input() platform: Platform;
  @Input() index: string;

  ngOnInit() {
    this.index = this.game._id;
  }

}
