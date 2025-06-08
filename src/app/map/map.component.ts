import {AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {ApplicationOptions} from 'pixi.js';
import {PixiSceneComponent} from '@klerick/ng-pixijs';

@Component({
  selector: 'app-map',
  imports: [
    PixiSceneComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  pixiJsConfig = signal<Partial<ApplicationOptions>>({
    backgroundColor: 'grey',
    height: 500,
  });

  constructor() {
    (window as any).map = this;
  }

  async ngAfterViewInit() {
  }
}
