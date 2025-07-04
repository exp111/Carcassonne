import {Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output} from '@angular/core';
import {PixiComponent, PixiContainer} from '@klerick/ng-pixijs';
import {Assets, Container, Graphics, Rectangle, Texture} from 'pixi.js';
import {TileDefs} from '../../../data/tiles';
import {Game} from '../../../services/game';
import {Tile} from '../../../model/tile';
import {TileDef} from '../../../model/tileDef';
import {PixiViewportComponent} from '../pixi-viewport/pixi-viewport.component';

@PixiContainer(true)
@Component({
  selector: 'app-stage',
  imports: [
    PixiViewportComponent
  ],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StageComponent extends PixiComponent<Container> {
  TILE_WIDTH = 128;
  TILE_RECT_STRING = `0, 0, ${this.TILE_WIDTH}, ${this.TILE_WIDTH}`;
  TILE_RECT = new Rectangle(0, 0, this.TILE_WIDTH, this.TILE_WIDTH);
  tileTextureMap: Map<string, Texture> = new Map();
  hoveredTile?: string;

  @Output()
  clickTile = new EventEmitter<string>();

  constructor(protected game: Game) {
    super();
    (window as any).stage = this;
    this.loadTextures();
  }

  async loadTextures() {
    // load and cache all tile textures
    for (let def of TileDefs) {
      this.tileTextureMap.set(def.name, await this.loadTexture(def));
    }
  }

  async loadTexture(def: TileDef) {
    return Assets.load(def.getSrc());
  }

  getTileTexture(tile: Tile) {
    return this.tileTextureMap.get(tile.name);
  }

  hoverTile(tile: Graphics, pos: string) {
    console.log(`hover ${pos}`);
    this.hoveredTile = pos;
    // mark as hovered
    tile.tint = 0xFFFF00;
  }

  unhoverTile(tile: Graphics, pos: string) {
    console.log(`unhover tile ${pos}`);
    if (this.hoveredTile == pos) {
      this.hoveredTile = undefined;
      // unmark tile
      tile.tint = 0xFFFFFF;
    }
  }

  onClickEmptyTile(pos: string) {
    console.log(`click ${pos}`);
    this.clickTile.emit(pos);
  }
}
