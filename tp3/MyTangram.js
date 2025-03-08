import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";


export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.init(scene);
        this.initMaterials(scene);
    }
    
    init(scene) {
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.smalltriangle = new MyTriangleSmall(scene);
        this.bigtriangle = new MyTriangleBig(scene);

        //translation values
        this.tx = -1.8;
        this.ty = 2.8;
        this.tz = 0;

        this.scaleFactor = 0.5;
    }
    enableNormalViz(){
        this.triangle.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.smalltriangle.enableNormalViz();
        this.bigtriangle.enableNormalViz();
    }

     initMaterials(scene) {
            // Blue Specular 
            this.blue = new CGFappearance(scene);
            this.blue.setAmbient(	0.447, 0.737, 0.831, 0.0);
            this.blue.setDiffuse(0.447, 0.737, 0.831, 0.0);
            this.blue.setSpecular(0.447, 0.737, 0.831, 1.0);
            this.blue.setShininess(10.0);
    
            // Orange Specular 
            this.orange = new CGFappearance(scene);
            this.orange.setAmbient(	1, 0.647, 0, 0.0);
            this.orange.setDiffuse(1, 0.647, 0, 0.0);
            this.orange.setSpecular(1, 0.647, 0, 1.0);
            this.orange.setShininess(10.0);
    
            // Pink Specular
            this.pink = new CGFappearance(scene);
            this.pink.setAmbient(1, 0.753, 0.796, 0.0);
            this.pink.setDiffuse(1, 0.753, 0.796, 0.0);
            this.pink.setSpecular(1, 0.753, 0.796, 1.0);
            this.pink.setShininess(10.0);
    
            //Purple Specular
            this.purple = new CGFappearance(scene);
            this.purple.setAmbient(0.576, 0.439, 0.859, 0.0);
            this.purple.setDiffuse(0.576, 0.439, 0.859, 0.0);
            this.purple.setSpecular(0.576, 0.439, 0.859, 1.0);
            this.purple.setShininess(10.0);

            // Red Specular 
            this.red = new CGFappearance(scene);
            this.red.setAmbient(1, 0, 0, 1.0);
            this.red.setDiffuse(1, 0, 0, 1.0);
            this.red.setSpecular(1, 0, 0, 1.0);
            this.red.setShininess(10.0);

            //green Specular
            this.custom = scene.customMaterial;
            /*
            this.green.setAmbient(0.486, 0.988, 0, 0.0);
            this.green.setDiffuse(0.486, 0.988, 0, 0.0);
            this.green.setSpecular(0.486, 0.988, 0, 1.0);
            this.green.setShininess(10.0);
            */

            //Yellow Specular
            this.yellow = new CGFappearance(scene);
            this.yellow.setAmbient(1, 1, 0, 0.0);
            this.yellow.setDiffuse(1, 1, 0, 0.0);
            this.yellow.setSpecular(1, 1, 0, 1.0);
            this.yellow.setShininess(10.0);
    
        }
    updateBuffers(){

    }

    display() {
        var trans = [
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            this.tx,
            this.ty,
            this.tz,
            1.0
          ];

          var sca = [
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
          ];

        

        //blue triangle
        this.scene.pushMatrix();
        this.scene.scale(0.8,0.8,0.8),
        this.scene.rotate(Math.PI * (90) / 180, 0, 0, 1);
        this.scene.translate(-0.2,0.2,0);
        this.blue.apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        //pink triangle
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5),
        this.scene.translate(2.25,0.25,0);
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();

        //purple triangle
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI * (-180) / 180, 0, 0, 1);
        this.scene.translate(-3,0.7,0);
        this.purple.apply();
        this.smalltriangle.display();
        this.scene.popMatrix();
    
        //orange triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * (-90) / 180, 0, 0, 1);
        this.scene.translate(0,-1,0);
        this.orange.apply();
        this.smalltriangle.display();
        this.scene.popMatrix();

        //red triangle
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI * (90) / 180, 0, 0, 1);
        this.scene.translate(-1,2,0);
        this.red.apply();
        this.smalltriangle.display();
        this.scene.popMatrix();

        //green diamond
        this.scene.pushMatrix();
        this.scene.multMatrix(sca);
        this.scene.multMatrix(trans);
        this.custom.apply();
        this.diamond.display();
        this.scene.popMatrix();
        
        //yellow parallelogram
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI * (-90) / 180, 0, 0, 1);
        this.scene.scale(1,-1,0);
        this.scene.translate(-2,2,0);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
        

    }
}

