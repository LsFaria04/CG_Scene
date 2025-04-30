import {CGFobject} from '../lib/CGF.js';
import { MyWindow } from "./MyWindow.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyCircle} from "./MyCircle.js";

export class MyBuilding extends CGFobject {
    constructor(scene, floors, windowsPerFloor, totalWidth) {
      super(scene);
      this.floors = floors;                   // number of floors in central module
      this.windowsPerFloor = windowsPerFloor; // windows per floor for both central and sides
      this.totalWidth = totalWidth;           // total width of building
      
      this.floorHeight = 2.0; // height of each floor (chosen unit)
      
      // Compute module dimensions:
      // centralWidth + 2*sideWidth = totalWidth, sideWidth = 0.75 * centralWidth
      this.centralWidth = this.totalWidth / 2.5;
      this.sideWidth    = this.centralWidth * 0.75;
      // Assume depth = width for simplicity
      this.centralDepth = this.centralWidth;
      this.sideDepth    = this.sideWidth;
      // Side modules have one less floor
      this.sideFloors = Math.max(0, this.floors - 1);
      
      // Create shapes to reuse
      this.window = new MyWindow(scene);        // placeholder window/door
      this.cube   = new MyUnitCubeQuad(scene); // unit cube for blocks
      this.circle = new MyCircle(scene, 32);   // heliport circle (32 segments)
    }
    
    display() {
      // --- Central module block ---
      this.scene.pushMatrix();
        // Center on origin, base at ground (z=0)
        // Scale to (width, height, depth)
        this.scene.translate(0, 0, 0);
        this.scene.scale(
          this.centralWidth,
          this.floorHeight * this.floors,
          this.centralDepth
        );
        this.cube.display();
      this.scene.popMatrix();
      
      // --- Left side module ---
      if (this.sideFloors > 0) {
        this.scene.pushMatrix();
          let leftX = -(this.centralWidth/2 + this.sideWidth/2);
          this.scene.translate(leftX, 0, 0);
          this.scene.scale(
            this.sideWidth,
            this.floorHeight * this.sideFloors,
            this.sideDepth
          );
          this.cube.display();
        this.scene.popMatrix();
      }
      
      // --- Right side module ---
      if (this.sideFloors > 0) {
        this.scene.pushMatrix();
          let rightX = (this.centralWidth/2 + this.sideWidth/2);
          this.scene.translate(rightX, 0, 0);
          this.scene.scale(
            this.sideWidth,
            this.floorHeight * this.sideFloors,
            this.sideDepth
          );
          this.cube.display();
        this.scene.popMatrix();
      }
      
      // --- Windows on central (floors 2..N) ---
      for (let f = 2; f <= this.floors; f++) {
        // Compute the bottom Z of this floor and center window vertically
        let floorBaseZ = (f - 1) * this.floorHeight;
        let windowBottomZ = floorBaseZ + 0.5 * (this.floorHeight - 1.0);
        for (let i = 1; i <= this.windowsPerFloor; i++) {
          this.scene.pushMatrix();
            // Evenly space along X
            let xPos = -this.centralWidth/2 
                     + i * (this.centralWidth / (this.windowsPerFloor + 1));
            // Front face at y = +centralDepth/2 (offset by 0.01 to avoid z-fighting)
            let yPos = this.centralDepth/2 + 0.01;
            this.scene.translate(xPos, yPos, windowBottomZ);
            // Scale window (e.g., width=0.5, height=1.0)
            this.scene.scale(0.5, 1.0, 1.0);
            this.window.display();
          this.scene.popMatrix();
        }
      }
      
      // --- Windows on side modules (floors 1..sideFloors) ---
      for (let f = 1; f <= this.sideFloors; f++) {
        let floorBaseZ = (f - 1) * this.floorHeight;
        let windowBottomZ = floorBaseZ + 0.5 * (this.floorHeight - 1.0);
        for (let i = 1; i <= this.windowsPerFloor; i++) {
          // Left side window
          this.scene.pushMatrix();
            let leftX = -(this.centralWidth/2 + this.sideWidth/2);
            let localX = -this.sideWidth/2 
                       + i * (this.sideWidth / (this.windowsPerFloor + 1));
            let xPosL = leftX + localX;
            let yPos = this.sideDepth/2 + 0.01;
            this.scene.translate(xPosL, yPos, windowBottomZ);
            this.scene.scale(0.5, 1.0, 1.0);
            this.window.display();
          this.scene.popMatrix();
          // Right side window
          this.scene.pushMatrix();
            let rightX = (this.centralWidth/2 + this.sideWidth/2);
            let xPosR = rightX + localX;
            this.scene.translate(xPosR, yPos, windowBottomZ);
            this.scene.scale(0.5, 1.0, 1.0);
            this.window.display();
          this.scene.popMatrix();
        }
      }
      
      // --- Door on central ground floor ---
      this.scene.pushMatrix();
        // Center at (0, front face). Bottom at z=0.
        let doorY = this.centralDepth/2 + 0.01;
        this.scene.translate(0, doorY, 0);
        // Scale to door size (width=1, height=1.5)
        this.scene.scale(1.0, 1.5, 1.0);
        this.window.display();
      this.scene.popMatrix();
      
      // --- Sign above door ---
      this.scene.pushMatrix();
        // Place slightly above door (door height=1.5, add gap)
        this.scene.translate(0, this.centralDepth/2 + 0.01, 1.6);
        this.scene.scale(1.0, 0.2, 1.0);  // width=1, small height
        this.window.display();
      this.scene.popMatrix();
      // (Sign would display "BOMBEIROS" on the facade)
      
      // --- Helipad on roof ---
      let roofZ = this.floors * this.floorHeight;
      this.scene.pushMatrix();
        // Place circle on roof (XY-plane by default)
        this.scene.translate(0, 0, roofZ + 0.01);
        this.circle.display();
      this.scene.popMatrix();
      // TODO: Draw letter 'H' inside the circle (e.g. with thin rectangles)
    }
  }
