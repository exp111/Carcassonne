import {getEnumValue, hasEnumValue} from '../utils/enumUtil';

enum Feature {
  Monastery = 'm',
  CoatOfArms = 's'
}

enum Edge {
  Field = 'f',
  Road = 'r',
  City = 'c'
}

export class Tile {
  start: boolean;
  name: string;
  edges: Edge[];
  features: Feature[];

  constructor(name: string, start: boolean = false) {
    this.name = name;
    this.start = start;

    [this.edges, this.features] = this.parseName(name);
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
}
