import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, isInverted, isSemi)
    {
        super(scene);
        this.scene;
        this.slices = slices;
        this.stacks = stacks;
        this.isInverted = isInverted;
        this.isSemi = isSemi;

        this.initBuffers();
    }
    
    initBuffers() {
        

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let inclination = 180;
        let azimuth = 0;
        let inclinationStep = (this.isSemi ? 90 : 180) / this.stacks;
        let azimuthStep = 360 / this.slices;

        inclination -= inclinationStep;

        //South Pole
        this.vertices.push(0,-1,0);
        this.texCoords.push(0.5,1);
        if(this.isInverted)
            this.normals.push(0,1,0);
        else
            this.normals.push(0,-1,0);

        //vertices around southPole
        for(let i = 0; i < this.slices + 1; i++){
            if(i == this.slices){
                this.vertices.push(0, Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180));
            }
            else{
                this.vertices.push(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180), Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180));
            }
            

            if(this.isInverted)
                this.normals.push(-(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180)),-(Math.cos(inclination * Math.PI / 180)),-(Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180)));
            else
                this.normals.push(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180), Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180));

            this.texCoords.push(azimuth / 360, inclination / 180);

            azimuth += azimuthStep ;
        }
        let offsetVertice = 1; //the last vertice before the ones we are defining the indices
        //Connect the south pole vertices
        for(let i = 0; i < this.slices; i++){
            if (this.isInverted)
                this.indices.push(offsetVertice + i + 1, 0, offsetVertice + i);
            else
                this.indices.push(offsetVertice + i, 0, offsetVertice + i + 1 );
        }

        let offset = this.slices + 1; //offset between two points in different stacks in the vertices array
        //other stacks
        for(let i = 0; i < this.stacks - 2; i++){
            inclination -= inclinationStep;
            azimuth = 0;
            //stack vertices
            for(let j = 0; j < this.slices + 1; j++){

                //check if is the last vertex of the stack to insert it exactly in the right position
                if(j == this.slices){
                    this.vertices.push(0, Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) );
                }
                else{
                    this.vertices.push(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180), Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180));
                }

                //check if is inverted to invert the normals
                if(this.isInverted){
                    if((j == 0) || (j == this.slices)){
                        this.normals.push(0,-(Math.cos(inclination * Math.PI / 180)),-(Math.sin(inclination * Math.PI / 180)));
                    }
                    else{
                        this.normals.push(-(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180)),-(Math.cos(inclination * Math.PI / 180)),-(Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180)));
                    }
                }
                else{
                    if((j == 0) || (j == this.slices)){
                        this.normals.push(0, Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180));
                    }
                    else{
                        this.normals.push(Math.sin(inclination * Math.PI / 180) * Math.sin(azimuth * Math.PI / 180), Math.cos(inclination * Math.PI / 180), Math.sin(inclination * Math.PI / 180) * Math.cos(azimuth * Math.PI / 180));
                    }
                }
                

                this.texCoords.push(azimuth / 360, inclination / 180);
                
                
                azimuth += azimuthStep ;
            }
            //stack indices
            offsetVertice += offset;
            for(let i = 0; i < this.slices; i++){
                if(this.isInverted){
                    this.indices.push(offsetVertice + i - offset + 1, offsetVertice + i - offset, offsetVertice + i);
                    this.indices.push(offsetVertice + i + 1, offsetVertice + i - offset + 1, offsetVertice + i );
                }
                else{
                    this.indices.push(offsetVertice + i, offsetVertice + i - offset, offsetVertice + i - offset + 1 );
                    this.indices.push(offsetVertice + i, offsetVertice + i - offset + 1, offsetVertice + i + 1 );
                }
                
            }

        }


        //only needs a north pole if is a complete sphere
        if(!this.isSemi){
            //north pole vertice
            this.vertices.push(0,1,0);
            this.texCoords.push(0.5,0);
            if(this.isInverted)
                this.normals.push(0,-1,0);
            else
                this.normals.push(0,1,0);

            //Connect the north pole vertices
            for(let i = 0; i < this.slices; i++){
                if(this.isInverted)
                    this.indices.push(this.vertices.length / 3 - 1, offsetVertice + i + 1 , offsetVertice + i);
                else
                    
                    this.indices.push(offsetVertice + i, offsetVertice + i + 1 , this.vertices.length / 3 - 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}