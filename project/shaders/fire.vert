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
    vec4 position = vec4(aVertexPosition, 1.0);
    if(position.y > 0.0){
        position.zx = position.xz + timeFactor;
    }
    
	gl_Position = uPMatrix * uMVMatrix * position;

	
}

