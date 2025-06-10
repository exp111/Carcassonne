import {hasEnumValue} from '../utils/enumUtil';

export enum Feature {
  Monastery = 'm',
  CoatOfArms = 's'
}

export enum Edge {
  Field = 'f',
  Road = 'r',
  City = 'c'
}

export enum Direction {
  N,
  E,
  S,
  W,
  END
}

export function getOppositeDirection(dir: Direction) {
  switch (dir) {
    case Direction.N:
      return Direction.S;
    case Direction.E:
      return Direction.W;
    case Direction.S:
      return Direction.N;
    case Direction.W:
      return Direction.E;
    default:
      return null;
  }
}

export function normalizeDirection(dir: Direction) {
  // negative case, wrap around
  while (dir < 0) {
    dir += Direction.END;
  }
  // positive case, wrap around
  return dir % Direction.END;
}

export class Tile {
  start: boolean;
  name: string;
  edges: Edge[];
  features: Feature[];
  // Runtime vars
  rotation = Direction.N;

  constructor(name: string, start: boolean = false) {
    this.name = name;
    this.start = start;

    [this.edges, this.features] = this.parseName(name);
  }

  getEdge(direction: Direction) {
    return this.edges[normalizeDirection(direction + (Direction.END - this.rotation))];
  }

  parseName(name: string): [Edge[], Feature[]] {
    let edges: Edge[] = [];
    let features: Feature[] = [];
    let split = name.split("_");
    // get edges
    for (let i = 0; i < split[0].length; i++) {
      let char = split[0].charAt(i);
      if (!hasEnumValue(Edge, char)) {
        console.error(`Could not parse edge ${char} for ${name}`);
      }
      edges.push(char as Edge);
    }
    // optionally: get features
    if (split.length > 1) {
      for (let i = 0; i < split[1].length; i++) {
        let char = split[1].charAt(i);
        if (!hasEnumValue(Feature, char)) {
          console.error(`Could not parse feature ${char} for ${name}`);
        }
        features.push(char as Feature);
      }
    }
    return [edges, features];
  }

  static getSrc(name: string) {
    return `./img/tiles/${name}.png`;
  }

  getSrc() {
    return Tile.getSrc(this.name);
  }
}
