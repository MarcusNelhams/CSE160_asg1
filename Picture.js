// draws picture of dog
function  DrawPicture() {
  // clear screen
  gl.clear(gl.COLOR_BUFFER_BIT);

  // picture should be rendered
  picture = true;

  // delta for sizing
  let d = 15/200.0;

  // left ear
  gl.uniform4f(u_FragColor, 1.0, 0.85, 0.85, 1.0);
  drawTriangle([-4*d, 2*d, -5*d, 5*d, -7*d, 5*d]);
  drawTriangle([-4*d, 2*d, -3*d, 3.5*d, -5*d, 5*d]);
  gl.uniform4f(u_FragColor, 0.5, 0.3, 0, 1.0);
  drawTriangle([-3*d, 3.5*d, -2*d, 5*d, -5*d, 5*d]);
  gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
  drawTriangle([-4*d, 2*d, -2*d, 2*d, -2*d, 5*d]);

  // top of head
  gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
  drawTriangle([-2*d, 3*d, 3*d, 5*d, -2*d, 5*d]);
  drawTriangle([-2*d, 3*d, 3*d, 3*d, 3*d, 5*d]);
  drawTriangle([-1*d, 2*d, 2*d, 2*d, -1*d, 3*d]);
  drawTriangle([2*d, 2*d, 2*d, 3*d, -1*d, 3*d]);

  // left eye
  gl.uniform4f(u_FragColor, 0.8, 0.8, 0.8, 1.0);
  drawTriangle([-2*d, 2.5*d, -1.5*d, 3*d, -2*d, 3*d]);
  drawTriangle([-2*d, 2*d, -1.5*d, 2*d, -2*d, 2.5*d]);
  drawTriangle([-2*d, 2.5*d, -1.75*d, 2.25*d, -1.75*d, 2.75*d]);
  drawTriangle([-1.75*d, 2.75*d, -1.25*d, 2.75*d, -1.5*d, 3*d]);
  drawTriangle([-1*d, 2.5*d, -1*d, 3*d, -1.5*d, 3*d]);
  drawTriangle([-1.25*d, 2.25*d, -1*d, 2.5*d, -1.25*d, 2.75*d]);
  drawTriangle([-1.5*d, 2*d, -1*d, 2*d, -1*d, 2.5*d]);
  drawTriangle([-1.5*d, 2*d, -1.25*d, 2.25*d, -1.75*d, 2.25*d]);

  // right eye
  gl.uniform4f(u_FragColor, 0.5, 0.3, 0, 1.0);
  drawTriangle([2*d, 2.5*d, 2.5*d, 3*d, 2*d, 3*d]);
  drawTriangle([2*d, 2*d, 2.5*d, 2*d, 2*d, 2.5*d]);
  drawTriangle([2*d, 2.5*d, 2.25*d, 2.25*d, 2.25*d, 2.75*d]);
  drawTriangle([2.25*d, 2.75*d, 2.75*d, 2.75*d, 2.5*d, 3*d]);
  drawTriangle([3*d, 2.5*d, 3*d, 3*d, 2.5*d, 3*d]);
  drawTriangle([2.75*d, 2.25*d, 3*d, 2.5*d, 2.75*d, 2.75*d]);
  drawTriangle([2.5*d, 2*d, 3*d, 2*d, 3*d, 2.5*d]);
  drawTriangle([2.5*d, 2*d, 3*d, 2.25*d, 2.25*d, 2.25*d]);

  // right ear
  gl.uniform4f(u_FragColor, 0.5, 0.3, 0, 1.0);
  drawTriangle([7*d, 4*d, 8*d, 5*d, 7*d, 5*d]);
  gl.uniform4f(u_FragColor, 1.0, 0.85, 0.85, 1.0);
  drawTriangle([5*d, 2*d, 7*d, 4*d, 3.5*d, 4*d]);
  drawTriangle([3.5*d, 4*d, 7*d, 5*d, 3*d, 5*d]);
  drawTriangle([3.5*d, 4*d, 7*d, 4*d, 7*d, 5*d]);
  gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
  drawTriangle([3*d, 2*d, 5*d, 2*d, 3*d, 5*d]);

  //left cheeck + under eye
  gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
  drawTriangle([-1*d, -4*d, -2*d, 0*d, -4*d, 2*d]);
  drawTriangle([-2*d, 0*d, -2*d, 2*d, -4*d, 2*d]);
  drawTriangle([-1*d, -4*d, -1*d, 0*d, -2*d, 0*d]);
  drawTriangle([-1*d, -1*d, -1*d, 0*d, -2*d, 0*d]);
  drawTriangle([-2*d, 0*d, 3*d, 2*d, -2*d, 2*d]);
  drawTriangle([-2*d, 0*d, 3*d, 0*d, 3*d, 2*d]);

  // right cheeck
  drawTriangle([2*d, -4*d, 5*d, 2*d, 2*d, 2*d]);
  drawTriangle([-2*d, 0*d, 3*d, 0*d, 3*d, 2*d]);

  // nose
  drawTriangle([-1*d, -1*d, 2*d, -1*d, -1*d, 0*d]);
  drawTriangle([2*d, -1*d, 2*d, 0*d, -1*d, 0*d]);
  gl.uniform4f(u_FragColor, 0.2, 0.05, 0.05, 1.0);
  drawTriangle([-1*d, -3*d, 2*d, -3*d, -1*d, -1*d]);
  drawTriangle([2*d, -3*d, 2*d, -1*d, -1*d, -1*d]);

  // mouth
  gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);
  drawTriangle([-1*d, -4*d, 0*d, -3*d, -1*d, -3*d]);
  drawTriangle([-1*d, -4*d, 0*d, -4*d, 0*d, -3*d]);
  drawTriangle([1*d, -4*d, 2*d, -3*d, 1*d, -3*d]);
  drawTriangle([1*d, -4*d, 2*d, -4*d, 2*d, -3*d]);
  drawTriangle([0*d, -4*d, 0.5*d, -3*d, 0*d, -3*d]);
  drawTriangle([1*d, -4*d, 1*d, -3*d, 0.5*d, -3*d]);
  gl.uniform4f(u_FragColor, 0.5, 0.5, 0.5, 1.0);
  drawTriangle([0*d, -4*d, 1*d, -4*d, 0.5*d, -3*d]);
  gl.uniform4f(u_FragColor, 0.8, 0.1, 0.1, 1.0);
  drawTriangle([-1*d, -4*d, 0.5*d, -4.5*d, 0.5*d, -4*d]);
  drawTriangle([0.5*d, -4.5*d, 2*d, -4*d, 0.5*d, -4*d]); 
}