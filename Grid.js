import { GridHelper } from 'three';

export class Grid {
  size = 1.1;
  divisions = 11;
  colorCenterLine = 'dimgray';
  colorGrid = 'dimgray';

  constructor() {
    this.grid = new GridHelper(
      this.size,
      this.divisions,
      this.colorCenterLine,
      this.colorGrid,
    );
    this.grid.rotateX( Math.PI / 2 );
  }

  addToScene(scene) {
    scene.add( this.grid );
  }
}
