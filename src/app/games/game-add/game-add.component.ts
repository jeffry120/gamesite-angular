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
      this.editMode = params['id'] != null;
      this.initForm();
      //   this.gameService.getGame(this.id)
      //   .then(games => this.game = games);
      // }
    });
  }


  onSubmit() {
    if (this.editMode) {
      this.gameService.updateGame(this.id, this.gameForm.value);
    } else {
      this.gameService.addGame(this.gameForm.value);
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
            '_id': new FormControl(editgame._id, Validators.required),
            'name': new FormControl(editgame.name, Validators.required),
            'genre': new FormControl(editgame.genre, Validators.required),
            'description': new FormControl(editgame.description, Validators.required),
            'platforms': GamePlatforms,
            'imagePath': new FormControl(editgame.imagePath, Validators.required),
            'creators': new FormControl(editgame.creators, Validators.required),
          });
        })
        .catch(error => console.log(error));
    }

    this.gameForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'genre': new FormControl(0, Validators.required),
      'description': new FormControl('', Validators.required),
      'platforms': new FormArray([]),
      'imagePath': new FormControl('', Validators.required),
      'creators': new FormControl('', Validators.required),
    });
  }

}
