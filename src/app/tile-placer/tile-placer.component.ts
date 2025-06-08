import {Component, OnInit} from '@angular/core';
import {Game} from '../../services/game';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-tile-placer',
  imports: [
    MapComponent
  ],
  templateUrl: './tile-placer.component.html',
  styleUrl: './tile-placer.component.scss'
})
export class TilePlacerComponent implements OnInit {
  constructor(protected game: Game) {
    game.init();
  }

  ngOnInit() {
    (window as any).placer = this;
  }
}
