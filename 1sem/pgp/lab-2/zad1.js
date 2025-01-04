import mat4 from "./gl-matrix";

const vertexShaderSource = `
attribute vec3 aVertexPosition;
attribute vec4 aVertexColor; // Новый атрибут для цвета
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec4 vColor; // Переменная для передачи цвета во фрагментный шейдер

void main(void) {
  gl_PointSize = 5.0;
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vColor = aVertexColor; // Передача цвета
}
`;
const fragmentShaderSource = `
precision mediump float;
varying vec4 vColor; // Прием цвета из вершинного шейдера

void main(void) {
  gl_FragColor = vColor; // Использование цвета
}
`;


let points = [
  [4, 6], // 1
  [4, 12], // 8
  [8, 9], // 6
  [11, 9], // 3
  [12, 5], // 5
  [14, 2], // 12
  [12, 2], // 7
  [11, 2], // 11
  [9, 0], // 2
  [9, 7], // 9
  [9, 5], // 4
  [9, 7] // 10
].map((item) => item.map((item2) => Number((item2 / 10).toFixed(2))));

const colorsArr = [
  [91, 79, 59],
  [238, 236, 231],
  [223, 133, 110],
  [213, 224, 207],
  [127, 120, 96],
  [85, 34, 17],
  [101, 132, 119],
  [205, 164, 73],
  [210, 203, 188],
  [254, 133, 171],
  [0, 51, 17],
  [238, 221, 102],
].map((item) => item.map((item2) => Number((item2 / 255).toFixed(2))));

points.forEach((item, idx) => item.push(colorsArr[idx]));
points = points.flat(2);

var gl;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var shaderProgram;
var vertexBuffer, colorBuffer;

function initGL(canvas) {
  try {
    gl = canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch (e) {}

  if (!gl) alert("Не поддерживается WebGL");
}

const getShader = (type, source) => {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('Ошибка компиляции шейдера: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);

    return null;
  }

  return shader;
};

const initShaders = () => {
  const fragmentShader = getShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
  const vertexShader = getShader(gl.VERTEX_SHADER, vertexShaderSource);

  shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Не удалсь установить шейдеры');

    return;
  }

  gl.useProgram(shaderProgram);

  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(
    shaderProgram,
    'aVertexPosition'
  );
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  shaderProgram.vertexColorAttribute = gl.getAttribLocation(
    shaderProgram,
    'aVertexColor'
  );
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

  shaderProgram.pMatrixUniform = gl.getUniformLocation(
    shaderProgram,
    'uPMatrix'
  );
  shaderProgram.mvMatrixUniform = gl.getUniformLocation(
    shaderProgram,
    'uMVMatrix'
  );
};

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}

function initBuffers() {
  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

  vertexBuffer.itemSize = 5;
  vertexBuffer.numberOfItems = points.length / vertexBuffer.itemSize;

  const colors = [];
  for (let i = 0; i < points.length; i += 5) {
    colors.push(points[i + 2], points[i + 3], points[i + 4], 1.0);
  }

  colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  colorBuffer.itemSize = 4;
  colorBuffer.numberOfItems = colors.length / colorBuffer.itemSize;
}

function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(
    pMatrix,
    45,
    gl.viewportWidth / gl.viewportHeight,
    0.1,
    100.0
  );
  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, mvMatrix, [-0.7, -0.5, -2.0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexPositionAttribute,
    2,
    gl.FLOAT,
    false,
    vertexBuffer.itemSize * Float32Array.BYTES_PER_ELEMENT,
    0
  );

  // Настройка атрибута цвета
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(
    shaderProgram.vertexColorAttribute,
    colorBuffer.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );
  setMatrixUniforms();

  gl.drawArrays(eval(document.getElementById("selDrawType1").value), 0, vertexBuffer.numberOfItems);
}

export function webGLStart1() {
  var canvas = document.getElementById("canvas1");
  initGL(canvas);
  initShaders();
  initBuffers();
  gl.clearColor(0.2, 0.2, 0.2, 1.0);
  drawScene();
}

document.getElementById("selDrawType1").addEventListener("change", (event) => {
  drawScene();
});
