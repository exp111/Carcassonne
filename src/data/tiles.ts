import {TileDef} from '../model/tileDef';

export var TileDefs = [
  // start
  new TileDef("crfr", 1, true),
  // Monastery
  new TileDef("ffff_m", 4),
  // Monastery with Road
  new TileDef("ffrf_m", 2),
  // 4-City with CoA
  new TileDef("cccc_s", 1),
  // 3-City
  new TileDef("ccfc", 3),
  // 3-City with CoA
  new TileDef("ccfc_s", 1),
  // 3-City with Road
  new TileDef("ccrc", 1),
  // 3-City with Road & CoA
  new TileDef("ccrc_s", 2),
  // 2-City
  new TileDef("ccff", 3),
  // 2-City with CoA
  new TileDef("ccff_s", 2),
  // 2-City with Curve
  new TileDef("crrc", 3),
  // 2-City with Curve & CoA
  new TileDef("crrc_s", 2),
  // 2-City-Tunnel
  new TileDef("fcfc", 1),
  // 2-City-Tunnel with CoA
  new TileDef("fcfc_s", 2),
  // 2-City seperated
  new TileDef("cffc", 2),
  // 2-City seperated
  new TileDef("cfcf", 3),
  // 1-City
  new TileDef("cfff", 5),
  // 1-City with Curve left
  new TileDef("cfrr", 3),
  // 1-City with Curve right
  new TileDef("crrf", 3),
  // 1-City with 3-Crossing
  new TileDef("crrr", 3),
  // 1-City with Road, same as start
  new TileDef("crfr", 3),
  // Road
  new TileDef("rfrf", 8),
  // Curve left
  new TileDef("ffrr", 9),
  // 3-Crossing
  new TileDef("frrr", 4),
  // 4-Crossing
  new TileDef("rrrr", 1),
]

export var Tiles = TileDefs.flatMap(d => d.generateTiles());
