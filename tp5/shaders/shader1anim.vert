attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform float normScale;
varying vec4 position;

void main() {
	vec3 offset=vec3(1.0,0.0,0.0);

	offset = offset*normScale*0.1*sin(timeFactor);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
    position = gl_Position;
}
