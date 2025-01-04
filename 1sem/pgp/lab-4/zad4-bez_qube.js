const data = [
  [4, 6],
  [9, 0],
  [11, 9],
  [9, 5],
  [12, 5],
  [8, 9],
  [12, 2],
  [4, 12],
  [9, 5],
  [9, 7],
  [11, 2],
  [14, 2],
].sort(([x1], [x2]) => x1 - x2);

const curves = new Array(4)
  .fill(null)
  .map(
    (_, idx) =>
      new THREE.CubicBezierCurve(
        ...data
          .slice(idx * 3, idx * 3 + 4)
          .map((item) => new THREE.Vector2(...item))
      )
  );


var container, camera, controls, scene, renderer, light;

window.onload = function () {
  init();
  animate();
};

function init() {
  scene = new THREE.Scene();
  AddCamera(0, 0, 40);
  AddLight(0, 0, 500);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container = document.getElementById("MyWebGLApp");
  container.appendChild(renderer.domElement);

  for (const curve of curves) {
    const curve3D = new THREE.CatmullRomCurve3(
      curve.getPoints(50).map(point => new THREE.Vector3(point.x, point.y, 0))
    );

    var tubeGeometry = new THREE.TubeGeometry(curve3D, 100, 0.5, 8, false);

    var material = new THREE.MeshPhongMaterial({
      color: 0x9b2d30,
      specular: 0xd53e07,
      emissive: 0x000000,
      shininess: 40,
      shading: THREE.FlatShading,
      blending: THREE.NormalBlending,
      depthTest: true,
    });

    var tube = new THREE.Mesh(tubeGeometry, material);

    scene.add(tube);
  }

  var axes = new THREE.AxisHelper(15);
  axes.position.set(0, 0, 0);
  scene.add(axes);

  var gridXY = new THREE.GridHelper(14, 10);
  gridXY.position.set(7, 7, 0);
  gridXY.rotation.x = Math.PI / 2;
  gridXY.setColors(new THREE.Color(0x0000ff), new THREE.Color(0x0000ff));
  scene.add(gridXY);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
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
  controls = new THREE.TrackballControls(camera, container);
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
