import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { getRandomInt } from "./utils.js";

export class MyFire extends CGFobject {
    constructor(scene, width,height, centerPosition )
    {
        super(scene);
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.centerPosition = centerPosition;
        this.init();
    }

    init(){
        this.fireTexture = new CGFtexture(this.scene, 'textures/fire.jpg');
        this.fireAppearance = new CGFappearance(this.scene);
        this.fireAppearance.setEmission(0.9, 0.9, 0.9, 1);
        this.fireAppearance.setTexture(this.fireTexture);
        this.fireAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.triangle = new MyTriangleBig(this.scene);

        this.flamePosition = [];
        this.flameProportions = []
        for(let i = 0; i < 10; i++){
            let offsetX = Math.random() * (this.width / 2) * 5 ; //mult by 8 because the trees have a separation of at most 8 units from each other
            let offsetY = Math.random() * (this.height / 2) * 5;
            let isXNeg = Math.random() < 0.5 ? true : false;
            let isYNeg = Math.random() < 0.5 ? true : false;
            this.flamePosition.push([isXNeg ? this.centerPosition[0] - offsetX : this.centerPosition[0] + offsetX, isYNeg ? this.centerPosition[1] - offsetY : this.centerPosition[1] + offsetY, this.centerPosition[2]]);
            this.flameProportions.push([ Math.random() * 1.5,getRandomInt(1,2), 1]);
        }
    }

    display(){
        this.fireAppearance.apply();
        for(let i = 0; i < 10 ;i++){
            let position = this.flamePosition.at(i);
            let proportion = this.flameProportions.at(i)
            this.scene.pushMatrix();
            this.scene.translate(position[0], position[2], position[1]);
            this.scene.scale(proportion[0],proportion[1], proportion[2]);
            this.triangle.display(); 
            this.scene.popMatrix();
        }
        
    }

}