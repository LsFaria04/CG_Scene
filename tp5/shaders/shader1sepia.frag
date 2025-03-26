#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

varying vec4 position;

void main() {
    vec4 color = vec4(0.0,0.0,0.0,0.0);
    if(position.y > 0.5){
            color = vec4(1,1,0, 1.0);
    }
        else{
            color =  vec4(0.6,0.6,0.9, 1.0);
    };
	

	vec4 colorSepia = color;
	colorSepia.r = color.r * 0.299 + color.g *0.587 + color.b * 0.114;
	colorSepia.g = color.r * 0.299 + color.g *0.587 + color.b * 0.114;
	colorSepia.b = color.r * 0.299 + color.g *0.587 + color.b * 0.114;

	gl_FragColor = colorSepia;
}