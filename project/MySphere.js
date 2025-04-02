import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks)
    {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        inclination = 0;
        azimuth = 0;
        inclinationStep = 180 / this.stacks;
        azimuthStep = 180 / this.slices;

        //South Pole
        this.vertices.push(0,0,-1);

        //vertices around southPole
        for(let i = 0; i < this.slices; i++){
            this.vertices.push(Math.sin(inclination) * Math.sin(azimuth), Math.cos(inclination), Math.sin(inclination), Math.cos(azimuth));
            this.normals.push(Math.sin(inclination) * Math.sin(azimuth), Math.cos(inclination), Math.sin(inclination), Math.cos(azimuth));
        }

        for(let i = 0; i < this.stacks; i++){
            for(let j = 0; j < this.slices; j++){

            }
        }

    }
}