import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyForest } from "./MyForest.js";
import { HeliStates, MyHeli } from "./MyHeli.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyBuilding } from "./MyBuilding.js";
import { MyLake } from "./MyLake.js";
import { MyFire } from "./MyFire.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0, 0, 0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);

    this.setUpdatePeriod(50);

    //textures
    this.panoramaTexture = new CGFtexture(this, 'textures/panorama2.jpg');
    this.grassTexture = new CGFtexture(this, 'textures/grass.jpg');
    this.leavesTexture = new CGFtexture(this, 'textures/leaves2.jpg');
    this.treeTexture = new CGFtexture(this, 'textures/tree.jpg');
    this.windowTexture = new CGFtexture(this, 'textures/window1.png')

    //shaders
    this.helipadShader = new CGFshader(this.gl, "shaders/helipad.vert", "shaders/helipad.frag");
    this.heliLightsShader = new CGFshader(this.gl, "shaders/heliLights.vert", "shaders/heliLights.frag"); //not used


    //Initialize scene objects
    this.plane = new MyPlane(this, 64, 0, 64, 0, 64);
    this.sphere = new MySphere(this, 100, 100, false);
    this.panorama = new MyPanorama(this, this.panoramaTexture, [10,0,10]);

    this.buildingFloors = 6;
    this.building = new MyBuilding(
      this,
      50, // total width
      this.buildingFloors,
      2,  // windows per floor
      this.windowTexture,
      [0.9, 0.9, 0.9, 1], // light gray color
      this.helipadShader
    );
    this.forest = new MyForest(this, 5, 5, [-50,0,0], 8, this.treeTexture, this.leavesTexture);
    this.forest2 = new MyForest(this, 5, 5, [60,0,0], 8, this.treeTexture, this.leavesTexture);
    this.forest3 = new MyForest(this, 5, 10, [0,0,-30], 8, this.treeTexture, this.leavesTexture);
    this.heli = new MyHeli(this, [0,4 * this.buildingFloors + 4,0], 0, [0,0,0]);
    //auxiliary values to help calculate if the heli is above the lake
    this.lakeposition = [-30,0,40];
    this.lakeradius = 15;
    this.lake = new MyLake(this, this.lakeposition, this.lakeradius);
    //auxiliary values to help calculate if the heli is above the fire
    this.firePosition = [-50,0,0];
    this.fireWidth = 5;
    this.fireHeight = 5;
    this.fire = new MyFire(this, this.fireWidth, this.fireHeight, this.firePosition);

    //grass matrial that is aplied to the plane
    this.material = new CGFappearance(this);
    this.material.setAmbient(1, 1, 1, 1);
    this.material.setDiffuse(1, 1, 1, 1);
    this.material.setSpecular(1, 1, 1, 1);
    this.material.setShininess(10.0);
    this.material.setTexture(this.grassTexture);
    this.material.setTextureWrap('REPEAT', 'REPEAT');

    //aux variable to help coordinate the animations
    this.initTime = Date.now();

    this.speedFactor = 1;
    this.transitionFactor = 0; //for the mix between textures in the helipad
    this.emissiveFactor = 0;

  }
  initLights() {
    this.lights[0].setPosition(200, 200, 200, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.7,
      0.1,
      1000,
      vec3.fromValues(0, 60, 110),
      vec3.fromValues(0, 0, 0)
    );
  }
  checkKeys() {
    //gets the keys pressed
    var text = "";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += "W";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += "S";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += "D";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += "A";
      keysPressed = true;
    }
 
    if (this.gui.isKeyPressed("KeyP")) {
      text += "P";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += "R";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyL")) {
      text += "L";
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyO")) {
      text += "O";
      keysPressed = true;
    }


    return text;
  }

  update(t) {
    //updates all the important object parameters in the scene

    const keysPressed = this.checkKeys();
    let aceleration = 0;
    let rotation = 0;

    //will use scale factor in the future
    if(this.heli.state === HeliStates.CRUISING || this.heli.state === HeliStates.RELEASING_WATER){
      if(keysPressed.includes('W')){
        aceleration += 2 * this.speedFactor; 
      }
      if(keysPressed.includes('S')){
        aceleration -= 2 * this.speedFactor; 
      }
      if(keysPressed.includes('A')){
        rotation += 5 * this.speedFactor;
      }
      if(keysPressed.includes('D')){
        rotation -= 5 * this.speedFactor;
      }
    }

    //special keys. These keys start special heli states
    if(keysPressed.includes('P') && (this.heli.state === HeliStates.REST || this.heli.state === HeliStates.ON_LAKE)){
      if(this.heli.state === HeliStates.REST){
        this.heli.updateState(HeliStates.RISING);
      }
      else{
        this.heli.updateState(HeliStates.RISING_LAKE);
      }

      this.heli.updateVelocityVect([0,1,0]);
    }
    if(keysPressed.includes('L') && (this.heli.state === HeliStates.CRUISING)){
      aceleration = 0;
      //check if the heli is above the lake
      const heliPosition = this.heli.position
      const distToLakeCenter = Math.sqrt(Math.pow(this.lakeposition[0]  - heliPosition[0], 2) + Math.pow(this.lakeposition[2]  - heliPosition[2], 2));

      if(distToLakeCenter < this.lakeradius && this.heli.velocityVec.join() == "0,0,0"){
        this.heli.updateState(HeliStates.DESCENDING_LAKE);
      }
      else{
        //is not above the lake so the heli returns to the heliport
        this.heli.updateState(HeliStates.RETURNING_HELI);
        this.heli.redirectToHeli();
      }
    }
    if(keysPressed.includes('R')){
      this.heli.reset();
    }
    if(keysPressed.includes('O') && (this.heli.state === HeliStates.CRUISING) && (this.heli.hasWater)){
      if(((this.firePosition[0] - this.fireWidth * 5) < this.heli.position[0])  && ((this.firePosition[0] + this.fireWidth * 5) > this.heli.position[0]) 
      && ((this.firePosition[1] - this.fireHeight * 5) < this.heli.position[2])  && ((this.firePosition[1] + this.fireHeight * 5) > this.heli.position[2])){
      this.heli.updateState(HeliStates.RELEASING_WATER);
      this.heli.releaseWater();
      }
    }

    //block the aceleration when the heli is in a special state
    if(this.heli.state === HeliStates.RISING || this.heli.state === HeliStates.RISING_LAKE
      || this.heli.state === HeliStates.RETURNING_HELI 
      || this.heli.state === HeliStates.DESCENDING_HELI){

      aceleration = 1 * this.speedFactor;
    }
    else if(this.heli.state === HeliStates.DESCENDING_LAKE){
      aceleration = 1.5 * this.speedFactor;
    }

    //set values for the helipad shader
    if (this.heli.state === HeliStates.RISING) {
        this.helipadShader.setUniformsValues({isLanding: 0});
        this.transitionFactor = Math.sin(t / 200 % 200); // smooth oscilation
        this.emissiveFactor = 3 * Math.sin(t / 200 % 200);
    } else if (this.heli.state === HeliStates.DESCENDING_HELI) {
      this.helipadShader.setUniformsValues({isLanding: 1});
        this.transitionFactor = Math.sin(t / 200 % 200); // changes to DOWN
        this.emissiveFactor = 3 * Math.sin(t / 200 % 200);
    } else {
        this.transitionFactor = 0.0; // default state
        this.emissiveFactor = 0.0;
    }

    this.helipadShader.setUniformsValues({transitionFactor: this.transitionFactor});
    this.building.updateLightMaterial(this.emissiveFactor);
    this.lake.update(t);

    const deltaT = t - this.initTime;
    this.heli.turn(rotation);
    this.heli.acelerate(aceleration);
    this.heli.update(deltaT);
    this.fire.update(t, deltaT);

    //check colision with the fire after all the updates
     if(this.heli.state === HeliStates.RELEASING_WATER){
      this.fire.checkCollisionWithWater(this.heli.waterDrops);
    }

    this.initTime = t;
  }

  setDefaultAppearance() {
    this.setAmbient(0.5, 0.5, 0.5, 1.0);
    this.setDiffuse(0.5, 0.5, 0.5, 1.0);
    this.setSpecular(0.5, 0.5, 0.5, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.lights[0].update();

    this.setDefaultAppearance();

    this.panorama.setPosition(this.camera.position);
    this.panorama.display(); 
    this.pushMatrix();
    this.scale(400,1, 400);
    this.material.apply();
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.plane.display();
    this.popMatrix();
    
    this.forest.display();
    this.forest2.display();
    this.forest3.display();

    this.pushMatrix();
    this.heli.display();
    this.popMatrix();

    this.pushMatrix();
    this.building.display();
    this.popMatrix();

    this.pushMatrix();
    this.lake.display();
    this.popMatrix();

    this.pushMatrix();
    this.fire.display();
    this.popMatrix();
  }
}
