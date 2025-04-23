import {CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyPyramid } from './MyPyramid.js';
import { MySphere } from './MySphere.js';
import { MyUnitCube } from './MyUnitCube.js';

export class MyHeli extends CGFobject {
    constructor(scene)
    {
        super(scene);
        this.scene = scene;
        this.init();
    }

    init(){
        this.sphere = new MySphere(this.scene, 80, 80, false);
        this.cube = new MyUnitCube(this.scene);
        this.cylinder = new MyCylinder(this.scene, 90, 1); 
        this.pyramid = new MyPyramid(this.scene, 4, 1);
    }

    display(){

        //cockpit
        this.scene.pushMatrix();
        this.scene.scale(5,2.5,2.5);
        this.sphere.display();
        this.scene.popMatrix();

        //rotor base
        this.scene.pushMatrix();
        this.scene.scale(2,1,1);
        this.scene.translate(0,2.5,0);
        this.cube.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.translate(-1,2,0);
        this.scene.rotate(Math.PI * 90 / 180, 0, 1, 0);
        this.scene.scale(0.6,0.6,8);
        this.cylinder.display();
        this.scene.popMatrix();


        //rear wing
        this.scene.pushMatrix();
        this.scene.translate(-7.6,2.5,0);
        this.scene.scale(1.5,1.5,0.5);
        this.pyramid.display();
        this.scene.popMatrix();

        //rear wing (below cylinder)
        this.scene.pushMatrix();
        this.scene.translate(-7.6,1.5,0);
        this.scene.scale(1.5,1.5,0.5);
        this.scene.rotate(Math.PI * 180 / 180, 1, 0,0);
        this.pyramid.display();
        this.scene.popMatrix();

        //helice

        //helice center
        this.scene.pushMatrix();
        this.scene.translate(0,4,0);
        this.scene.scale(0.5,0.5,0.5);
        this.cube.display();
        this.scene.popMatrix();

        //heli 1
        this.scene.pushMatrix();
        this.scene.translate(2,4,0);
        this.scene.scale(4,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //heli 2
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * 180 / 180, 0, 1,0);
        this.scene.translate(2,4,0);
        this.scene.scale(4,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //heli 3
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * 90 / 180, 0, 1,0);
        this.scene.translate(2,4,0);
        this.scene.scale(4,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //heli 4
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * (-90) / 180, 0, 1,0);
        this.scene.translate(2,4,0);
        this.scene.scale(4,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //heli support
        this.scene.pushMatrix();
        this.scene.translate(0,3.5,0);
        this.scene.rotate(Math.PI * (-90) / 180, 0, 0,1);
        this.scene.scale(1,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();


        //landing gear

        //suport 1
        this.scene.pushMatrix();
        this.scene.translate(-1.5,-3.6,2);
        this.scene.rotate(Math.PI * 45 / 180, 1, 0, 0);
        this.scene.scale(0.15,0.15,2);
        this.cylinder.display();
        this.scene.popMatrix();

        //suport 2
        this.scene.pushMatrix();
        this.scene.translate(1.5,-3.6,2);
        this.scene.rotate(Math.PI * 45 / 180, 1, 0, 0);
        this.scene.scale(0.15,0.15,2);
        this.cylinder.display();
        this.scene.popMatrix();

        //suport 3
        this.scene.pushMatrix();
        this.scene.scale(1,1,-1);
        this.scene.translate(-1.5,-3.6,2);
        this.scene.rotate(Math.PI * 45 / 180, 1, 0, 0);
        this.scene.scale(0.15,0.15,2);
        this.cylinder.display();
        this.scene.popMatrix();

        //suport 4
        this.scene.pushMatrix();
        this.scene.scale(1,1,-1);
        this.scene.translate(1.5,-3.6,2);
        this.scene.rotate(Math.PI * 45 / 180, 1, 0, 0);
        this.scene.scale(0.15,0.15,2);
        this.cylinder.display();
        this.scene.popMatrix();

        //base support 1
        this.scene.pushMatrix();
        this.scene.translate(2.45,-3.6,2);
        this.scene.rotate(Math.PI * 90 / 180, 0, 1, 0);
        this.scene.scale(0.15,0.15,5);
        this.cylinder.display();
        this.scene.popMatrix();

        //base support 2
        this.scene.pushMatrix();
        this.scene.scale(1,1,-1);
        this.scene.translate(2.45,-3.6,2);
        this.scene.rotate(Math.PI * 90 / 180, 0, 1, 0);
        this.scene.scale(0.15,0.15,5);
        this.cylinder.display();
        this.scene.popMatrix();

    }
}