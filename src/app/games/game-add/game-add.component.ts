import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { GameService } from '../game.service';
import {Game} from '../game.model';
import {Gamecharacter} from "../gamecharacter.model";


@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {
  //@Input() character: Gamecharacter;
  id: string;
  idChar: string;
  editMode = false;
  gameForm: FormGroup;
  selectedGenre: string;
  selectedPlatform: string;
  selectedPlatform2: string;
  platforms: [string]
  platforms2: [string]
  characters: Gamecharacter;
  game: Game;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idChar = params['charid'];
      this.id = params['id'];
      this.platforms = ['PS4', 'PC', 'XBOX'];
      this.platforms2 = ['', 'PS4', 'PC', 'XBOX'];
      this.editMode = params['id'] != null;
      this.initForm();
      //   this.gameService.getGame(this.id)
      //   .then(games => this.game = games);
      // }
    });
  }

  changeSelectedType(event: any) {
    console.log(event); //object, depends on ngValue
    console.log(this.selectedGenre); //object, depends on ngValue
  }

  changeSelectedTypePlatform(event: any) {
    console.log(event); //object, depends on ngValue
    console.log(this.selectedPlatform); //object, depends on ngValue
  }

  changeSelectedTypePlatform2(event: any) {
    console.log(event); //object, depends on ngValue
    console.log(this.selectedPlatform2); //object, depends on ngValue
  }


  onSubmit() {
    if (this.editMode) {
      this.gameService.updateGame(this.id, this.gameForm.value);
    } else {
      this.gameService.addGame(this.gameForm.value);
    }
    this.onCancel();
  }

  onAddCreator() {
    (<FormArray>this.gameForm.get('creators')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteCreator(index: number) {
    (<FormArray>this.gameForm.get('creators')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editgame = new Game({name: '', imagepath: '', description: ''});

    const GamePlatforms = new FormArray([]);
    //const Gamecharacter = new FormArray([]);


    if (this.editMode) {
      this.gameService.getGame(this.id).then((res) => console.log(res))
      this.gameService.getGame(this.id)
        .then(game => {
          editgame = game;
          if (game['creators']) {
            for (const platform of game.creators) {
              GamePlatforms.push(
                new FormGroup({
                  'name': new FormControl(platform.name, Validators.required)
                })
              );

            }
          }
          this.gameForm = new FormGroup({
            '_id': new FormControl(editgame._id, Validators.required),
            'name': new FormControl(editgame.name, Validators.required),
            'genre': new FormControl(editgame.genre, Validators.required),
            'description': new FormControl(editgame.description, Validators.required),
            'platforms': new FormControl(editgame.platforms, Validators.required),
            'platforms2': new FormControl(editgame.platforms),
            'imagePath': new FormControl(editgame.imagePath, Validators.required),
            'creators': GamePlatforms
          });
        })
        .catch(error => console.log(error));
    }

    this.gameForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'genre': new FormControl(0, Validators.required),
      'description': new FormControl('', Validators.required),
      'platforms': new FormControl('', Validators.required),
      'platforms2': new FormControl(''),
      'imagePath': new FormControl('', Validators.required),
      'creators': new FormArray([]),
    });
  }

}
