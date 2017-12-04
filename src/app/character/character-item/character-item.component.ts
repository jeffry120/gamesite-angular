import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Gamecharacter} from '../../games/gamecharacter.model';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit {
  @Input() character: Gamecharacter;
  @Output() characterSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.characterSelected.emit();
  }

}
