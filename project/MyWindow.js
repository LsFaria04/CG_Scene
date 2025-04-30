import {CGFobject} from '../lib/CGF.js';

export class MyWindow extends CGFobject {
    constructor(scene) {
      super(scene);
      // Initialize geometry for a square window in XZ-plane (vertical plane) with normal facing +Y
      this.initBuffers();
    }
    
    initBuffers() {
      // Define vertices (x, y, z) for a 1x1 window. Bottom at z=0, top at z=1, centered at x=0.
      this.vertices = [
        -0.5, 0, 0,   // bottom left
         0.5, 0, 0,   // bottom right
        -0.5, 0, 1,   // top left
         0.5, 0, 1    // top right
      ];
      // Two triangles (indices) to form the square
      this.indices = [
        0, 2, 1,
        2, 3, 1
      ];
      // Normals all facing +Y for a front-facing pane
      this.normals = [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
      ];
      // Use triangles as primitive type
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
    }
  }
