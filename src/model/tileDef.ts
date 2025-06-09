import {Tile} from './tile';

export class TileDef {
  name: string;
  amount: number;
  start: boolean;

  constructor(name: string, amount: number = 1, start: boolean = false) {
    this.name = name;
    this.amount = amount;
    this.start = start;
  }

  generateTiles() {
    let ret = [];
    for (let i = 0; i < this.amount; i++) {
      ret.push(new Tile(this.name, this.start));
    }
    return ret;
  }

  getSrc() {
    return Tile.getSrc(this.name);
  }
}
