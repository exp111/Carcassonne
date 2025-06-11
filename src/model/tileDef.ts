import {Direction, Tile} from './tile';

export class TileDef {
  name: string;
  amount: number;
  start: boolean;
  connections: Direction[][];

  constructor(name: string, connections: Direction[][], amount: number = 1, start: boolean = false) {
    this.name = name;
    this.amount = amount;
    this.start = start;
    this.connections = connections;
  }

  generateTiles() {
    let ret = [];
    for (let i = 0; i < this.amount; i++) {
      ret.push(new Tile(this.name, this.connections, this.start));
    }
    return ret;
  }

  getSrc() {
    return Tile.getSrc(this.name);
  }
}
