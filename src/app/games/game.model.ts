import {Gamecharacter} from "./gamecharacter.model";
import {Platform} from "./platform.model"

export class Game {
  private id: string;
  private _name: string;
  private _genre: string;
  private _characters: [object];
  private _platforms: string;
  private _platforms2: string;
  private _description: string;
  private _imagepath: string;
  private _creators: Platform[];

  constructor(values: object = {}) {
    Object.assign(this, values);
  }

  public get _id() {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get creators(): Platform[] {
    return this._creators;
  }

  public set creators(p: Platform[]) {
    this._creators = p;
  }

  public get characters() {
    return this._characters;
  }

  public set characters(n: [object]) {
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

  public get platforms() {
    return this._platforms;
  }

  public set platforms(n: string) {
    this._platforms = n;
  }

  public get platforms2() {
    return this._platforms;
  }

  public set platforms2(n: string) {
    this._platforms = n;
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
