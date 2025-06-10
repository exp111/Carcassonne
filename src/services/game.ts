import {Injectable} from '@angular/core';
import {Direction, getOppositeDirection, Tile} from '../model/tile';
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

  // places the starting tile at 0,0
  placeStartTile() {
    let startIndex = this.deck.findIndex(t => t.start);
    let start = this.deck.splice(startIndex, 1)[0];
    if (startIndex == -1 || !start) {
      console.error("No starting tile found.");
      return;
    }
    this.setTile(start, 0, 0, Direction.N);
  }

  // checks if the next tile can be placed at the given position
  canPlaceNextTile(x: number, y: number, rotation: Direction) {
    return this.emptyNeighbourTiles.get(this.getCoords(x, y));
  }

  // places the next tile at the given position
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
    this.recalculatePlaceable();
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

  // checks which tiles are empty and adjacent to a placed tile
  recalculateNeighbours() {
    this.emptyNeighbourTiles.clear();
    for (let entry of this.map) {
      let emptyNeighbours = this.getEmptyNeighbours(entry[0]);
      for (let neighbour of emptyNeighbours) {
        this.emptyNeighbourTiles.set(neighbour, true);
      }
    }
  }

  // checks in which of the empty tiles the next tile can be placed
  recalculatePlaceable() {
    let nextTile = this.nextTile;
    // check each empty tile if the next tile can be placed there
    for (let [coords, _] of this.emptyNeighbourTiles) {
      // mark if tile is placeeable at the coord
      this.emptyNeighbourTiles.set(coords, this.isTilePlaceable(this.nextTile, coords));
    }
  }

  isTilePlaceable(tile: Tile, coords: string) {
    let neighbourTiles = this.getFilledNeighbours(coords);
    for (let neighbour of neighbourTiles) {
      let dir = this.getDirectionOfNeighbour(coords, neighbour);
      let opposite = getOppositeDirection(dir!);
      if (dir == null || opposite == null){
        console.error(`Invalid direction for ${coords} with neighbor ${neighbour}`);
        continue;
      }
      // check if edge pointing towards neigbour is the same type as neighbor edge pointing to us
      if (tile.getEdge(dir) != this.map.get(neighbour)!.getEdge(opposite)) {
        return false;
      }
    }
    return true;
  }

  getDirectionOfNeighbour(self: string, neighbour: string) {
    let selfPos = this.parseCoords(self);
    let neighbourPos = this.parseCoords(neighbour);
    let diff = {x: selfPos.x - neighbourPos.x, y: selfPos.y - neighbourPos.y};
    if (diff.x > 0) {
      return Direction.W;
    } else if (diff.x < 0) {
      return Direction.E;
    }
    if (diff.y > 0) {
      return Direction.S;
    } else if (diff.y < 0) {
      return Direction.N;
    }
    return null;
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
