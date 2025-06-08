import {Routes} from '@angular/router';
import {TileViewerComponent} from './tile-viewer/tile-viewer.component';
import {TilePlacerComponent} from './tile-placer/tile-placer.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: 'viewer',
    component: TileViewerComponent
  },
  {
    path: "placer",
    component: TilePlacerComponent
  },
  {
    path: "",
    component: HomeComponent
  }
];
