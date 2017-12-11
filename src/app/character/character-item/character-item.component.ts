import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Gamecharacter} from '../../games/gamecharacter.model';
import {isNumber} from 'util';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit {
  @Input() character: Gamecharacter;
  @Input() gameId: string;
  @Input() index: number;
  @Output() characterSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.characterSelected.emit();
  }

}
