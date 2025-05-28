import {CGFobject} from '../lib/CGF.js';

export class MyFlame extends CGFobject {
    constructor(scene, subdivisions = 3, height = 1, width = 1) {
        super(scene);
        this.subdivisions = subdivisions;  // number of horizontal rows
        this.height = height;
        this.width = width;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const halfWidth = this.width / 2;

        // Build vertices row by row
        for (let row = 0; row <= this.subdivisions; row++) {
            let t = row / this.subdivisions;
            let y = t * this.height;
            let rowWidth = (1 - t) * this.width;
            let numPoints = this.subdivisions - row + 1;

            for (let col = 0; col < numPoints; col++) {
                let x = 0;
                if (numPoints === 1) {
                    //point at the top
                    x = 0;
                } else {
                    x = -rowWidth / 2 + (col / (numPoints - 1)) * rowWidth;
                }
                
                this.vertices.push(x, y, 0);
                this.normals.push(0, 0, 1);
                if(numPoints == 1){
                    this.texCoords.push(0.5, t);
                }else{
                    this.texCoords.push(col / (numPoints - 1), t);
                }
                
            }
        }

        // Build indices for triangles
        let rowStart = 0;
        for (let row = 0; row < this.subdivisions; row++) {
            let currentRowPoints = this.subdivisions + 1 - row;
            let nextRowPoints = this.subdivisions - row;

            let nextRowStart = rowStart + currentRowPoints;

            for (let col = 0; col < nextRowPoints; col++) {
                
                // Upper triangle
                this.indices.push(
                    rowStart + col,
                    nextRowStart + col,
                    rowStart + col + 1
                );
                // Upper triangle back face
                this.indices.push(
                    rowStart + col + 1,
                    nextRowStart + col,
                    rowStart + col
                );
                
                if(nextRowPoints > 1){
                    // Lower triangle
                    this.indices.push(
                        rowStart + col + 1,
                        nextRowStart + col,
                        nextRowStart + col + 1
                    );

                    // Lower triangle back face
                    this.indices.push(
                        nextRowStart + col + 1,
                        nextRowStart + col,
                        rowStart + col + 1
                        
                    );
                }
            }

            //last triangles in the row
            this.indices.push(
                rowStart + currentRowPoints - 2,
                nextRowStart + nextRowPoints - 1,
                rowStart + currentRowPoints - 1,
            );
            
            this.indices.push(
                rowStart + currentRowPoints - 1,
                nextRowStart + nextRowPoints - 1,
                rowStart + currentRowPoints - 2,
            );

            rowStart = nextRowStart;
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
