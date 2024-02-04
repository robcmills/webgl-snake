import { GridHelper } from 'three';
import { Square } from './Square';

export class Grid {
  size = 1.1;
  divisions = 11;
  colorCenterLine = 'dimgray';
  colorGrid = 'dimgray';
  food = new Square({ color: 'green' });

  constructor(scene) {
    this.scene = scene;
    this.grid = new GridHelper(
      this.size,
      this.divisions,
      this.colorCenterLine,
      this.colorGrid,
    );
    this.grid.rotateX( Math.PI / 2 );
    this.scene.add( this.grid );
    this.scene.add( this.food );
    this.spawnFood();
  }

  spawnFood() {
    this.food.position.x = Math.floor(
      Math.random() * this.divisions
    ) * 0.1 - 0.5;
    this.food.position.y = Math.floor(
      Math.random() * this.divisions
    ) * 0.1 - 0.5;
  }
}
