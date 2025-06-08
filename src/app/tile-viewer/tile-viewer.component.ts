import {Component, OnInit} from '@angular/core';
import {Tiles} from '../../data/tiles';
import {Tile} from '../../model/tile';

@Component({
  selector: 'app-tile-viewer',
  imports: [],
  templateUrl: './tile-viewer.component.html',
  styleUrl: './tile-viewer.component.css'
})
export class TileViewerComponent implements OnInit {
  tiles = Tiles;
  tileMap: Map<string, { tile: Tile, amount: number }> = new Map();

  constructor() {
    for (let tile of this.tiles) {
      if (this.tileMap.has(tile.name)) {
        this.tileMap.get(tile.name)!.amount += 1;
      } else {
        this.tileMap.set(tile.name, {tile: tile, amount: 1});
      }
    }
  }
  ngOnInit() {
    (window as any).viewer = this;
  }

  getSrc(tile: Tile) {
    return `img/tiles/${tile.name}.png`;
  }
}
