import { Component, OnInit } from '@angular/core';
import {Game} from "../game.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GameService} from "../game.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-game',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})

export class GameAddComponent implements OnInit {
  games: Game;
  id: number;
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
          this.id = +params['id'];
          this.editMode = params['id'] != null;
         // this.initForm();
        }
      );

    // onSubmit(){
    //   const newGame = new Game(
    //     this.gameForm.value['name'],
    //     this.gameForm.value['description'],
    //     this.gameForm.value['imagePath'],
    //   if (this.editMode) {
    //     this.gameService.addGame(newGame);
    //   }
    // }

    // private initForm() {
    //     let gameName = '';
    //     let gameImagePath = '';
    //     let gameDescription = '';
    //
    //     if (this.editMode) {
    //       const game = this.gameService.getGame(this.id);
    //       gameName = game.name;
    //       gameImagePath = game.imagePath;
    //       gameDescription = game.description;
    //     }
    //
    //     this.gameForm = new FormGroup({
    //       'name': new FormControl(gameName, Validators.required),
    //       'imagePath': new FormControl(gameImagePath, Validators.required),
    //       'description': new FormControl(gameDescription, Validators.required),
    //     });
    //   }

  }
}
