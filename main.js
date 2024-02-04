import {
  OrthographicCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import './css/styles.css';
import { Snake } from './Snake';
import { Grid } from './Grid';

const STEP_DURATION = 200;

const renderer = new WebGLRenderer();
renderer.setSize(
  window.innerHeight,
  window.innerHeight
);
document.body.appendChild( renderer.domElement );

const scene = new Scene();

const camera = new OrthographicCamera();
camera.position.z = 1;
scene.add( camera );

const grid = new Grid( scene );
const snake = new Snake({ grid, scene });

let start;
function animate(prevFrameTime) {
  if (!start) start = prevFrameTime;
  const elapsed = prevFrameTime - start;
  if (elapsed > STEP_DURATION) {
    start = prevFrameTime;
    snake.move();
    renderer.render( scene, camera );
  }
  if (snake.alive) {
    requestAnimationFrame( animate );
  } else {
    console.log('Game over!');
  }
}
renderer.render( scene, camera );
animate();
