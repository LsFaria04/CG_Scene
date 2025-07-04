import {CGFobject} from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
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
        this.texCoords = [];

        for(var stack = 1; stack < this.stacks + 1; stack++){
            var ang = 0;
            var alphaAng = 360/this.slices;

            for(var i = 0; i < this.slices; i++){

                this.vertices.push(Math.cos(ang* Math.PI / 180),Math.sin(ang* Math.PI / 180),  -stack + 1);
                this.normals.push(Math.cos(ang* Math.PI / 180),Math.sin((ang* Math.PI / 180)), 0);

                this.vertices.push(Math.cos(ang* Math.PI / 180),Math.sin(ang* Math.PI / 180),  -stack + 1);
                this.normals.push(Math.cos(ang* Math.PI / 180),Math.sin(ang* Math.PI / 180),0);

                this.texCoords.push(ang/360, stack/this.stacks);
                this.texCoords.push(ang/360, stack/this.stacks);

                ang+=alphaAng;
            }

            ang = 0;
            for(var i = 0; i < this.slices; i++){


                this.vertices.push(Math.cos(ang* Math.PI / 180),Math.sin(ang* Math.PI / 180),  -stack);
                this.normals.push(Math.cos(ang* Math.PI / 180),Math.sin(ang* Math.PI / 180), 0);

                this.vertices.push(Math.cos(ang* Math.PI / 180),Math.sin(ang* Math.PI / 180),  -stack);
                this.normals.push(Math.cos(ang* Math.PI / 180),Math.sin(ang* Math.PI / 180),0);

                this.texCoords.push(ang/360, stack/this.stacks);
                this.texCoords.push(ang/360, stack/this.stacks);

                ang+=alphaAng;
            }

            for(var i = 0; i < this.slices - 1; i++){
                let reference = (i * 2) + ((stack - 1) * this.slices * 2)  + 1;
                let reference_back = (this.slices * 2) + ((stack - 1) * this.slices * 2)  + reference;

                this.indices.push(reference, reference_back, reference_back + 1);
                this.indices.push(reference_back + 1, reference + 1, reference);
            }

            //last face
            this.indices.push((this.slices * 2  - 1) + ((stack - 1) * this.slices * 2 * 2), ((this.slices * 2   - 1) * 2)  + ((stack - 1) * this.slices * 2 * 2), this.slices * 2 + ((stack - 1) * this.slices * 2 * 2)  );
            this.indices.push(this.slices * 2 + ((stack - 1) * this.slices * 2 * 2) , 0  + ((stack - 1) * this.slices * 2 * 2), (this.slices * 2 - 1) + ((stack - 1) * this.slices * 2 * 2) );
        }

        //upper face
        this.vertices.push(0,0,0);
        let lastIDX = this.vertices.length - 1
        for(var i = 0; i < this.slices - 1; i++){
            let reference = i * 2 + 1;
            this.indices.push(reference, reference + 1, lastIDX);
        }
        //upper face last slice
        this.indices.push(this.slices * 2 - 1, 0, lastIDX);

        //down face
        this.vertices.push(0,0,- (this.stacks - 1));
        lastIDX = this.vertices.length / 3 - 1;
        for(var i = 0; i < this.slices - 1; i++){
            let reference = (i * 2) + ((this.stacks - 1) * this.slices * 2)  + 1;
            let reference_back = (this.slices * 2) + ((this.stacks - 1) * this.slices * 2)  + reference;
            this.indices.push(reference_back + 1, reference_back, lastIDX);
        }
        //down face last slice
        this.indices.push(this.slices * 2 + 1 + ((this.stacks - 1) * this.slices * 2 * 2), this.slices * 2 * 2 - 1 + ((this.stacks - 1) * this.slices * 2 * 2), lastIDX);
        
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers(){

    }
}