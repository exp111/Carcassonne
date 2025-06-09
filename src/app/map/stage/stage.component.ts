import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {PixiComponent, PixiContainer} from '@klerick/ng-pixijs';
import {Assets, Container, Graphics, Sprite, Text, TilingSprite} from 'pixi.js';
import {TileDefs} from '../../../data/tiles';
import {Game} from '../../../services/game';
import {Tile} from '../../../model/tile';
import {TileDef} from '../../../model/tileDef';

export interface HTMLElementTagNameMap {
  'pixi-container': Container;
  'pixi-sprite': Sprite;
  'pixi-tiling-sprite': TilingSprite;
  'pixi-text': Text;
  'pixi-graphics': Graphics;
}

@PixiContainer(true)
@Component({
  selector: 'app-stage',
  imports: [],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StageComponent extends PixiComponent<Container> {
  TILE_WIDTH = 50;
  tileTextureMap: Map<string, Sprite> = new Map();

  constructor(protected game: Game) {
    super();
    (window as any).stage = this;
    this.loadTextures();
  }

  async loadTextures() {
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
}
