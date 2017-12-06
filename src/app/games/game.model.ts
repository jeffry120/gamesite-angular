import {Gamecharacter} from "./gamecharacter.model";
import {Platform} from "./platform.model"

export class Game {
  private id: string;
  private _name: string;
  private _genre: string;
  private _characters: Gamecharacter[];
  private _platforms: Platform[];
  private _description: string;
  private _imagepath: string;
  private _creators: string;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }

  public get _id() {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get platforms(): Platform[] {
    return this._platforms;
  }

  public set platforms(p: Platform[]) {
    this._platforms = p;
  }

  public get characters(): Gamecharacter[] {
    return this._characters;
  }

  public set characters(n: Gamecharacter[]) {
    this._characters = n;
  }

  public get name() {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }

  public get genre() {
    return this._genre;
  }

  public set genre(n: string) {
    this._genre = n;
  }

  public get creators() {
    return this._creators;
  }

  public set creators(n: string) {
    this._creators = n;
  }

  public get description() {
    return this._description;
  }

  public set description(n: string) {
    this._description = n;
  }

  public get imagePath() {
    return this._imagepath;
  }

  public set imagePath(n: string) {
    this._imagepath = n;
  }


}
