attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {
    vTextureCoord = aTextureCoord;

    //use a offset to create small waves in the water
    vec3 offset=vec3(0.0,0.0,1.0);
    offset = aVertexNormal * 0.8* texture2D(uSampler, vTextureCoord  + vec2(timeFactor * 0.001, timeFactor * 0.001)).b;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	
}

