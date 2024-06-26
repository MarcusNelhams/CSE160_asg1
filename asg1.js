// HelloPoint1.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// Global Vars
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

// Sets up WebGL
function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  // gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", {preserveDrawingBuffer:true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  return;
}

// Connects js vars to GLSL vars in shaders
function connectVarsToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
  return;
}

// global buffer for Point objects
let g_shapesList = [];

// Extract mouse coords and return WebGL coords
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // Get mouse x position
  var y = ev.clientY; // Get mouse y position
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2) / (canvas.width / 2);
  y = (canvas.height/2 - (y - rect.top)) / (canvas.height / 2);

  return [x, y];
}

// global UI elements
let g_selected_colors = [1.0, 1.0, 1.0, 1.0];
let g_selected_size = 5;
let g_selected_shape = 'square';
let g_selected_segments = 10;
let g_selected_sketchSpeed = 1;

function addActionsForHtmlUI() {
  // clear canvas button
  document.getElementById('clear').onclick = function() { g_shapesList = []; picture = false; renderAllShapes(); last_xy = [0, 0]; };

  // choose shape buttons
  document.getElementById('squareButton').onclick = function() { g_selected_shape = this.value; };
  document.getElementById('triangleButton').onclick = function() { g_selected_shape = this.value; };
  document.getElementById('circleButton').onclick = function() { g_selected_shape = this.value; };

  // color sliders
  document.getElementById('redSlide').addEventListener('mouseup', function() { g_selected_colors[0] = this.value / 100; });
  document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selected_colors[1] = this.value / 100; });
  document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selected_colors[2] = this.value / 100; });

  // shape size slider
  document.getElementById('sizeSlide').addEventListener('mouseup', function() { g_selected_size = this.value; });
  
  // circle segment count
  document.getElementById('segmentSlide').addEventListener('mouseup', function() { g_selected_segments = this.value; });
  
  // draw picture
  document.getElementById('pictureButton').onclick = DrawPicture;

  // etch-a-sketch speed
  document.getElementById('sketchSpeed').addEventListener('mouseup', function() { g_selected_sketchSpeed = this.value; });
  return;
}


// keep track if pictuure drawn
let picture = false;

// Render all shapes defined by buffers onto canvas
function renderAllShapes() {
  // Clear Canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  if (picture) {
    DrawPicture();
  }

  // draw each shape in shapesList
  var len = g_shapesList.length;
  for (var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }
  return;
}

// save previous coords for mouseless draw
let last_xy = [0, 0];

// registers mouse click and pushes inputed values to buffers
function handleOnClick(ev) {
  // if mouse button is not down, return
  if (ev.buttons != 1 && !(keysDown[16])) {
    return;
  }
  console.log("here");

  let [x, y] = [0, 0];
  // get webGL coords from click
  if (ev.buttons == 1) {
    [x, y] = convertCoordinatesEventToGL(ev);
    last_xy = [x, y];
  } else {
    [x, y] = last_xy;
  }

  // create and define a new point
  if (g_selected_shape === 'square') {
    let point = new Point();
    point.position = [x, y];
    point.color = g_selected_colors.slice();
    point.size = g_selected_size;
    g_shapesList.push(point);
  }

  // create and define a new triangle
  if (g_selected_shape === 'triangle') {
    let triangle = new Triangle();
    triangle.position = [x, y];
    triangle.color = g_selected_colors.slice();
    triangle.size = g_selected_size;
    g_shapesList.push(triangle);
  }

  // create and define a new circle
  if (g_selected_shape === 'circle') {
    let circle = new Circle();
    circle.position = [x, y];
    circle.color = g_selected_colors.slice();
    circle.size = g_selected_size;
    circle.segments = g_selected_segments;
    g_shapesList.push(circle);
  }

  // console.log(g_selected_colors.slice());
  renderAllShapes();
  return;
}

// keep track of currently down  keys
let keysDown = {}

// handles when a keyboard key is pressed
function handleOnKeyDown(ev) {
  // store keys pressed
  keysDown[ev.keyCode] = true;

  // delta
  let d = g_selected_sketchSpeed/200.0;

  // if spacebar down
  if (keysDown[16]) {
    if (keysDown[87]) {
      // up
      last_xy[1] += d;
      handleOnClick(ev);
    }
    if (keysDown[83]) {
      // down
      last_xy[1] -= d;
      handleOnClick(ev);
    }
    if (keysDown[65]) {
      // left
      last_xy[0] -= d;
      handleOnClick(ev);
    }
    if (keysDown[68]) {
      // right
      last_xy[0] += d;
      handleOnClick(ev);
    }
  }
}

// handles if a keyboard key is unpressed
function handleOnKeyUp(ev) {
  keysDown[ev.keyCode] = false;
}

function main() {

  setupWebGL();
  connectVarsToGLSL();
  addActionsForHtmlUI();

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  canvas.onmousedown = handleOnClick;
  canvas.onmousemove = handleOnClick;
  document.addEventListener('keydown', handleOnKeyDown);
  document.addEventListener('keyup', handleOnKeyUp);
}
