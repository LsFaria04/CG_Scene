import {CGFobject} from '../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks,height, radius,  inclination, isX ) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.inclination = inclination;
        this.isX = isX;
        this.radius = radius;
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
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang) * this.radius;
            var saa=Math.sin(ang+alphaAng) * this.radius;
            var ca=Math.cos(ang) * this.radius;
            var caa=Math.cos(ang+alphaAng) * this.radius;

            if(this.isX){
                this.vertices.push(Math.sin(this.inclination * Math.PI / 180) * this.height,this.height,0);
                this.normals.push(Math.sin(this.inclination * Math.PI / 180),1,0);
            }
            else{
                this.vertices.push(0,this.height,Math.sin(this.inclination * Math.PI / 180) * this.height);
                this.normals.push(0,1,(Math.sin(this.inclination * Math.PI / 180)));
            }

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            this.texCoords.push(0.5, 0);
            this.texCoords.push(ang / (2*Math.PI),1);
            this.texCoords.push((ang + alphaAng)/ (2*Math.PI),1);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        //bottom face
        this.vertices.push(0,0,0);
        for(let i = 0; i < this.slices; i++){
            this.indices.push(i * 3 + 1, this.vertices.length - 1, i * 3 + 2);
        }

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


