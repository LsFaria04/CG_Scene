import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyUnitCubeQuad } from '../tp2/MyUnitCubeQuad.js';
import { MyBucket } from './MyBucket.js';
import { MyCircle } from './MyCircle.js';
import { MyCylinder } from './MyCylinder.js';
import { MyHelice } from './MyHelice.js';
import { MyLandingGear } from './MyLandingGear.js';
import { MyPyramid } from './MyPyramid.js';
import { MySphere } from './MySphere.js';
import { MyWaterDrop } from './MyWaterDrop.js';

export const HeliStates = {
    REST: 1,
    CRUISING: 2,
    RETURNING_HELI: 3,
    DESCENDING_LAKE: 4,
    DESCENDING_HELI: 5,
    RISING: 6,
    RISING_LAKE: 7,
    ON_LAKE: 8,
    RELEASING_WATER: 9
  };

export class MyHeli extends CGFobject {
    constructor(scene, position, orientation, velocityVec)
    {
        super(scene);
        this.scene = scene;
        this.position = position;
        this.orientation = orientation;
        this.velocityVec = velocityVec;
        this.aceleration = 0;
        this.heliceRotation = 0;
        this.maxAltitude = position[1] + 10;
        this.state = HeliStates.REST;
        this.orientationToHeliport = 0; //helps the heli to return to the heliport
        this.bucketPercentage = 0; //percante of the bucket that is visible (is outside the heli)
        this.waterDrops = [];
        this.hasWater = false;
        this.init();
    }

    init(){
        this.sphere = new MySphere(this.scene, 80, 80, false);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.cylinder = new MyCylinder(this.scene, 90, 1); 
        this.pyramid = new MyPyramid(this.scene, 4, 1,1, 1, 0, false);
        this.helice = new MyHelice(this.scene);
        this.landingGear = new MyLandingGear(this.scene);
        this.bucket = new MyBucket(this.scene, 3,2);
        this.circle = new MyCircle(this.scene, 80);

        //the fuselage will be red (fire figthing helicopter)
        this.fuselage = new CGFappearance(this.scene);
        this.fuselage.setAmbient(0.651, 0.1725, 0.1686, 0.1);
        this.fuselage.setDiffuse(0.651, 0.1725, 0.1686, 0.1);
        this.fuselage.setSpecular(0.651, 0.1725, 0.1686, 1);
        this.fuselage.setShininess(1.0);
        this.fuselage.loadTexture('textures/helicopter_fuselage.png');

        //silver material with texture to use in silver parts of the helicopter
        this.silverFuselage = new CGFappearance(this.scene);
        this.silverFuselage.setAmbient(1, 1, 1, 0.0);
        this.silverFuselage.setDiffuse(1, 1, 1, 0.0);
        this.silverFuselage.setSpecular(1, 1, 1, 1.0);
        this.silverFuselage.setShininess(1.0);
        this.silverFuselage.loadTexture('textures/helicopter_fuselage.png');

        //used in the window
        this.silver = new CGFappearance(this.scene);
        this.silver.setAmbient(0.6627, 0.6227, 0.6784, 0.0);
        this.silver.setDiffuse(0.6627, 0.6227, 0.6784, 0.0);
        this.silver.setSpecular(0.6627, 0.6227, 0.6784, 1.0);
        this.silver.setShininess(1.0);

        //color of the water drops that fall from the bucket
        this.waterColor = new CGFappearance(this.scene);
        this.waterColor.setAmbient(0.5569, 0.8196, 1.0, 0.1);
        this.waterColor.setDiffuse(0.5569, 0.8196, 1.0, 0.1);
        this.waterColor.setSpecular(0.5569, 0.8196, 1.0, 1.0);
        this.waterColor.setShininess(1.0);
    }

    updateState(newState){
        this.state = newState;
    }

    updateVelocityVect(newVect){
        this.velocityVec = newVect;
    }

