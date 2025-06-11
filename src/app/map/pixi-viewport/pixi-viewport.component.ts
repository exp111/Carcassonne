import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {OnPixiInit, PixiComponent, PixiContainer} from '@klerick/ng-pixijs';
import {InputManager, PluginManager, Viewport} from 'pixi-viewport';

class WrapperViewport extends Viewport {
  constructor() {
    super({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      events: null!
    });
  }
}

@PixiContainer(false, WrapperViewport)
@Component({
  selector: 'app-pixi-viewport',
  imports: [],
  templateUrl: './pixi-viewport.component.html',
  styleUrl: './pixi-viewport.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PixiViewportComponent extends PixiComponent<WrapperViewport> implements OnPixiInit {
  onPixiInit() {
    this.pixiElement.options.events = this.pixiApp.renderer.events;
    (this.pixiElement as any).tickerFunction = () => this.pixiElement.update(this.pixiElement.options.ticker.elapsedMS);
    (this.pixiElement as any).input = new InputManager(this.pixiElement);
    (this.pixiElement as any).plugins = new PluginManager(this.pixiElement);
    this.pixiElement.drag().pinch().wheel();
  }
}
