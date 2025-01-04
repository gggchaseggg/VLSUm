import * as THREE from "three";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

// глобальные переменные
var container, camera, controls, scene, renderer, light;
var Cube, Cube2;
// начинаем рисовать после полной загрузки страницы
export default function () {
  init();
  animate();
}
function init() {
  scene = new THREE.Scene(); 
  AddCamera(10, 10, 20); 
  AddLight(0, 0, 20); 

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  container = document.getElementById("MyWebGLApp-1");
  container.appendChild(renderer.domElement);
  //добавляем куб
  var geometry = new THREE.BoxGeometry(1, 8, 6);
  var material = new THREE.MeshNormalMaterial();
  Cube = new THREE.Mesh(geometry, material);
  Cube.position.z = 0;
  Cube.rotation.z = Math.PI / 6;

  var geometry2 = new THREE.BoxGeometry(1, 3, 1);
  var material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
  Cube2 = new THREE.Mesh(geometry2, material2);
  Cube2.position.z = 0;
  Cube2.rotation.z = Math.PI / 6;

  const group = new THREE.Group()
  group.add(Cube)
  group.add(Cube2)
  group.updateMatrix();

  scene.add(group);
}
function animate() {
  requestAnimationFrame(animate);
  render();
}
function render() {
  Cube.position.x = Cube.position.x + 0; 
  Cube.rotation.y = Cube.rotation.y + 0.01; 
  Cube2.position.x = Cube2.position.x + 0; 
  Cube2.rotation.y = Cube2.rotation.y + 0.01; 
  controls.update();
  renderer.render(scene, camera);
}
function AddCamera(X, Y, Z) {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(X, Y, Z);
  controls = new TrackballControls(camera, container);
  controls.rotateSpeed = 2;
  controls.noZoom = false;
  controls.zoomSpeed = 1.2;
  controls.staticMoving = true;
}
function AddLight(X, Y, Z) {
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(X, Y, Z);
  scene.add(light);
}
