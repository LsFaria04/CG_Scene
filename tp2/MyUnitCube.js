import {CGFobject} from '../lib/CGF.js';

export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            -0.5, -0.5, -0.5,	//0
            -0.5, -0.5, 0.5,	//1
            0.5, -0.5, 0.5,	    //2
            0.5, -0.5, -0.5,     //3
            -0.5, 0.5, -0.5,     //4
            -0.5, 0.5, 0.5,     //5
            0.5, 0.5, 0.5,      //6
            0.5, 0.5, -0.5      //7

        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            //ZX bottom face
            0, 3, 2,
            2, 1 ,0,

            //ZX upper face
            4, 5, 6,
            6, 7, 4,

            //ZY bottom face
            4, 0, 1,
            1, 5, 4,

            //ZY upper face
            6, 2, 3,
            3, 7, 6,

            //XY bottom face
            7, 3, 0,
            0, 4, 7,

            //XY upper face
            5, 1, 2,
            2, 6, 5,
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}