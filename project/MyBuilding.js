import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyWindow } from "./MyWindow.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyCircle } from "./MyCircle.js";

export class MyBuilding extends CGFobject {
    constructor(scene, totalWidth, floors, windowsPerFloor, windowTexture, buildingColor) {
        super(scene);
        this.totalWidth = totalWidth;
        this.floors = floors;
        this.windowsPerFloor = windowsPerFloor;

        this.floorHeight = 2.0;

        this.centralWidth = this.totalWidth / 2.5;
        this.sideWidth = this.centralWidth;
        this.centralDepth = 15;
        this.sideDepth = 12;
        this.sideFloors = Math.max(0, this.floors - 1);

        this.window = new MyWindow(scene, windowTexture);
        this.cube = new MyUnitCubeQuad(scene);
        this.circle = new MyCircle(scene, 32);

        // Building appearance
        this.buildingAppearance = new CGFappearance(scene);
        this.buildingAppearance.setAmbient(...buildingColor, 1.0);
        this.buildingAppearance.setDiffuse(...buildingColor, 1.0);
        this.buildingAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.buildingAppearance.setShininess(5.0);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0); // Rotate -90° around X-axis

        const wall = () => {
            this.buildingAppearance.apply();
            this.cube.display();
        };

        const windowHeight = this.floorHeight * 0.6;
        const windowWidth = windowHeight;

        // --- Central module ---
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.floorHeight * this.floors / 2);
        this.scene.scale(this.centralWidth, this.centralDepth, this.floorHeight * this.floors);
        wall();
        this.scene.popMatrix();

        // --- Side modules (left and right) ---
        if (this.sideFloors > 0) {
            // Left
            this.scene.pushMatrix();
            let leftX = -(this.centralWidth / 2 + this.sideWidth / 2);
            this.scene.translate(leftX, 0, this.floorHeight * (this.floors - 1) / 2);
            this.scene.scale(this.sideWidth, this.sideDepth, this.floorHeight * this.sideFloors);
            wall();
            this.scene.popMatrix();

            // Right
            this.scene.pushMatrix();
            let rightX = this.centralWidth / 2 + this.sideWidth / 2;
            this.scene.translate(rightX, 0, this.floorHeight * (this.floors - 1) / 2);
            this.scene.scale(this.sideWidth, this.sideDepth, this.floorHeight * this.sideFloors);
            wall();
            this.scene.popMatrix();
        }

        // --- Windows on central (floors 2..N) ---
        for (let f = 2; f <= this.floors; f++) {
            let floorBaseZ = (f - 1) * this.floorHeight;
            let windowBottomZ = floorBaseZ + 0.5 * (this.floorHeight - windowHeight);

            for (let i = 1; i <= this.windowsPerFloor; i++) {
                let xPos = -this.centralWidth / 2 + i * (this.centralWidth / (this.windowsPerFloor + 1));
                let yPos = -this.centralDepth / 2 - 0.01;

                this.scene.pushMatrix();
                this.scene.translate(xPos, yPos, windowBottomZ);
                this.scene.scale(windowWidth, windowHeight, 1.0);
                this.window.display();
                this.scene.popMatrix();
            }
        }

        // --- Windows on side modules ---
        for (let f = 1; f <= this.sideFloors; f++) {
            let floorBaseZ = (f - 1) * this.floorHeight;
            let windowBottomZ = floorBaseZ + 0.5 * (this.floorHeight - windowHeight);

            for (let i = 1; i <= this.windowsPerFloor; i++) {
                let localX = -this.sideWidth / 2 + i * (this.sideWidth / (this.windowsPerFloor + 1));
                let yPos = -this.sideDepth / 2 - 0.01;

                // Left
                this.scene.pushMatrix();
                let xPosL = -(this.centralWidth / 2 + this.sideWidth / 2) + localX;
                this.scene.translate(xPosL, yPos, windowBottomZ);
                this.scene.scale(windowWidth, windowHeight, 1.0);
                this.window.display();
                this.scene.popMatrix();

                // Right
                this.scene.pushMatrix();
                let xPosR = (this.centralWidth / 2 + this.sideWidth / 2) + localX;
                this.scene.translate(xPosR, yPos, windowBottomZ);
                this.scene.scale(windowWidth, windowHeight, 1.0);
                this.window.display();
                this.scene.popMatrix();
            }
        }

        // --- Door on central ground floor ---
        this.scene.pushMatrix();
        let doorY = -this.centralDepth / 2 - 0.01;
        this.scene.translate(0, doorY, 0);
        this.scene.scale(1.0, 1.5, 1.0);
        this.window.display();
        this.scene.popMatrix();

        // --- Sign above door ---
        this.scene.pushMatrix();
        this.scene.translate(0, -this.centralDepth / 2 - 0.01, 1.6);
        this.scene.scale(1.0, 0.2, 1.0);
        this.window.display();
        this.scene.popMatrix();

        // --- Helipad on roof ---
        let roofZ = this.floors * this.floorHeight;
        this.scene.pushMatrix();
        this.scene.translate(0, 0, roofZ + 0.01);
        this.circle.display();
        this.scene.popMatrix();

        this.scene.popMatrix(); // pop global rotation
    }
}