    releaseWater(){
        //creates the water drops and realeases them
        this.hasWater = false; //bucket is empty because we are releasing all the water
        for (let i = 0; i < 500; i++) {
            let randomOffset = [
                (Math.random() - 0.5), 
                0, 
                (Math.random() - 0.5),
            ];
            let initialVelocity = [
                (Math.random() - 0.5) * 5, 
                -5, 
                (Math.random() - 0.5) * 5
            ];
            const dropPosition = [
                this.position[0] + randomOffset[0],
                this.position[1] - 9 + randomOffset[1],
                this.position[2] + randomOffset[2]
            ];

            const direction = [
                Math.sin(Math.PI * this.orientation / 180) * Math.sin(Math.PI * (-this.aceleration) / 180),
                Math.cos(Math.PI * (-this.aceleration) / 180),
                Math.cos(Math.PI * this.orientation / 180) * Math.sin(Math.PI * (-this.aceleration) / 180)
            ];

            
            this.waterDrops.push(new MyWaterDrop(this.scene, dropPosition, initialVelocity, direction));
        }
    }

    reset(){
        //resets the current state to the rest state
        this.state = HeliStates.REST;
        this.velocityVec = [0,0,0];
        this.aceleration = 0;
        this.position = [0,this.maxAltitude - 10,0];
        this.orientation = 0;
        this.hasWater = false;
        this.waterDrops = [];
    }

    redirectToHeli(){
        //considering that the heliport is at the position [0,20,0]
        //negative of the atan because the axis are inverted
        if(this.position[0] > 0)
            this.orientationToHeliport = 180 + (180 * (-Math.atan(this.position[2] / this.position[0])) / Math.PI); //needs to adjust to the inserse angle
        else if(this.position[0] < 0)
            this.orientationToHeliport = 180 * (-Math.atan(this.position[2] / this.position[0])) / Math.PI;
        else{
            this.orientationToHeliport = this.orientation; //is above the heliport
        }

        
        this.velocityVec = [0,0,0]; //stop the heli to turn it
        //the other operations are made in the other methods (update, turn and acelerate)
    }

    updateDrops(Time) {
        //update the water drops position and filter the drops with lifetime equal or below zero
        this.waterDrops = this.waterDrops.filter(drop => drop.lifetime > 0 && drop.position[1] > 0);
        this.waterDrops.forEach(drop => drop.update(Time));

        //no more water to drop
        if(this.waterDrops.length === 0){
            this.state = HeliStates.CRUISING;
            this.waterDrops = [];
        }

    }

    update(time){
        //updates the parameteres and state of the helicopter

        const timeSeconds = time * 0.001;

        //update the heli position
        if(this.state === HeliStates.RISING || this.state === HeliStates.RISING_LAKE  ){
            if(this.position[1] > this.maxAltitude ){
                //cruising altitude reached. Resets the values and change state
                this.state = HeliStates.CRUISING;
                this.velocityVec = [0,0,0];
                this.aceleration = 0;
                this.bucketPercentage = 1;
                return;
            }
            this.position[1] += this.velocityVec[1] * timeSeconds;

            if(this.state === HeliStates.RISING){
                this.bucketPercentage = (this.position[1] - (this.maxAltitude - 10)) / 10;
                if(this.bucketPercentage > 1){
                    this.bucketPercentage = 1;
                }
            }
        }
        else if(this.state === HeliStates.DESCENDING_HELI){
            if(this.position[1] < (this.maxAltitude - 9.9)){
                //Heliport altitude reached. Resets the values and change state
                this.state = HeliStates.REST;
                this.velocityVec = [0,0,0];
                this.aceleration = 0;
                this.bucketPercentage = 0;
                return;
            }
            this.position[1] += this.velocityVec[1] * timeSeconds;
            this.bucketPercentage = Math.abs(this.position[1] - (this.maxAltitude - 10)) / 10;
        }
        else if(this.state === HeliStates.DESCENDING_LAKE){    
            if(this.position[1] <= 8){
                //the heli bucket is at the lake. Change the state to resting on Lake
                this.state = HeliStates.ON_LAKE;
                this.hasWater = true;
                this.velocityVec = [0,0,0];
                this.aceleration = 0;
                return;
            }
            this.position[1] += this.velocityVec[1] * timeSeconds;
        }
        else{

            if(this.state === HeliStates.RETURNING_HELI && Math.abs(0 - this.position[0]) < 1 ){
                //special update when the heli is returnin to the heliport and the position is in the range of the final position
                this.position[0] = 0;
                this.position[2] = 0;

                this.state = HeliStates.DESCENDING_HELI; //update the state to the descending to the heliport
                this.velocityVec = [0,-1,0];
                return;
            }

            if(this.state === HeliStates.RELEASING_WATER){
                this.updateDrops(timeSeconds);
            }


            this.position[0] += this.velocityVec[0] * timeSeconds;
            this.position[2] += this.velocityVec[2] * timeSeconds;
   
        }



        if(this.state !== HeliStates.REST){
            //update the helice rotation if it is not in rest
            this.heliceRotation += 50;
            if(this.heliceRotation >= 360){
                this.heliceRotation = 0;
            }
        }


    }

