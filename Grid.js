import { GridHelper } from 'three';
import { Square } from './Square';
import { round } from './round';

export class Grid {
  size = 1.1;
  divisions = 11;
  colorCenterLine = 'dimgray';
  colorGrid = 'dimgray';
  food = new Square({ color: 'lime' });

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
    this.spawnFood([]);
  }

  spawnFood(snake) {
    const snakePositions = new Set(snake.map(
      segment => `${round(segment.position.x)},${round(segment.position.y)}`
    ));

    const emptyPositions = [];

    const half = round(this.size / 2 - 0.1);
    for (let y = -(half); y < half; y += 0.1) {
      for (let x = -(half); x < half; x += 0.1) {
      	if (snakePositions.has(`${round(x)},${round(y)}`)) continue;
        emptyPositions.push({ x: round(x), y: round(y) });
      }
    }

    const randomPosition = emptyPositions[
      Math.floor(Math.random() * emptyPositions.length)
    ];
    this.food.position.x = randomPosition.x;
    this.food.position.y = randomPosition.y;
  }
}
