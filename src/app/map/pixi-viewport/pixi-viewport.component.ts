import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {OnPixiInit, PixiComponent, PixiContainer} from '@klerick/ng-pixijs';
import {InputManager, PluginManager, Viewport} from 'pixi-viewport';
import {EventSystem} from "pixi.js";

class WrapperViewport extends Viewport {
    constructor() {
        super({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 1000,
            worldHeight: 1000,
            // add mock eventsystem so that the constructor won't throw. will be replaced in onPixiInit
            events: {
                domElement: {
                    addEventListener: (a: any) => null
                } as any as HTMLElement
            } as EventSystem
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
        // replace eventsystem
        this.pixiElement.options.events = this.pixiApp.renderer.events;
        // add missing elements
        (this.pixiElement as any).input = new InputManager(this.pixiElement);
        (this.pixiElement as any).plugins = new PluginManager(this.pixiElement);
        // enable camera movement
        this.pixiElement.drag().pinch().wheel();
        // move camera to center
        this.pixiElement.moveCenter(0,0);
    }
}
