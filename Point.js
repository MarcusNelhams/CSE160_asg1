// point class that holds point values
class Point {
  constructor() {
    this.type = 'point';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Quit using a buffer to send the attribute
    gl.disableVertexAttribArray(a_Position);
    // Pass vertex position to shader
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass vertex color to shader
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    // Pass shape size to shader
    gl.uniform1f(u_Size, size)
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}