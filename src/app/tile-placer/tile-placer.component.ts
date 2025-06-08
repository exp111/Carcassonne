import {Component, OnInit} from '@angular/core';
import {Tile} from '../../model/tile';
import {Tiles} from '../../data/tiles';
import {shuffleArray} from '../../utils/arrayUtil';

@Component({
  selector: 'app-tile-placer',
  imports: [],
  templateUrl: './tile-placer.component.html',
  styleUrl: './tile-placer.component.scss'
})
export class TilePlacerComponent implements OnInit {
  deck!: Tile[];

  constructor() {
    this.generateDeck();
  }

  ngOnInit() {
    (window as any).placer = this;
  }

  generateDeck() {
    //TODO: fish out start tile
    this.deck = shuffleArray(Tiles);
  }
}
