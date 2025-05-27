import { CGFobject, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MySmokeParticle } from "./MySmokeParticle.js";
import { MySphere } from "./MySphere.js";
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
        this.sphere = new MySphere(this.scene, 10, 10, false, false);
        this.fireShader = new CGFshader(this.scene.gl, "shaders/fire.vert","shaders/fire.frag" );

        this.smokeAppearance = new CGFappearance(this.scene);
        this.smokeAppearance.setAmbient(0.451, 0.5098, 0.4627, 0.1);
        this.smokeAppearance.setDiffuse(0.451, 0.5098, 0.4627, 1.0);
        this.smokeAppearance.setSpecular(0.451, 0.5098, 0.4627, 1.0);

        this.smokes = [];
        this.smokeActive = false;

        this.flamePosition = [];
        this.flameProportions = [];
        this.flameOrientation = [];
        for(let i = 0; i < 10; i++){
            let offsetX = Math.random() * (this.width / 2) * 5 ; //mult by 8 because the trees have a separation of at most 8 units from each other
            let offsetY = Math.random() * (this.height / 2) * 5;
            let isXNeg = Math.random() < 0.5 ? true : false;
            let isYNeg = Math.random() < 0.5 ? true : false;
            this.flamePosition.push([isXNeg ? this.centerPosition[0] - offsetX : this.centerPosition[0] + offsetX, isYNeg ? this.centerPosition[1] - offsetY : this.centerPosition[1] + offsetY, this.centerPosition[2]]);
            this.flameProportions.push([ Math.random() * 1.5,getRandomInt(1,2), 1]);
            this.flameOrientation.push(Math.PI * 360 * Math.random() / 180);
        }
    }

    checkCollisionWithWater(waterDrops){
        let newFlamePosition = [];
        let newFlameProportion = [];
        let newOrientation = [];
        for(let i = 0; i < this.flamePosition.length; i++){
            let position = this.flamePosition[i];
            let isActive = true;
            for(let drop of waterDrops){
                //check colision 
                if((Math.abs(drop.position[0] - position[0]) < 2) && (Math.abs(drop.position[1] - position[2]) < 2) && (Math.abs(drop.position[2] - position[1]) < 3)){
                    isActive = false;
                    break;
                }
                
            }
            if(isActive){
                newFlamePosition.push(position);
                newFlameProportion.push(this.flameProportions[i]);
                newOrientation.push(this.flameOrientation[i]);
            }
            else{
                this.releaseSmoke(position);
            }
        }

        this.flamePosition = newFlamePosition;
        this.flameProportions = newFlameProportion;
        this.flameOrientation = newOrientation;
    }

    releaseSmoke(position){
        this.smokeActive = true;
        let smokeParticles = [];
        for (let i = 0; i < 5000; i++) {
            let randomOffset = [
                (Math.random() - 0.5), 
                0, 
                (Math.random() - 0.5),
            ];
            let initialVelocity = [
                (Math.random() - 0.5) * 2, 
                (Math.random() - 0.5) * 5, 
                (Math.random() - 0.5) * 2,
            ];
            const smokePosition = [
                position[0] + randomOffset[0],
                position[1] + randomOffset[1],
                position[2] + randomOffset[2]
            ];

            const direction = [
                0,1,0
            ];

            
            smokeParticles.push(new MySmokeParticle(this.scene, smokePosition, initialVelocity, direction));
        }
        this.smokes.push(smokeParticles);
    }

    update(t){
        const timeSeconds = t * 0.001;
        this.fireShader.setUniformsValues({timeFactor: Math.sin(timeSeconds) * 10 });
        for(let i = 0; i < this.smokes.length; i++){
            let smokeParticle = this.smokes[i];
            smokeParticle = smokeParticle.filter(particle => particle.lifetime > 0);
            smokeParticle.forEach(particle => particle.update(timeSeconds));
            this.smokes[i] = smokeParticle;
        }
        this.smokes = this.smokes.filter(smokeParticle => smokeParticle.length > 0);
    }

    display(){
        this.fireAppearance.apply();
        this.scene.setActiveShader(this.fireShader);
        
        for(let i = 0; i < this.flamePosition.length ;i++){
            let position = this.flamePosition.at(i);
            let proportion = this.flameProportions.at(i);
            let orientation = this.flameOrientation.at(i);
            this.scene.pushMatrix();
            this.scene.translate(position[0], position[2], position[1]);
            this.scene.rotate(orientation, 0, 1, 0);
            this.scene.scale(proportion[0],proportion[1], proportion[2]);
            this.triangle.display(); 
            this.scene.popMatrix();
        }/*
        //rotated flame to be seen in other perspectives
        for(let i = 0; i < this.flamePosition.length ;i++){
            let position = this.flamePosition.at(i);
            let proportion = this.flameProportions.at(i);
            let orientation = this.flameOrientation.at(i);
            this.scene.pushMatrix();
            this.scene.translate(position[0], position[2], position[1]);
            this.scene.rotate(orientation + (Math.PI / 2), 0, 1, 0);
            this.scene.scale(proportion[0],proportion[1], proportion[2]);
            this.triangle.display(); 
            this.scene.popMatrix();
        }*/
        this.scene.setActiveShader(this.scene.defaultShader);

        this.smokeAppearance.apply();
        for(let smokeParticles of this.smokes){
            for(let particle of smokeParticles){
                particle.display(this.sphere);
            }
        }
        
    }

}