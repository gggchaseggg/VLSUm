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

const curves = new Array(5)
  .fill(null)
  .map(
    (_, idx) =>
      new THREE.QuadraticBezierCurve(
        ...data
          .slice(idx * 2, idx * 2 + 3)
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

  var geometry = new THREE.Geometry();
  var material = new THREE.LineBasicMaterial({ color: 0x00cc00 });
  for (const curve of curves) {
    for (var i = 0; i <= 1; i += 0.01) {
      var x = curve.getPoint(i).x;
      var y = curve.getPoint(i).y;
      var vec = new THREE.Vector3(x, y, 0);
      geometry.vertices.push(vec);
    }
  }

  var line = new THREE.Line(geometry, material);
  scene.add(line);

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
