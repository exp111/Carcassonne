import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Tiles} from '../data/tiles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'Carcassonne';
  tiles = Tiles;

  ngOnInit() {
    (window as any).app = this;
  }
}
