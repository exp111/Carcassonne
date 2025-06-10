import {Injectable} from '@angular/core';
import {Direction, Tile} from '../model/tile';
import {shuffleArray} from '../utils/arrayUtil';
import {Tiles} from '../data/tiles';

@Injectable({
  providedIn: 'root'
})
export class Game {
  deck: Tile[] = [];
  map: Map<string, Tile> = new Map();
  emptyNeighbourTiles: Map<string, boolean> = new Map();

  constructor() {
    (window as any).game = this;
  }

  get nextTile() {
    return this.deck[0] || null;
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
    this.setTile(start, 0, 0, Direction.N);
  }

  placeNextTile(x: number, y: number, rotation: Direction) {
    let nextTile = this.deck.shift();
    if (!nextTile) {
      console.error("No tiles left.");
      return;
    }
    this.setTile(nextTile, x, y, rotation);
  }

  setTile(tile: Tile, x: number, y: number, rotation: Direction) {
    tile.rotation = rotation;
    this.map.set(this.getCoords(x, y), tile);
    this.recalculateNeighbours();
  }

  getTile(x: number, y: number) {
    return this.map.get(this.getCoords(x, y)) || null;
  }

  getCoords(x: number, y: number) {
    return `${x}.${y}`;
  }

  parseCoords(coords: string) {
    let c = coords.split(".");
    return {
      x: Number(c[0]),
      y: Number(c[1])
    }
  }

  generateDeck() {
    this.deck = shuffleArray(Tiles);
  }

  recalculateNeighbours() {
    this.emptyNeighbourTiles.clear();
    for (let entry of this.map) {
      let emptyNeighbours = this.getEmptyNeighbours(entry[0]);
      for (let neighbour of emptyNeighbours) {
        this.emptyNeighbourTiles.set(neighbour, true);
      }
    }
  }

  // gets the empty orthogonal neighbor coordinates of a coordinate
  getEmptyNeighbours(coords: string) {
    return this.getNeighbourTiles(coords, false);
  }

  // gets the filled orthogonal neighbour coordinates of a coordinate
  getFilledNeighbours(coords: string) {
    return this.getNeighbourTiles(coords, true);
  }

  getNeighbourTiles(coords: string, status: boolean) {
    let ret = [];
    let neighbours = this.getNeighbours(coords);
    for (let neighbour of neighbours) {
      // if (filled and parameter) or (!filled and !parameter), add to return
      if (status == this.map.has(neighbour)) {
        ret.push(neighbour);
      }
    }
    return ret;
  }

  // returns the orthogonal neighbor coordinates of a coordinate
  getNeighbours(coords: string) {
    let pos = this.parseCoords(coords);
    return [
      // up
      this.getCoords(pos.x, pos.y - 1),
      // right
      this.getCoords(pos.x + 1, pos.y),
      // down
      this.getCoords(pos.x, pos.y + 1),
      // left
      this.getCoords(pos.x - 1, pos.y)
    ];
  }
}
