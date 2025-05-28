import { CGFobject, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyCircle } from "./MyCircle.js";

export class MyLake extends CGFobject {
    constructor(scene, position, radius)
    {
        super(scene);
        this.scene = scene;
        this.radius = radius;
        this.position = position;
        this.init();
    }

    init(){
        this.waterTexture = new CGFtexture(this.scene, 'textures/lake.jpg');
        this.waterAppearance = new CGFappearance(this.scene);
        this.waterAppearance.setShininess(5.0);
        this.waterAppearance.setTexture(this.waterTexture);
        this.waterAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.waterTextureMap = new CGFtexture(this.scene, 'textures/waterMap.jpg');
        this.waterShader = new CGFshader(this.scene.gl, "shaders/water.vert","shaders/water.frag" );
        this.waterShader.setUniformsValues({uSampler2: 1 });
        this.circle = new MyCircle(this.scene, 90);
    }

    update(t){
        this.waterShader.setUniformsValues({timeFactor: t/ 100 % 1000000});
    }

    display(){
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.translate(0,0.01,0);
        this.scene.scale(this.radius, 1, this.radius);
        this.scene.rotate(Math.PI * (-90) / 180, 1,0,0);
        this.scene.setActiveShader(this.waterShader);
        this.waterTexture.bind(1);
        this.waterTextureMap.bind();
        this.circle.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}