#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float timeFactor2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord + vec2(timeFactor2 * 0.1,timeFactor2 * 0.1));

	gl_FragColor = color;
}