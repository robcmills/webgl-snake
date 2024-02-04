import { PlaneGeometry, MeshBasicMaterial, Mesh } from 'three';

export class Square {
  constructor({ color }) {
    this.geometry = new PlaneGeometry( 0.1, 0.1 );
    this.material = new MeshBasicMaterial({ color });
    this.mesh = new Mesh( this.geometry, this.material );
    return this.mesh;
  }
}
