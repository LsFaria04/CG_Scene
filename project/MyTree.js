import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MyCylinder } from './MyCylinder.js';
import { MyPyramid } from './MyPyramid.js';

export class MyTree extends CGFobject {
    constructor(scene, inclination, axis, radius, height, color, treeTexture, leavesTexture)
    {
        super(scene);
        this.scene;
        this.inclination = inclination;
        this.axis = axis;
        this.radius = radius;
        this.height = height;
        this.color = color;
        this.cone = new MyCone(scene, 90, 10,this.height * 0.4,inclination, axis === 'x' ? true : false);
        this.treeColor = color;
        this.treeTexture = treeTexture;
        this.leavesTexture = leavesTexture;
        this.initBuffers();
    }

    initBuffers(){
        this.pyramids = [];

        //pre-process the pyramids that will be part of the tree
        const numbPyramids = Math.round(this.height * 0.8);
        if(numbPyramids == 0) numbPyramids = 1;
        const radiusScaleStep = 3 / numbPyramids;
        let radiusScale = 3;
        for(let i = 0; i < numbPyramids; i++){
            this.pyramids.push(new MyPyramid(this.scene, 8, 5,1,this.radius * radiusScale,this.inclination, this.axis === 'x' ? true : false));
            radiusScale -= radiusScaleStep;
        }

        //Tree trunk color
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.29,0.15,0.00, 1.0);
        this.material.setDiffuse(0.29,0.15,0.00, 1.0);
        this.material.setSpecular(0.29,0.15,0.00, 0.1);
        this.material.setShininess(1.0);
        this.material.setTexture(this.treeTexture);

        //tree leaves color
        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(this.color[0], this.color[1], this.color[2], 1.0);
        this.material2.setDiffuse(this.color[0], this.color[1], this.color[2], 1.0);
        this.material2.setSpecular(this.color[0], this.color[1], this.color[2], 0.1);
        this.material2.setShininess(1.0);
        this.material2.setTexture(this.leavesTexture);
    }
    
    display() {

        
        
        this.scene.pushMatrix();
        //scale to the disered height and radius
        this.scene.scale(this.radius, 1, this.radius);
        this.material.apply();
        this.cone.display();
        this.scene.popMatrix();

        //displays the pyramids that were previouly pre-processed
        const numbPyramids = Math.round(this.height * 0.8);
        if(numbPyramids == 0) numbPyramids = 1;
        this.material2.apply();
        const radiusScaleStep = 3 / numbPyramids;
        let radiusScale = 3;
        let translateDist = Math.sin(this.inclination * Math.PI / 180);
        
        for(let i = 0; i < numbPyramids; i++){
            this.scene.pushMatrix();
            if(this.axis === 'x')
                this.scene.translate(translateDist  ,this.height * 0.1 + i*0.8,0);
            else if(this.axis === 'z')
                this.scene.translate(0,this.height * 0.2 + i*0.8,translateDist);
            this.pyramids[i].display();
            this.scene.popMatrix();
            radiusScale -= radiusScaleStep;

            translateDist += Math.sin(this.inclination * Math.PI / 180);
        }

        
        
    }
}