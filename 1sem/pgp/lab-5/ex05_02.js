var container, camera, controls, scene, renderer, light;

window.onload = function () {
  init();
  animate();
};

function init() {
  scene = new THREE.Scene();
  AddCamera(0, 0, 60);
  AddLight(0, 0, 500);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container = document.getElementById("MyWebGLApp");
  container.appendChild(renderer.domElement);

  var planeMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x9999ff,
  });
  var planGeo = new THREE.PlaneGeometry(100, 100, 10, 10);
  var plane = new THREE.Mesh(planGeo, planeMaterial);
  plane.position.set(50, 0, 50);
  plane.rotation.x = Math.PI / 2;
  scene.add(plane);

  var lineMaterial = new THREE.LineBasicMaterial({ color: 0xcc0000 });

  var mainShapeGeometry = new THREE.Geometry();
  var mainVertices = [
    new THREE.Vector3(1, 1, 0),
    new THREE.Vector3(7, 1, 0),
    new THREE.Vector3(7, 5, 0),
    new THREE.Vector3(9, 5, 0),
    new THREE.Vector3(9, 1, 0),
    new THREE.Vector3(11, 1, 0),
    new THREE.Vector3(11, 5, 0),
    new THREE.Vector3(13, 5, 0),
    new THREE.Vector3(13, 1, 0),
    new THREE.Vector3(14, 1, 0),
    new THREE.Vector3(14, 14, 0),
    new THREE.Vector3(13, 14, 0),
    new THREE.Vector3(13, 21, 0),
    new THREE.Vector3(11, 21, 0),
    new THREE.Vector3(11, 19, 0),
    new THREE.Vector3(7, 19, 0),
    new THREE.Vector3(7, 21, 0),
    new THREE.Vector3(3, 21, 0),

    new THREE.Vector3(2.1, 20.8, 0),
    new THREE.Vector3(1.6, 20.4, 0),
    new THREE.Vector3(1.2, 19.9, 0),

    new THREE.Vector3(1, 19, 0),
    new THREE.Vector3(1, 1, 0),
  ];

  mainShapeGeometry.vertices.push(...mainVertices);
  var mainLine = new THREE.Line(mainShapeGeometry, lineMaterial);
  scene.add(mainLine);

  var centerShapeGeometry = new THREE.Geometry();
  var centerVertices = [
    new THREE.Vector3(3, 8, 0),
    new THREE.Vector3(12, 8, 0),
    new THREE.Vector3(12, 11, 0),
    new THREE.Vector3(3, 11, 0),
    new THREE.Vector3(3, 8, 0),
  ];

  centerShapeGeometry.vertices.push(...centerVertices);
  var centerLine = new THREE.Line(centerShapeGeometry, lineMaterial);
  scene.add(centerLine);

  var centerCircleGeometry = new THREE.Geometry();
  var centerCircleRadius = 2;
  for (var i = 0; i <= 32; i++) {
    var angle = (i / 32) * Math.PI * 2;
    var x = 4 + centerCircleRadius * Math.cos(angle);
    var y = 18 + centerCircleRadius * Math.sin(angle);
    centerCircleGeometry.vertices.push(new THREE.Vector3(x, y, 0));
  }
  var centerCircle = new THREE.Line(centerCircleGeometry, lineMaterial);
  scene.add(centerCircle);
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
    1000
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
