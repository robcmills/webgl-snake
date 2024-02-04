import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector2,
} from 'three';

const BOUNDS_SIZE = 0.6;

export class Snake {
  alive = true;
  direction = 'right';
  target = new Vector2( 0, 0 );

  constructor() {
    this.geometry = new PlaneGeometry( 0.1, 0.1 );
    this.material = new MeshBasicMaterial({ color: 'cyan' });
    this.mesh = new Mesh( this.geometry, this.material );
  }

  addToScene(scene) {
    scene.add( this.mesh );
  }

  move() {
    if (this.direction === 'right') {
      this.target.x += 0.1;
    }
    this.checkCollisions();
    if (this.alive) {
      this.mesh.position.x = this.target.x;
      this.mesh.position.y = this.target.y;
    }
  }

  checkCollisions() {
    if (Math.abs(this.target.x) >= BOUNDS_SIZE) {
      this.alive = false;
      this.material.color.set('red');
    }
  }
}
