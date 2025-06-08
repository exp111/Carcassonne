import {Component, OnInit} from '@angular/core';
import {Tiles, TileDefs} from '../../data/tiles';
import {Tile} from '../../model/tile';

@Component({
  selector: 'app-tile-viewer',
  imports: [],
  templateUrl: './tile-viewer.component.html',
  styleUrl: './tile-viewer.component.scss'
})
export class TileViewerComponent implements OnInit {
  tiles = Tiles;
  tileDefs = TileDefs;

  ngOnInit() {
    (window as any).viewer = this;
  }

  getSrc(name: string) {
    return Tile.getSrc(name);
  }

  Array = Array;
}
