import {TileDef} from '../model/tileDef';
import {Direction} from '../model/tile';

export var TileDefs = [
  // start
  new TileDef("crfr", [[Direction.E, Direction.W]], 1, true),
  // Monastery
  new TileDef("ffff_m", [[Direction.N, Direction.E, Direction.S, Direction.W]], 4),
  // Monastery with Road
  new TileDef("ffrf_m", [[Direction.N, Direction.E, Direction.W]], 2),
  // 4-City with CoA
  new TileDef("cccc_s", [[Direction.N, Direction.E, Direction.S, Direction.W]], 1),
  // 3-City
  new TileDef("ccfc", [[Direction.N, Direction.E, Direction.W]], 3),
  // 3-City with CoA
  new TileDef("ccfc_s", [[Direction.N, Direction.E, Direction.W]], 1),
  // 3-City with Road
  new TileDef("ccrc", [[Direction.N, Direction.E, Direction.W]], 1),
  // 3-City with Road & CoA
  new TileDef("ccrc_s", [[Direction.N, Direction.E, Direction.W]], 2),
  // 2-City
  new TileDef("ccff", [[Direction.N, Direction.E], [Direction.S, Direction.W]], 3),
  // 2-City with CoA
  new TileDef("ccff_s", [[Direction.N, Direction.E], [Direction.S, Direction.W]], 2),
  // 2-City with Curve
  new TileDef("crrc", [[Direction.N, Direction.W], [Direction.E, Direction.S]], 3),
  // 2-City with Curve & CoA
  new TileDef("crrc_s", [[Direction.N, Direction.W], [Direction.E, Direction.S]], 2),
  // 2-City-Tunnel
  new TileDef("fcfc", [[Direction.N, Direction.S], [Direction.E, Direction.W]],1),
  // 2-City-Tunnel with CoA
  new TileDef("fcfc_s", [[Direction.N, Direction.S], [Direction.E, Direction.W]],2),
  // 2-City seperated
  new TileDef("cffc", [[Direction.E, Direction.S]],2),
  // 2-City seperated
  new TileDef("cfcf", [[Direction.E, Direction.W]],3),
  // 1-City
  new TileDef("cfff", [[Direction.E, Direction.S, Direction.W]], 5),
  // 1-City with Curve left
  new TileDef("cfrr", [[Direction.S, Direction.W]], 3),
  // 1-City with Curve right
  new TileDef("crrf", [[Direction.E, Direction.S]],3),
  // 1-City with 3-Crossing
  new TileDef("crrr", [], 3),
  // 1-City with Road, same as start
  new TileDef("crfr", [[Direction.E, Direction.W]], 3),
  // Road
  new TileDef("rfrf", [[Direction.N, Direction.S], [Direction.E, Direction.W]],8),
  // Curve left
  new TileDef("ffrr", [[Direction.N,  Direction.E], [Direction.S, Direction.W]], 9),
  // 3-Crossing
  new TileDef("frrr", [], 4),
  // 4-Crossing
  new TileDef("rrrr", [], 1),
]

export var Tiles = TileDefs.flatMap(d => d.generateTiles());
