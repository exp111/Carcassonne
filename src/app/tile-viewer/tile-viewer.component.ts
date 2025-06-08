import {Component, OnInit} from '@angular/core';
import {Tiles, TileDefs} from '../../data/tiles';
import {Tile} from '../../model/tile';

@Component({
  selector: 'app-tile-viewer',
  imports: [],
  templateUrl: './tile-viewer.component.html',
  styleUrl: './tile-viewer.component.css'
})
export class TileViewerComponent implements OnInit {
  tiles = Tiles;
  tileDefs = TileDefs;

  ngOnInit() {
    (window as any).viewer = this;
  }

  getSrc(name: string) {
    return `img/tiles/${name}.png`;
  }

  Array = Array;
}
