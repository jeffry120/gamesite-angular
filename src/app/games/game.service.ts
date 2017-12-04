import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers} from '@angular/http';
import {Game} from './game.model';

@Injectable()
export class GameService {
  gameChanged = new Subject<Game[]>();

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/games/';

  private games: Game[];

  constructor(private http: Http) {

  }

  getGames() {
    console.log('getGames');
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.games = response.json() as Game[];
        return response.json() as Game[];
      })
      .catch(error => {
        return error;
      });


}

  getGame(index: string) {
    if (index == null)
      return null;
    return this.http.get(this.serverUrl + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error)
        return error;
      });
  }

  addGame(game: Game) {
    return this.http.post(this.serverUrl, game, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.gameChanged.next(this.games.slice());
      });
  }

  updateGame(index: string, newGame: Game) {
    return this.http.put(this.serverUrl + index, newGame, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.gameChanged.next(this.games.slice());
      });
  }

  deleteGame(index: string) {
    return this.http.delete(this.serverUrl + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.gameChanged.next(this.games.slice());
      });
  }

}
