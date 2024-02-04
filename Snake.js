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
  tail = [];

  constructor({ grid, scene }) {
    this.grid = grid;
    this.scene = scene;
    this.geometry = new PlaneGeometry( 0.1, 0.1 );
    this.material = new MeshBasicMaterial({ color: 'cyan' });
    this.head = new Mesh( this.geometry, this.material );
    scene.add( this.head );

    window.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' && this.direction !== 'down') {
        this.direction = 'up';
      } else if (event.key === 'ArrowDown' && this.direction !== 'up') {
        this.direction = 'down';
      } else if (event.key === 'ArrowLeft' && this.direction !== 'right') {
        this.direction = 'left';
      } else if (event.key === 'ArrowRight' && this.direction !== 'left') {
        this.direction = 'right';
      }
    });
  }

  move() {
    if (this.direction === 'right') {
      this.target.x += 0.1;
    } else if (this.direction === 'left') {
      this.target.x -= 0.1;
    } else if (this.direction === 'up') {
      this.target.y += 0.1;
    } else if (this.direction === 'down') {
      this.target.y -= 0.1;
    }

    this.checkCollisions();

    if (!this.alive) return;

    if (this.growing) {
      this.growTail();
      this.grid.spawnFood();
      this.growing = false;
    } else if (this.tail.length) {
      this.tail[0].position.x = this.head.position.x;
      this.tail[0].position.y = this.head.position.y;
      const tip = this.tail[0];
      this.tail = this.tail.slice(1);
      this.tail.push(tip);
    }

    this.head.position.x = this.target.x;
    this.head.position.y = this.target.y;
  }

  checkCollisions() {
    // Bounds collision
    if (
      Math.abs(this.target.x) >= BOUNDS_SIZE ||
      Math.abs(this.target.y) >= BOUNDS_SIZE
    ) {
      this.alive = false;
      this.material.color.set('red');
      return;
    }

    // Food collision
    if (
      Math.abs(this.head.position.x - this.grid.food.position.x) < 0.05 &&
      Math.abs(this.head.position.y - this.grid.food.position.y) < 0.05
    ) {
      this.growing = true;
    }
  }

  growTail() {
    const newTail = this.head.clone();
    this.scene.add( newTail );
    this.tail.push( newTail );
  }
}
