import {Tile} from '../model/tile';

function generateTiles(name: string, amount: number) {
  let ret = [];
  for (let i = 0; i < amount; i++) {
    ret.push(new Tile(name));
  }
  return ret;
}

export var Tiles = [
  // start
  new Tile("crfr", true),
  // Monastery
  ...generateTiles("ffff_m", 4),
  // Monastery with Road
  ...generateTiles("ffrf_m", 2),
  // 4-City with CoA
  ...generateTiles("cccc_s", 1),
  // 3-City
  ...generateTiles("ccfc", 3),
  // 3-City with CoA
  ...generateTiles("ccfc_s", 1),
  // 3-City with Road
  ...generateTiles("ccrc", 1),
  // 3-City with Road & CoA
  ...generateTiles("ccrc_s", 2),
  // 2-City
  ...generateTiles("ccff", 3),
  // 2-City with CoA
  ...generateTiles("ccff_s", 2),
  // 2-City with Curve
  ...generateTiles("crrc", 3),
  // 2-City with Curve & CoA
  ...generateTiles("crrc_s", 2),
  // 2-City-Tunnel
  ...generateTiles("fcfc", 1),
  // 2-City-Tunnel with CoA
  ...generateTiles("fcfc_s", 2),
  // 2-City seperated
  ...generateTiles("cffc", 2),
  // 2-City seperated
  ...generateTiles("cfcf", 3),
  // 1-City
  ...generateTiles("cfff", 5),
  // 1-City with Curve left
  ...generateTiles("cfrr", 3),
  // 1-City with Curve right
  ...generateTiles("crrf", 3),
  // 1-City with 3-Crossing
  ...generateTiles("crrr", 3),
  // 1-City with Road, same as start
  ...generateTiles("crfr", 3),
  // Road
  ...generateTiles("rfrf", 8),
  // Curve left
  ...generateTiles("ffrr", 9),
  // 3-Crossing
  ...generateTiles("frrr", 4),
  // 4-Crossing
  ...generateTiles("rrrr", 1),
]
