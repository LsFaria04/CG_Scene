import {CGFobject} from '../lib/CGF.js';

export class MyFlameMesh extends CGFobject {
    constructor(scene, subdivisions = 10, height = 4, width = 4) {
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
        let vertexIndex = 0;
        for (let row = 0; row <= this.subdivisions; row++) {
            let t = row / this.subdivisions;
            let y = t * this.height;
            let rowWidth = (1 - t) * this.width;
            let numPoints = row + 1;

            for (let col = 0; col < numPoints; col++) {
                let x = -rowWidth / 2 + (col / (numPoints - 1)) * rowWidth;
                this.vertices.push(x, y, 0);
                this.normals.push(0, 0, 1);
                this.texCoords.push(col / (numPoints - 1), t);
            }
        }

        // Build indices for triangles
        let currentIndex = 0;
        for (let row = 0; row < this.subdivisions; row++) {
            let rowStart = (row * (row + 1)) / 2;
            let nextRowStart = ((row + 1) * (row + 2)) / 2;

            for (let col = 0; col < row + 1; col++) {
                this.indices.push(rowStart + col, nextRowStart + col, nextRowStart + col + 1);
                if (col < row) {
                    this.indices.push(rowStart + col, nextRowStart + col + 1, rowStart + col + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
