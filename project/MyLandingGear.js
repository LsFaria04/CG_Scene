import {CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyPyramid } from './MyPyramid.js';
import { MySphere } from './MySphere.js';
import { MyUnitCube } from './MyUnitCube.js';

export class MyLandingGear extends CGFobject {
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

        //landing gear

        //suport 1
        this.scene.pushMatrix();
        this.scene.translate(-1.5,0,0);
        this.scene.rotate(Math.PI * 45 / 180, 1, 0, 0);
        this.scene.scale(0.15,0.15,2);
        this.cylinder.display();
        this.scene.popMatrix();

        //suport 2
        this.scene.pushMatrix();
        this.scene.translate(1.5,0,0);
        this.scene.rotate(Math.PI * 45 / 180, 1, 0, 0);
        this.scene.scale(0.15,0.15,2);
        this.cylinder.display();
        this.scene.popMatrix();


        //base support 1
        this.scene.pushMatrix();
        this.scene.translate(2.45,0,0);
        this.scene.rotate(Math.PI * 90 / 180, 0, 1, 0);
        this.scene.scale(0.15,0.15,5);
        this.cylinder.display();
        this.scene.popMatrix();


    }
}