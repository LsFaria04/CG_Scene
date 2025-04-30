import {CGFobject} from '../lib/CGF.js';

class MyQuad extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      -0.5, -0.5, 0,  // bottom-left
       0.5, -0.5, 0,  // bottom-right
      -0.5,  0.5, 0,  // top-left
       0.5,  0.5, 0   // top-right
    ];

    this.indices = [
      0, 1, 2,
      1, 3, 2
    ];

    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ];

    this.texCoords = [
      0, 1,
      1, 1,
      0, 0,
      1, 0
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
