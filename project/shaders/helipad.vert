attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTexCoord;

uniform sampler2D textureH;
uniform sampler2D textureUP;
uniform sampler2D textureDOWN;
uniform float transitionFactor;

void main() {
    vTexCoord = aTextureCoord;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}