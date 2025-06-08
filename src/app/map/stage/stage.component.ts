import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {PixiComponent, PixiContainer} from '@klerick/ng-pixijs';
import {Container} from 'pixi.js';

@PixiContainer(true)
@Component({
  selector: 'app-stage',
  imports: [],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StageComponent extends PixiComponent<Container> {

}
