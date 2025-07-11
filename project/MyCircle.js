import { CGFobject } from "../lib/CGF.js";

export class MyCircle extends CGFobject {
  constructor(scene, slices = 30) {
    super(scene);
    this.slices = slices;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    this.vertices.push(0, 0, 0); // center
    this.normals.push(0, 0, 1);
    this.texCoords.push(0.5, 0.5);

    for (let i = 0; i <= this.slices; i++) {
      const angle = (2 * Math.PI * i) / this.slices;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      this.vertices.push(x, y, 0);
      this.normals.push(0, 0, 1);
      this.texCoords.push(0.5 - 0.5 * x, 0.5 + 0.5 * y);

      if (i > 0) {
        this.indices.push(0, i, i + 1);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
