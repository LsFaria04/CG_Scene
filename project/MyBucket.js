import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyUnitCubeQuad } from '../tp2/MyUnitCubeQuad.js';
import { MyCylinder } from './MyCylinder.js';
import { MyHelice } from './MyHelice.js';
import { MyLandingGear } from './MyLandingGear.js';
import { MyPyramid } from './MyPyramid.js';
import { MySphere } from './MySphere.js';

export class MyBucket extends CGFobject {
    constructor(scene)
    {
        super(scene);
        this.scene = scene;
        this.initBuffers();
    }

    initBuffers(){

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        //semi sphere with a cylinder on top

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    
}