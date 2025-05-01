import {CGFobject} from '../lib/CGF.js';
import { MyUnitCubeQuad } from '../tp2/MyUnitCubeQuad.js';
import { MyUnitCube } from './MyUnitCube.js';

export class MyHelice extends CGFobject {
    constructor(scene)
    {
        super(scene);
        this.scene = scene;
        this.init();
    }

    init(){
        this.cube = new MyUnitCubeQuad(this.scene);
    }

    display(){
        //helice center
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.cube.display();
        this.scene.popMatrix();

        //heli 1
        this.scene.pushMatrix();
        this.scene.translate(2,0,0);
        this.scene.scale(4,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //heli 2
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * 180 / 180, 0, 1,0);
        this.scene.translate(2,0,0);
        this.scene.scale(4,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //heli 3
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * 90 / 180, 0, 1,0);
        this.scene.translate(2,0,0);
        this.scene.scale(4,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //heli 4
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * (-90) / 180, 0, 1,0);
        this.scene.translate(2,0,0);
        this.scene.scale(4,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //heli support
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI * (-90) / 180, 0, 0,1);
        this.scene.scale(1,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();
    }
}