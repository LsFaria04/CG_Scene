#ifdef GL_ES
precision highp float;
#endif


uniform sampler2D textureH;
uniform sampler2D textureUP;
uniform sampler2D textureDOWN;
uniform float transitionFactor;
uniform int isLanding;
varying vec2 vTexCoord;

void main() {
    vec4 texH = texture2D(textureH, vTexCoord);
    vec4 texUP = texture2D(textureUP, vTexCoord);
    vec4 texDOWN = texture2D(textureDOWN, vTexCoord);

    // Mix textures based in the transiction factor
    vec4 finalColor;
    if(isLanding == 1){
        finalColor = mix(texH, texDOWN, transitionFactor);
    }
    else{
        finalColor = mix(texH, texUP, transitionFactor);
    }

    gl_FragColor = finalColor;
}