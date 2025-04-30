import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js'

export class MyUnitCubeQuad extends CGFobject {
  constructor(scene) {
    super(scene);
    this.quad = new MyQuad(scene);
  }

  display() {
    const transforms = [
      { tx: 0, ty: 0, tz: 0.5 }, // front
      { tx: 0, ty: 0, tz: -0.5, ry: Math.PI }, // back
      { tx: -0.5, ty: 0, tz: 0, ry: -Math.PI / 2 }, // left
      { tx: 0.5, ty: 0, tz: 0, ry: Math.PI / 2 }, // right
      { tx: 0, ty: 0.5, tz: 0, rx: -Math.PI / 2 }, // top
      { tx: 0, ty: -0.5, tz: 0, rx: Math.PI / 2 }, // bottom
    ];

    for (let t of transforms) {
      this.scene.pushMatrix();
      if (t.rx) this.scene.rotate(t.rx, 1, 0, 0);
      if (t.ry) this.scene.rotate(t.ry, 0, 1, 0);
      if (t.tx || t.ty || t.tz) this.scene.translate(t.tx, t.ty, t.tz);
      this.quad.display();
      this.scene.popMatrix();
    }
  }
}
