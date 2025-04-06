import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
    constructor(scene, texture, position)
    {
        super(scene);
        this.scene = scene;
        this.sphere = new MySphere(scene, 100, 100, true);
        this.texture = texture;
        this.position = position
        this.initBuffers();
    }
    
    initBuffers() {
        this.material = new CGFappearance(this.scene);
        this.material.setShininess(10.0);
        this.material.setEmission(0.9, 0.9, 0.9, 1);
        this.material.setTexture(this.texture)
    }

    setPosition(position){
        this.position = position;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], 0, this.position[2]);
        this.scene.scale(200,200,200);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}