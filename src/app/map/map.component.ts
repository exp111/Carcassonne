import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as PIXI from "pixi.js";
import {Viewport} from "pixi-viewport";

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  @ViewChild("map")
  mapRef!: ElementRef;

  pixi = new PIXI.Application();
  viewport!: Viewport;

  WORLD_SIZE = 1000;

  constructor() {
    (window as any).map = this;
  }

  async ngAfterViewInit() {
    await this.pixi.init({
      //backgroundAlpha: 0
      width: 800,
      height: 600,
      background: "#1099bb",
      resizeTo: this.mapRef.nativeElement
    });

    // init viewport
    this.viewport = new Viewport({
      screenWidth: this.mapRef.nativeElement.innerWidth,
      screenHeight: this.mapRef.nativeElement.innerHeight,
      worldWidth: this.WORLD_SIZE,
      worldHeight: this.WORLD_SIZE,
      disableOnContextMenu: true, // disable right click

      events: this.pixi.renderer.events // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });
    this.pixi.stage.addChild(this.viewport);
    this.viewport
      .drag()
      .pinch()
      .wheel();
  }
}
