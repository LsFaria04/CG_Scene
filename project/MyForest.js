import {CGFobject} from '../lib/CGF.js';
import { MyTree } from './MyTree.js';
import {getRandomInt} from './utils.js'

export class MyForest extends CGFobject {
    constructor(scene, width, height, centerposition, treeOffset, treeTexture, leavesTexture)
    {
        super(scene);
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.centerposition = centerposition;
        this.treeOffset = treeOffset;
        this.treeTexture = treeTexture;
        this.leavesTexture = leavesTexture;
        this.init();
    }

    init(){
        this.trees = []; //array with the tree objects
        this.positions = []; //array with the position of the trees (relative to the center position)
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){

                //give some randomness to the various tree parameters
                let inclination = getRandomInt(-10, 10);
                let axis = getRandomInt(1,2) === 1 ? 'x' : 'z';
                let radius = getRandomInt(3,6)/4;
                let height = getRandomInt(15,25);
                let color_select = getRandomInt(1,3);
                let color = [0.05,0.42,0.01];
                switch(color_select){
                    case 1:
                        color = [0.13, 0.55, 0.13];
                        break;
                    case 2:
                        color = [0, 0.39, 0];
                        break;
                    case 3:
                        color = [0.05,0.42,0.01];
                        break;
                    default:
                        break;
                }
                
                let tree = new MyTree(this.scene, inclination, axis, radius, height, color, this.treeTexture, this.leavesTexture);
                this.trees.push(tree);
                
                let x = getRandomInt(-4,4);
                let z = getRandomInt(-4,4);
                this.positions.push([x,0,z]);

            }
        }
        
    }

    display(){
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                let offsetz = i - (this.width/2);
                let offsetx = j - (this.height/2);

                //insert the tree in its position
                this.scene.pushMatrix();
                this.scene.translate(offsetx * this.treeOffset +  this.positions[i*this.height + j ][0], this.positions[i*this.height + j ][1], offsetz * this.treeOffset + this.positions[i*this.height + j ][2]);  //translate to the expected position
                this.scene.translate(this.centerposition[0], this.centerposition[1], this.centerposition[2]); //translate to the center of the forest (reference point)
                this.trees[i*this.height + j ].display();
                this.scene.popMatrix();
            }
        }
    }
}