import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks)
    {
        super(scene);
        this.scene;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    
    initBuffers() {
        

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let inclination = 180;
        let azimuth = 0;
        let inclinationStep = 180 / this.stacks;
        let azimuthStep = 360 / this.slices;

        inclination -= inclinationStep;
        console.log(azimuthStep);

        console.log(Math.cos(inclination));

        //South Pole
        this.vertices.push(0,-1,0);
        this.texCoords.push(0.5,1);

        //vertices around southPole
        for(let i = 0; i < this.slices + 1; i++){
            this.vertices.push(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180), Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180));
            this.normals.push(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180), Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180));
            this.texCoords.push(azimuth / 360, inclination / 180);
            azimuth += azimuthStep ;
        }
        let offsetVertice = 1; //the last vertice before the ones we are defining the indices
        //Connect the south pole vertices
        for(let i = 0; i < this.slices; i++){
            this.indices.push(offsetVertice + i, 0, offsetVertice + i + 1 );
        }

        let offset = this.slices + 1; //offset between two points in different stacks in the vertices array
        //other stacks
        for(let i = 0; i < this.stacks - 2; i++){
            inclination -= inclinationStep;
            azimuth = 0;
            //stack vertices
            for(let j = 0; j < this.slices + 1; j++){
                this.vertices.push(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180), Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180));
                this.normals.push(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180), Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180));
                this.texCoords.push(azimuth / 360, inclination / 180);
                azimuth += azimuthStep ;
            }
            //stack indices
            offsetVertice += offset;
            for(let i = 0; i < this.slices; i++){
                this.indices.push(offsetVertice + i, offsetVertice + i - offset, offsetVertice + i - offset + 1 );
                this.indices.push(offsetVertice + i, offsetVertice + i - offset + 1, offsetVertice + i + 1 );
            }

        }

        //north pole vertice
        this.vertices.push(0,1,0);
        this.texCoords.push(0.5,0);

        //Connect the north pole vertices
        for(let i = 0; i < this.slices; i++){
            this.indices.push(offsetVertice + i, offsetVertice + i + 1 , this.vertices.length / 3 - 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        console.log(this.vertices);
        console.log(this.indices);
        console.log(this.texCoords)

        this.initGLBuffers();
    }
}