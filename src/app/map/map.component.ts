import {Component, EventEmitter, Output, signal} from '@angular/core';
import {ApplicationOptions} from 'pixi.js';
import {PixiSceneComponent, PixiStageDirective} from '@klerick/ng-pixijs';
import {StageComponent} from './stage/stage.component';

@Component({
  selector: 'app-map',
  imports: [
    PixiSceneComponent,
    StageComponent,
    PixiStageDirective
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  pixiJsConfig = signal<Partial<ApplicationOptions>>({
    background: "grey"
  });

  @Output()
  clickTile = new EventEmitter<string>();

  constructor() {
    (window as any).map = this;
  }
}
