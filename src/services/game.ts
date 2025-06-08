import { Injectable } from '@angular/core';
import {Tile} from '../model/tile';
import {shuffleArray} from '../utils/arrayUtil';
import {Tiles} from '../data/tiles';

@Injectable({
  providedIn: 'root'
})
export class Game {
  deck: Tile[] = [];
  map: Map<string, Tile> = new Map();

  constructor() {

  }

  init() {
    this.generateDeck();
    this.newMap();
  }

  newMap() {
    this.map = new Map();
  }

  getTile(x: number, y: number) {
    return this.map.get(`${x}.${y}`) || null;
  }

  generateDeck() {
    //TODO: fish out start tile
    this.deck = shuffleArray(Tiles);
  }
}
