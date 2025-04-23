import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyUnitCubeQuad } from '../tp2/MyUnitCubeQuad.js';
import { MyBucket } from './MyBucket.js';
import { MyCylinder } from './MyCylinder.js';
import { MyHelice } from './MyHelice.js';
import { MyLandingGear } from './MyLandingGear.js';
import { MyPyramid } from './MyPyramid.js';
import { MySphere } from './MySphere.js';

export class MyHeli extends CGFobject {
    constructor(scene)
    {
        super(scene);
        this.scene = scene;
        this.init();
    }

    init(){
        this.sphere = new MySphere(this.scene, 80, 80, false);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.cylinder = new MyCylinder(this.scene, 90, 1); 
        this.pyramid = new MyPyramid(this.scene, 4, 1);
        this.helice = new MyHelice(this.scene);
        this.landingGear = new MyLandingGear(this.scene);
        this.bucket = new MyBucket(this.scene, 3,2);

        //the fuselage will be red (fire figthing helicopter)
        this.fuselage = new CGFappearance(this.scene);
        this.fuselage.setAmbient(0.651, 0.1725, 0.1686, 0.1);
        this.fuselage.setDiffuse(0.651, 0.1725, 0.1686, 0.1);
        this.fuselage.setSpecular(0.651, 0.1725, 0.1686, 1);
        this.fuselage.setShininess(1.0);
        this.fuselage.loadTexture('textures/helicopter_fuselage.png');

        this.silverFuselage = new CGFappearance(this.scene);
        this.silverFuselage.setAmbient(1, 1, 1, 0.0);
        this.silverFuselage.setDiffuse(1, 1, 1, 0.0);
        this.silverFuselage.setSpecular(1, 1, 1, 1.0);
        this.silverFuselage.setShininess(1.0);
        this.silverFuselage.loadTexture('textures/helicopter_fuselage.png');

        this.silver = new CGFappearance(this.scene);
        this.silver.setAmbient(0.6627, 0.6227, 0.6784, 0.0);
        this.silver.setDiffuse(0.6627, 0.6227, 0.6784, 0.0);
        this.silver.setSpecular(0.6627, 0.6227, 0.6784, 1.0);
        this.silver.setShininess(1.0);
    }

    display(){


        //cockpit
        this.scene.pushMatrix();
        this.scene.scale(5,2.5,2.5);
        this.fuselage.apply();
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
        this.scene.translate(-9.5,2,0);
        this.scene.rotate(Math.PI * 90 / 180, 0, 0,1);
        this.scene.rotate(Math.PI * 180 / 180, 1, 0,0);
        this.scene.scale(2,3,0.6);
        this.pyramid.display();
        this.scene.popMatrix();

        //helice
        this.scene.pushMatrix();
        this.scene.translate(0,4,0);
        this.silverFuselage.apply();
        this.helice.display();
        this.scene.popMatrix()


        //landing gear
        this.scene.pushMatrix();
        this.scene.translate(0, -3.6, 2);
        this.landingGear.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1,1,-1);
        this.scene.translate(0, -3.6, 2);
        this.landingGear.display();
        this.scene.popMatrix();

        //tail helice
        this.scene.pushMatrix();
        this.scene.translate(-8,2,1);
        this.scene.scale(0.4,0.4,0.4);
        this.scene.rotate(Math.PI * 90 / 180, 1, 0,0);
        this.helice.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3,1.5,0);
        this.scene.rotate(Math.PI * 60 / 180, 0, 0,1);
        this.scene.scale(0.5,1,1.5);
        this.silver.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
        //bucket
        this.scene.pushMatrix();
        this.scene.translate(0,-8,0);
        this.bucket.display();
        this.scene.popMatrix();

        //bucket cable
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * (-90) / 180, 1, 0, 0);
        this.scene.scale(0.1,0.1,8);
        this.cylinder.display();
        this.scene.popMatrix();

    }
}