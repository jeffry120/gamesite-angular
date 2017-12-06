import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { GameService } from '../game.service';
import {Game} from '../game.model';


@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {
  id: string;
  editMode = false;
  gameForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private gameService: GameService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.gameService.updateGame(this.id, this.gameForm.value);
    } else {
      this.gameService.addGame(this.gameForm.value);
      this.gameService.getGames()
        .then(games => {
          this.gameService.gameChanged.next(games.slice());
        });
    }
    this.onCancel();
  }
  onAddPlatform() {
    (<FormArray>this.gameForm.get('platforms')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeletePlatform(index: number) {
    (<FormArray>this.gameForm.get('platforms')).removeAt(index);
  }

  onAddCharacter() {
    (<FormArray>this.gameForm.get('characters')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteCharacter(index: number) {
    (<FormArray>this.gameForm.get('characters')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editgame = new Game({name: '', imagepath: '', description: ''});

    const GamePlatforms = new FormArray([]);
    const Gamecharacter = new FormArray([]);


    if (this.editMode) {
      this.gameService.getGame(this.id)
        .then(game => {
          editgame = game;
          if (game['characters']) {
            for (const character of game.characters) {
              Gamecharacter.push(
                new FormGroup({
                  'name': new FormControl(character.name, Validators.required),
                  'imagePath': new FormControl(character.imagePath),
                  'description': new FormControl(character.description, Validators.required)
                })
              );
            }
          }
          if (game['platforms']) {
            for (const platform of game.platforms) {
              GamePlatforms.push(
                new FormGroup({
                  'name': new FormControl(platform.name, Validators.required)
                })
              );

            }
          }
          this.gameForm = new FormGroup({
            'name': new FormControl(editgame.name, Validators.required),
            'genre': new FormControl(editgame.genre, Validators.required),
            'description': new FormControl(editgame.description, Validators.required),
            'characters': Gamecharacter,
            'platforms': GamePlatforms,
            'imagePath': new FormControl(editgame.imagePath, Validators.required),
            'creators': new FormControl(editgame.creators, Validators.required),
          });
        })
        .catch(error => console.log(error));
    }

    this.gameForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'genre': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'characters': new FormArray([]),
      'platforms': new FormArray([]),
      'imagePath': new FormControl('', Validators.required),
      'creators': new FormControl('', Validators.required),
    });
  }

}
