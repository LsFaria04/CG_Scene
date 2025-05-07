import {CGFobject, CGFappearance} from '../lib/CGF.js';

export class MyWaterDrop extends CGFobject {
    constructor(scene, position, velocity, direction) {
        super(scene);
        this.scene = scene;
        this.position = position;
        this.velocity = velocity;
        this.direction = direction;
        this.lifetime = 5.0; // Disappears after 5 seconds
    }
    
    update(dt) {
        this.velocity[1] -= this.direction[1] * 9.8 * dt; // Gravity effect
        this.velocity[0] -= this.direction[0] * 9.8 * dt; 
        this.velocity[2] -= this.direction[2] * 9.8 * dt; 


        this.position[1] += this.velocity[1] * dt;
        this.position[0] += this.velocity[0] * dt;
        this.position[2] += this.velocity[2] * dt;

        this.lifetime -= dt;
    }

    display(sphere){

        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.scale(0.1,0.1,0.1);
        sphere.display();
        this.scene.popMatrix();

    }
}