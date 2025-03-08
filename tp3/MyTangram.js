import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';


export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.init(scene);
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
        this.triangle.display();
        this.scene.popMatrix();
    
        //pink triangle
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5),
        this.scene.translate(2.25,0.25,0);
        this.triangle.display();
        this.scene.popMatrix();

        //purple triangle
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI * (-180) / 180, 0, 0, 1);
        this.scene.translate(-3,0.7,0);
        this.smalltriangle.display();
        this.scene.popMatrix();
    
        //orange triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * (-90) / 180, 0, 0, 1);
        this.scene.translate(0,-1,0)
        this.smalltriangle.display();
        this.scene.popMatrix();

        //red triangle
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI * (90) / 180, 0, 0, 1);
        this.scene.translate(-1,2,0)
        this.smalltriangle.display();
        this.scene.popMatrix();

        //green diamond
        this.scene.pushMatrix();
        this.scene.multMatrix(sca);
        this.scene.multMatrix(trans);
        this.diamond.display();
        this.scene.popMatrix();
        
        //yellow parallelogram
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI * (-90) / 180, 0, 0, 1);
        this.scene.scale(1,-1,0);
        this.scene.translate(-2,2,0);
        this.parallelogram.display();
        this.scene.popMatrix();
        

    }
}

