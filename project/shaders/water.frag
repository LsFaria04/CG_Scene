#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec2 animatedUV = vTextureCoord;
	vec4 color = texture2D(uSampler2, animatedUV);
	vec4 color2 = texture2D(uSampler, animatedUV);
	vec4 finalColor = mix(color, color2, 0.1);
	gl_FragColor = finalColor;
}