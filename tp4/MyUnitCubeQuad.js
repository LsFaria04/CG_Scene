import {CGFobject, CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, texTop, texFront, texRight,texBack, texLeft, texBottom) {
        super(scene);
        this.scene = scene;
        var canvas = document.querySelector('canvas');
        this.gl = canvas.getContext('webgl2');
        this.init(scene,texTop, texFront, texRight,texBack, texLeft, texBottom);
    }
    
    init(scene, texTop, texFront, texRight,texBack, texLeft, texBottom) {
        this.topMaterial = new CGFappearance(scene);
        this.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture('images/default.png');
        if(texTop){
            this.topMaterial.setTexture(texTop);
            this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }

        this.frontMaterial = new CGFappearance(scene);
        this.frontMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.frontMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.frontMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.frontMaterial.setShininess(10.0);
        this.frontMaterial.loadTexture('images/default.png');
        if(texFront){
            this.frontMaterial.setTexture(texFront);
            this.frontMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }

        this.rightMaterial = new CGFappearance(scene);
        this.rightMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.rightMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rightMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.rightMaterial.setShininess(10.0);
        this.rightMaterial.loadTexture('images/default.png');
        if(texRight){
            this.rightMaterial.setTexture(texRight);
            this.rightMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }

        this.backMaterial = new CGFappearance(scene);
        this.backMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.backMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.backMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.backMaterial.setShininess(10.0);
        this.backMaterial.loadTexture('images/default.png');
        if(texBack){
            this.backMaterial.setTexture(texBack);
            this.backMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }

        this.leftMaterial = new CGFappearance(scene);
        this.leftMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.leftMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leftMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leftMaterial.setShininess(10.0);
        this.leftMaterial.loadTexture('images/default.png');
        if(texLeft){
            this.leftMaterial.setTexture(texLeft);
            this.leftMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }
        this.bottomMaterial = new CGFappearance(scene);
        this.bottomMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setShininess(10.0);
        this.bottomMaterial.loadTexture('images/default.png');
        if(texBottom){
            this.bottomMaterial.setTexture(texBottom);
            this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');
        }
        this.square = new MyQuad(this.scene);
    }

    display(){

        this.scene.translate(0,-0.5,0) //just used to centralize the object in the y axis

        //XZ Face bottom
        this.scene.pushMatrix();
        this.bottomMaterial.apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.square.display();
        this.scene.popMatrix();

        //XZ Face upper
        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.topMaterial.apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.square.display();
        this.scene.popMatrix();

        //YZ Face bottom
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0);
        this.square.updateTexCoords([1, 1,  0, 1,  0, 0,  1, 0]);
        this.scene.rotate(Math.PI * (90) / 180, 0, 0, 1);
        ;
        this.rightMaterial.apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.square.display();
        this.scene.popMatrix();

        //YZ Face upper
        this.scene.pushMatrix();
        this.scene.translate(0.5,0.5,0);
        this.scene.rotate(Math.PI * (-90) / 180, 0, 0, 1);
        this.square.updateTexCoords([0, 0,  1, 0,  1, 1,  0, 1]);
        this.leftMaterial.apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.square.display();
        this.scene.popMatrix();

        //XY Face bottom
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-0.5);
        this.scene.rotate(Math.PI * (90) / 180, 1, 0, 0);
        this.square.updateTexCoords([0, 0,  0, 1,  1, 1,  1, 0]);
        this.backMaterial.apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.square.display();
        this.scene.popMatrix();

        //XY Face upper
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(Math.PI * (-90) / 180, 1, 0, 0);
        this.square.updateTexCoords([0, 1,0, 0,1, 0,1, 1]);
        this.frontMaterial.apply();
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST)
        this.square.display();
        this.scene.popMatrix();
        
    }
}