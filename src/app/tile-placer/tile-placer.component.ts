import {ChangeDetectorRef, Component} from '@angular/core';
import {Game} from '../../services/game';
import {MapComponent} from '../map/map.component';
import {Direction} from '../../model/tile';

@Component({
  selector: 'app-tile-placer',
  imports: [
    MapComponent
  ],
  templateUrl: './tile-placer.component.html',
  styleUrl: './tile-placer.component.scss'
})
export class TilePlacerComponent {
  constructor(protected game: Game,
              protected changeDetectorRef: ChangeDetectorRef) {
    (window as any).placer = this;
    game.init();
  }

  selectedRotation = Direction.N;

  rotate(amount: number) {
    this.selectedRotation += amount;
    // negative case, wrap around
    while (this.selectedRotation < 0) {
      this.selectedRotation += Direction.END;
    }
    // positive case, wrap around
    this.selectedRotation = this.selectedRotation % Direction.END;
  }

  onClickTile(coords: string) {
    let pos = this.game.parseCoords(coords);
    if (!this.game.canPlaceNextTile(pos.x, pos.y, this.selectedRotation)) {
      return;
    }
    this.game.placeNextTile(pos.x, pos.y, this.selectedRotation);
    // reset rotation
    this.selectedRotation = Direction.N;
    // update grid
    this.changeDetectorRef.detectChanges();
  }
}
