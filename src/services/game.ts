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
    (window as any).game = this;
  }

  init() {
    this.generateDeck();
    this.newMap();
    this.placeStartTile();
  }

  newMap() {
    this.map = new Map();
  }

  placeStartTile() {
    let startIndex = this.deck.findIndex(t => t.start);
    let start = this.deck.splice(startIndex, 1)[0];
    if (startIndex == -1 || !start) {
      console.error("No starting tile found.");
      return;
    }
    this.setTile(start, 0, 0);
  }

  setTile(tile: Tile, x: number, y: number) {
    this.map.set(this.getCoords(x, y), tile);
  }

  getTile(x: number, y: number) {
    return this.map.get(this.getCoords(x, y)) || null;
  }

  getCoords(x: number, y: number) {
    return `${x}.${y}`;
  }

  parseCoords(coords: string) {
    return coords.split(".").map(n => Number(n));
  }

  generateDeck() {
    //TODO: fish out start tile
    this.deck = shuffleArray(Tiles);
  }
}
