import { CGFobject, CGFappearance } from '../lib/CGF.js';

export class MyWindow extends CGFobject {
    constructor(scene, texture) {
      super(scene);
      this.texture = texture;

      this.appearance = new CGFappearance(scene);
      this.appearance.setAmbient(1.0, 1.0, 1.0, 1.0);
      this.appearance.setDiffuse(1.0, 1.0, 1.0, 1.0);
      this.appearance.setSpecular(0.1, 0.1, 0.1, 1.0);
      this.appearance.setShininess(5.0);

      if (texture) {
        this.appearance.setTexture(texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
      }

      this.initBuffers();
    }
    
    initBuffers() {
      // Define vertices (x, y, z) for a 1x1 window. Bottom at z=0, top at z=1, centered at x=0.
      this.vertices = [
        -1, 0, 0,   // bottom left
         1, 0, 0,   // bottom right
        -1, 0, 1,   // top left
         1, 0, 1    // top right
      ];
      // Two triangles (indices) to form the square
      this.indices = [
        0, 2, 1,
        2, 3, 1,
        1, 3, 2,
        1, 2, 0
      ];
      // Normals all facing +Y for a front-facing pane
      this.normals = [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
      ];

      this.texCoords = [
        0, 0, // bottom left (u=0, v=0)
        1, 0, // bottom right (u=1, v=0)
        0, 1, // top left (u=0, v=1)
        1, 1  // top right (u=1, v=1)
      ];

      // Use triangles as primitive type
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
    }

    display() {
      this.scene.pushMatrix();
      this.appearance.apply();
      super.display();
      this.scene.popMatrix();
    }
  }
