import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import {PixiComponent, PixiContainer} from '@klerick/ng-pixijs';
import {Assets, Container, Graphics, Point, Rectangle, Texture} from 'pixi.js';
import {TileDefs} from '../../../data/tiles';
import {Game} from '../../../services/game';
import {Tile} from '../../../model/tile';
import {TileDef} from '../../../model/tileDef';
import {Viewport} from 'pixi-viewport';

@PixiContainer(true)
@Component({
  selector: 'app-stage',
  imports: [],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StageComponent extends PixiComponent<Container> implements AfterViewInit {
  WORLD_SIZE = 1000;
  TILE_WIDTH = 128;
  TILE_RECT_STRING = `0, 0, ${this.TILE_WIDTH}, ${this.TILE_WIDTH}`;
  TILE_RECT = new Rectangle(0, 0, this.TILE_WIDTH, this.TILE_WIDTH);
  tileTextureMap: Map<string, Texture> = new Map();
  hoveredTile?: string;

  @Output()
  clickTile = new EventEmitter<string>();

  @ViewChild("container")
  pixiContainer!: ElementRef;

  constructor(protected game: Game,
              protected changeDetection: ChangeDetectorRef) {
    super();
    (window as any).stage = this;
    this.loadTextures();
  }

  ngAfterViewInit() {
    //TODO: move viewport shiv into own component somehow?
    // create viewport
    let viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: this.WORLD_SIZE,
      worldHeight: this.WORLD_SIZE,
      events: this.pixiApp.renderer.events, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    // append viewport to stage
    this.pixiElement.addChild(viewport);
    // enable movement
    viewport.drag().pinch().wheel();
    // add stage content to viewport
    viewport.addChild(this.pixiContainer.nativeElement);
    // center start tile
    viewport.center = new Point(0,0);
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
