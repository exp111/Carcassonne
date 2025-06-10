import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  constructor(protected game: Game,
              protected changeDetectorRef: ChangeDetectorRef) {
    game.init();
  }

  ngOnInit() {
    (window as any).placer = this;
  }

  onClickTile(coords: string) {
    let pos = this.game.parseCoords(coords);
    this.game.placeNextTile(pos.x, pos.y);
    // update grid
    this.changeDetectorRef.detectChanges();
  }
}
