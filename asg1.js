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
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
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
}

// global buffers for point attributes
let g_points = [];
let g_colors = [];
let g_sizes  = [];

// Extract mouse coords and return WebGL coords

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // Get mouse x position
  var y = ev.clientY; // Get mouse y position
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2) / (canvas.width / 2);
  y = (canvas.height/2 - (y - rect.top)) / (canvas.height / 2);

  return [x, y];
}

// registers mouse click and pushes inputed values to buffers
function handleOnClick(ev) {
  let [x, y] = convertCoordinatesEventToGL(ev);

  g_points.push([x, y]);
  g_colors.push(g_selected_colors.slice());
  g_sizes.push(g_selected_size);

  // console.log(selected_colors.slice());
  renderAllShapes();
  return;
}

// Render all shapes defined by buffers onto canvas
function renderAllShapes() {
  // Clear Canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for (var i = 0; i < len; i++) {
    var xy = g_points[i];
    var rgba = g_colors[i];
    var size = g_sizes[i];

    // Pass vertex position to shader
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass vertex color to shader
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], 1.0);
    // Pass shape size to shader
    gl.uniform1f(u_Size, size)
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  return;
}

// global UI elements
let g_selected_colors = [1.0, 1.0, 1.0, 1.0];
let g_selected_size = 5;

function addActionsForHtmlUI() {
  // clear canvas
  // document.getElementById('clear').onclick = function 

  // color sliders
  document.getElementById('redSlide').addEventListener('mouseup', function() { g_selected_colors[0] = this.value / 100; });
  document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selected_colors[1] = this.value / 100; });
  document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selected_colors[2] = this.value / 100; });

  // shape size slider
  document.getElementById('sizeSlide').addEventListener('mouseup', function() { g_selected_size = this.value; });
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
}
