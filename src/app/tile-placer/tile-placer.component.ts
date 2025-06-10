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

  rotate(amount: number) {
    this.game.rotateStartTile(amount);
  }

  skipTile() {
    this.game.deck.push(this.game.deck.shift()!);
    this.game.recalculateNeighbours();
    this.game.recalculatePlaceable();
  }

  onClickTile(coords: string) {
    let pos = this.game.parseCoords(coords);
    if (!this.game.canPlaceNextTile(pos.x, pos.y)) {
      return;
    }
    console.log(`placing tile: ${this.game.nextTile.getEdge(Direction.N)},${this.game.nextTile.getEdge(Direction.E)},${this.game.nextTile.getEdge(Direction.S)},${this.game.nextTile.getEdge(Direction.W)} (${this.game.nextTile.name})`);
    this.game.placeNextTile(pos.x, pos.y);
    // update grid
    this.changeDetectorRef.detectChanges();
  }
}
