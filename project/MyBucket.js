import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyUnitCubeQuad } from '../tp2/MyUnitCubeQuad.js';
import { MyCylinder } from './MyCylinder.js';

export class MyBucket extends CGFobject {
    constructor(scene, height, width)
    {
        super(scene);
        this.scene = scene;
        this.height = height;
        this.width = width;
        this.init();
    }

    init(){
        this.semiSphere = new MySphere(this.scene,80, 80, false, true);
        this.semiSphere2 = new MySphere(this.scene,80, 80, true, true);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.cylinder = new MyCylinder(this.scene, 90, 1);
        
        this.bucketMaterial = new CGFappearance(this.scene);
        this.bucketMaterial.setAmbient(0.9922, 0.80, 0.0510, 0.2);
        this.bucketMaterial.setDiffuse(0.9922, 0.80, 0.0510, 1);
        this.bucketMaterial.setSpecular(0.9922, 0.80, 0.0510, 0);
        this.bucketMaterial.setShininess(1.0);

        this.silver = new CGFappearance(this.scene);
        this.silver.setAmbient(0.6627, 0.6227, 0.6784, 0.0);
        this.silver.setDiffuse(0.6627, 0.6227, 0.6784, 0.0);
        this.silver.setSpecular(0.6627, 0.6227, 0.6784, 1.0);
        this.silver.setShininess(1.0);
    }

    display(){
        //bucket
        this.scene.pushMatrix();
        this.scene.scale(this.width/2, this.height, this.width/2);
        this.bucketMaterial.apply();
        this.semiSphere.display();
        this.semiSphere2.display();
        this.scene.popMatrix();

        //bucket support 1
        this.scene.pushMatrix();
        this.scene.translate(- this.width / 2,-0.2,0);
        this.scene.rotate(Math.PI * (-90) / 180, 0, 1, 0);
        this.scene.rotate(Math.PI * 45 / 180, 1, 0, 0);
        //the scale in z is the legth of the support. We want the hipotenuse of triangle that the support makes with the bucket
        this.scene.scale(0.05,0.05, (this.width/ 2) / Math.cos(Math.PI * 45 / 180)); 
        this.silver.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        //support connection to bucket 1
        this.scene.pushMatrix();
        this.scene.translate(- this.width / 2,-0.2,0);
        this.scene.scale(0.2,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //bucket support 2
        this.scene.pushMatrix();
        this.scene.translate(this.width / 2,-0.2,0);
        this.scene.rotate(Math.PI * (-90) / 180, 0, 1, 0);
        this.scene.rotate(Math.PI * (45 + 90) / 180, 1, 0, 0);
        //the scale in z is the legth of the support. We want the hipotenuse of triangle that the support makes with the bucket
        this.scene.scale(0.05,0.05, (this.width/ 2) / Math.cos(Math.PI * 45 / 180)); 
        this.cylinder.display();
        this.scene.popMatrix();

        //support connection to bucket 2
        this.scene.pushMatrix();
        this.scene.translate(this.width / 2,-0.2,0);
        this.scene.scale(0.2,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //bucket support 3
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,-this.width / 2);
        this.scene.rotate(Math.PI * (-180) / 180, 0, 1, 0);
        this.scene.rotate(Math.PI * 45 / 180, 1, 0, 0);
        //the scale in z is the legth of the support. We want the hipotenuse of triangle that the support makes with the bucket
        this.scene.scale(0.05,0.05, (this.width/ 2) / Math.cos(Math.PI * 45 / 180)); 
        this.cylinder.display();
        this.scene.popMatrix();

        //support connection to bucket 3
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,-this.width / 2);
        this.scene.scale(0.2,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //bucket support 4
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,this.width / 2);
        this.scene.rotate(Math.PI * (-180) / 180, 0, 1, 0);
        this.scene.rotate(Math.PI * (45 + 90) / 180, 1, 0, 0);
        //the scale in z is the legth of the support. We want the hipotenuse of triangle that the support makes with the bucket
        this.scene.scale(0.05,0.05, (this.width/ 2) / Math.cos(Math.PI * 45 / 180)); 
        this.cylinder.display();
        this.scene.popMatrix();

        //support connection to bucket 4
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,-this.width / 2);
        this.scene.scale(0.2,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

        //connection between supports
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2 + Math.tan(Math.PI * 45 / 180) * this.width/2 ,0);
        this.scene.scale(0.2,0.2,0.2);
        this.cube.display();
        this.scene.popMatrix();

    }
    

    
}