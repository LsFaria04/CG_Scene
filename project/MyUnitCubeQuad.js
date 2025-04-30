import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js"

export class MyUnitCubeQuad extends CGFobject {
  constructor(scene) {
    super(scene);
    this.square = new MyQuad(scene);
  }

  display(){

    this.scene.translate(0,-0.5,0) //just used to centralize the object in the y axis

    //XZ Face bottom
    this.scene.pushMatrix();
    this.square.display();
    this.scene.popMatrix();

    //XZ Face upper
    this.scene.pushMatrix();
    this.scene.translate(0,1,0);
    this.square.display();
    this.scene.popMatrix();

    //YZ Face bottom
    this.scene.pushMatrix();
    this.scene.translate(-0.5,0.5,0);
    this.scene.rotate(Math.PI * (90) / 180, 0, 0, 1);
    this.square.display();
    this.scene.popMatrix();

    //YZ Face upper
    this.scene.pushMatrix();
    this.scene.translate(0.5,0.5,0);
    this.scene.rotate(Math.PI * (-90) / 180, 0, 0, 1);
    this.square.display();
    this.scene.popMatrix();

    //XY Face bottom
    this.scene.pushMatrix();
    this.scene.translate(0,0.5,-0.5);
    this.scene.rotate(Math.PI * (90) / 180, 1, 0, 0);
    this.square.display();
    this.scene.popMatrix();

    //XY Face upper
    this.scene.pushMatrix();
    this.scene.translate(0,0.5,0.5);
    this.scene.rotate(Math.PI * (-90) / 180, 1, 0, 0);
    this.square.display();
    this.scene.popMatrix();
    
}
}
