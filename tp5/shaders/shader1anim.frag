#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

varying vec4 position;

void main() {
	if(position.y > 0.5){
            gl_FragColor = vec4(1,1,0, 1.0);
    }
        else{
            gl_FragColor =  vec4(0.6,0.6,0.9, 1.0);
     };
}