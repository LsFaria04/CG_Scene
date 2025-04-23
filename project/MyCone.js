import {CGFobject} from '../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks, height, inclination, isX) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inclination = inclination;
        this.isX = isX;
        this.height = height;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            this.texCoords.push(ang / (2*Math.PI),1);
            ang+=alphaAng;
        }
        if(this.isX){
            this.vertices.push(Math.sin(this.inclination * Math.PI / 180) * this.height,this.height,0);
            this.normals.push(Math.sin(this.inclination * Math.PI / 180),1,0);
        }
        else{
            this.vertices.push(0,this.height,Math.sin(this.inclination * Math.PI / 180) * this.height);
            this.normals.push(0,1,(Math.sin(this.inclination * Math.PI / 180)));
        }
        
        this.texCoords.push(0.5, 0);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


