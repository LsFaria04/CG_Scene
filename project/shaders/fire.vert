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

    vec3 pos = aVertexPosition;

    // Only move vertices above the base
    if (pos.y > 0.0) {
        float wave = sin(pos.y * 4.0 + timeFactor  * 2.5 ) * 0.15;  // Adjust amplitude and frequency
        pos.zx += wave;
    }

    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);

	
}

