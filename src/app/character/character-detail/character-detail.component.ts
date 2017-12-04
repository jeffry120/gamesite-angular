import {Component, Input, OnInit} from '@angular/core';
import {Gamecharacter} from '../../games/gamecharacter.model';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  @Input() character: Gamecharacter;
  constructor() { }

  ngOnInit() {
    console.log(this.character.details[0].name);
  }
}
