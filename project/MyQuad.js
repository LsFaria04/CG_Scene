import { CGFobject } from "../lib/CGF.js";

export class MyQuad extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      -0.5, 0, -0.5,	//0
      -0.5, 0, 0.5,	//1
      0.5, 0, 0.5,	//2
      0.5, 0, -0.5,   //3
    ];

    this.indices = [
      //face 1
      0, 3, 2,
      2, 1 ,0,

      //opposite face
      0,1,2,
      2,3,0
    ];

    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ];

    this.texCoords = [
      0, 1,
      0, 0,
      1, 0,
      1, 1
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