    turn(v){
        //Turns the helicopter by v

        if(this.state !== HeliStates.CRUISING && this.state !== HeliStates.RETURNING_HELI && this.state !== HeliStates.RELEASING_WATER){
            //can only turn if cruising or returning to the heliport
            return;
        }

        //special turning when the hli is returnin to the heliport
        if(this.state === HeliStates.RETURNING_HELI && this.orientation !== this.orientationToHeliport){
            
            if(Math.abs(this.orientation - this.orientationToHeliport) < 5){
                //final adjustment
                this.orientation = this.orientationToHeliport;

                //update the velocity vector to point to the heliport
                this.velocityVec[0] = Math.cos(Math.PI * this.orientation / 180);
                this.velocityVec[2] = -Math.sin(Math.PI * this.orientation / 180);
            }
            else if(this.orientationToHeliport > this.orientation)
                this.orientation += 5;
            else{
                this.orientation -= 5;
            }

            
            return;
        }

        this.orientation += v;

        this.velocityVec[0] = Math.cos(Math.PI * this.orientation / 180);
        this.velocityVec[2] = -Math.sin(Math.PI * this.orientation / 180); 
    }
    acelerate(v){ 
        //Acelerate the helicopter by v


        this.aceleration += v;
        if(v === 0 && this.aceleration > 0){
            if(this.aceleration - 0.5 < 0){
                //to avoid the helicopter to skip stop becasue we used speed factor
                this.aceleration = 0;
            }
            else{
                this.aceleration -= 0.5; // decrease aceleration because no aceleration is being added
            }
        }

        if(v === 0 && this.aceleration < 0){
            if(this.aceleration - 0.5 > 0){
                //to avoid the helicopter to skip stop becasue we used speed factor
                this.aceleration = 0;
            }
            else{
                this.aceleration += 0.5; // decrease aceleration because no aceleration is being added
            }
        }

        if(this.aceleration > 10){
            this.aceleration = 10;
        }
        else if(this.aceleration < -10){
            this.aceleration = -10;
        }

        //rise the heli when the state is rising
        if(this.state === HeliStates.RISING || this.state === HeliStates.RISING_LAKE){
            this.velocityVec[1] = 1; //resets the vect in the y direction
            this.velocityVec[1] *= this.aceleration; //updated the vector
        }
        else if(this.state === HeliStates.DESCENDING_HELI ||this.state === HeliStates.DESCENDING_LAKE){
            this.velocityVec[1] = -1; //resets the vect in the y direction
            this.velocityVec[1] *= v; //updated the vector (constant speed in this case)
        }
        else{
            
            this.velocityVec[0] *= this.aceleration;
            this.velocityVec[2] *= this.aceleration;
        }
        

    }

