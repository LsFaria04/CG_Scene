#ifdef GL_ES
precision highp float;
#endif

uniform vec3 baseColor; 
uniform float emissiveFactor; 
varying vec2 vTexCoord;

void main() {
    //emissive factor controls the intensity of the color
    vec3 emissiveColor = baseColor * emissiveFactor; 
    gl_FragColor = vec4(emissiveColor, 1.0);
}