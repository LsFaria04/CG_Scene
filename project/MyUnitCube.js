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
            0.5, 0.5, -0.5,      //7
            -0.5, -0.5, -0.5,	//0 (8)
            -0.5, -0.5, 0.5,	//1 (9)
            0.5, -0.5, 0.5,	    //2 (10)
            0.5, -0.5, -0.5,     //3 (11)
            -0.5, 0.5, -0.5,     //4 (12)
            -0.5, 0.5, 0.5,     //5  (13)
            0.5, 0.5, 0.5,      //6  (14)
            0.5, 0.5, -0.5,      //7 (15)
            -0.5, -0.5, -0.5,	//0  (16)
            -0.5, -0.5, 0.5,	//1  (17)
            0.5, -0.5, 0.5,	    //2  (18)
            0.5, -0.5, -0.5,     //3 (19)
            -0.5, 0.5, -0.5,     //4 (20)
            -0.5, 0.5, 0.5,     //5  (21)
            0.5, 0.5, 0.5,      //6  (22) 
            0.5, 0.5, -0.5,      //7 (23)


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
            12, 8, 9,
            9, 13, 12,

            //ZY upper face
            14, 10, 11,
            11, 15, 14,

            //XY bottom face
            23, 19, 16,
            16, 20, 23,

            //XY upper face
            21, 17, 18,
            18, 22, 21,
        ];

        this.normals = [
            0,-1,0, //0
            0,-1,0, //1
            0,-1,0, //2
            0,-1,0, //3
            0,1,0,  //4
            0,1,0,  //5
            0,1,0,  //6
            0,1,0,  //7
            -1,0,0, //8
            -1,0,0, //9
            1,0,0,  //10
            1,0,0,  //11
            -1,0,0, //12
            -1,0,0, //13
            1,0,0,  //14
            1,0,0,  //15
            0,0,-1, //16
            0,0,1, //17
            0,0,1, //18
            0,0,-1, //19
            0,0,-1, //20
            0,0,1, //21
            0,0,1, //22
            0,0,-1 //23


        ]

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}