    display(){
        //water drops are displayed first because they aren't related with the heli global position
        this.scene.pushMatrix();
        this.waterColor.apply();
        for(let i = 0; i < this.waterDrops.length; i++){
            this.waterDrops[i].display(this.sphere);
        }
        this.scene.popMatrix();

        this.scene.translate(this.position[0], this.position[1], this.position[2]); //global position
        this.scene.rotate(Math.PI * this.orientation / 180, 0, 1, 0); //global orientation

        //increase inclination when is acelerating
        if(this.aceleration > 0 && (this.state === HeliStates.CRUISING || this.state === HeliStates.RELEASING_WATER)){
            this.scene.rotate(Math.PI * (-1 * this.aceleration) / 180, 0, 0, 1);
        }
        else if(this.aceleration < 0 && (this.state === HeliStates.CRUISING || this.state === HeliStates.RELEASING_WATER)){
            this.scene.rotate(Math.PI * (1 * (-this.aceleration)) / 180, 0, 0, 1);
        }


        //cockpit
        this.scene.pushMatrix();
        this.scene.scale(5,2.5,2.5);
        this.fuselage.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //rotor base
        this.scene.pushMatrix();
        this.scene.scale(2,1,1);
        this.scene.translate(0,2.5,0);
        this.cube.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.translate(-1,2,0);
        this.scene.rotate(Math.PI * 90 / 180, 0, 1, 0);
        this.scene.scale(0.6,0.6,8);
        this.cylinder.display();
        this.scene.popMatrix();


        //rear wing
        this.scene.pushMatrix();
        this.scene.translate(-9.5,2,0);
        this.scene.rotate(Math.PI * 90 / 180, 0, 0,1);
        this.scene.rotate(Math.PI * 180 / 180, 1, 0,0);
        this.scene.scale(2,3,0.6);
        this.pyramid.display();
        this.scene.popMatrix();

        //helice
        this.scene.pushMatrix();
        this.scene.translate(0,4,0);
        this.scene.rotate(Math.PI * this.heliceRotation /180, 0,1,0); //helice rotation when the engine is on
        this.silverFuselage.apply();
        this.helice.display();
        this.scene.popMatrix()


        //landing gear
        this.scene.pushMatrix();
        this.scene.translate(0, -3.6, 2);
        this.landingGear.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1,1,-1);
        this.scene.translate(0,-3.6, 2);
        this.landingGear.display();
        this.scene.popMatrix();

        //tail helice
        this.scene.pushMatrix();
        this.scene.translate(-8,2,1);
        this.scene.scale(0.4,0.4,0.4);
        this.scene.rotate(Math.PI * 90 / 180, 1, 0,0);
        this.scene.rotate(Math.PI * this.heliceRotation /180, 0,1,0); //helice rotation when the engine is on
        this.helice.display();
        this.scene.popMatrix();

        //cockpit window
        this.scene.pushMatrix();
        this.scene.translate(3,1.5,0);
        this.scene.rotate(Math.PI * 60 / 180, 0, 0,1);
        this.scene.scale(0.5,1,1.5);
        this.silver.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
        //bucket
        this.scene.pushMatrix();
        this.scene.translate(0,-9 * this.bucketPercentage,0); //its final position depends on the percentage that determines how much it is outside of ther heli
        this.scene.translate(0,1,0); //the bucket starts hidden inside the heli
        this.bucket.display();
        this.scene.popMatrix();

        //bucket cable
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI * (-90) / 180, 1, 0, 0);
        this.scene.scale(0.1,0.1,7.3 * this.bucketPercentage);//its final position depends on the percentage that determines how much it is outside of ther heli (in this case its lenght)
        this.cylinder.display();
        this.scene.popMatrix();

        //water representation inside bucket
        if(this.hasWater){
            this.scene.pushMatrix();
            this.scene.translate(0,-8.5,0);
            this.scene.rotate(Math.PI * (-90) / 180, 1, 0, 0);
            this.waterColor.apply();
            this.scene.scale(0.95,1,0.95);
            this.circle.display();
            this.scene.popMatrix();
        }

        

    }
}