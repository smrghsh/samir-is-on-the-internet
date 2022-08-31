uniform float uTime;

varying float vPigmentX;
varying float vPigmentY;
varying vec3 vModifiedPosition;
varying float vBump;
float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

void main() {
    vec3 modifiedPosition = vec3(position);
    float bump = noise( 0.5 * position.z);
    modifiedPosition.y += bump + 2.0* sin((0.2 * position.x + uTime + sin(position.z/9.0) + noise(position.z)));
    
    vPigmentX = noise(position.z/10.0);
    vPigmentY = modifiedPosition.y - bump;
    vModifiedPosition = modifiedPosition;
    vBump = bump;
    
    vec4 modelPosition = modelMatrix * vec4(modifiedPosition, 1.0);
  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_PointSize = bump + vPigmentY + 1.0;
    gl_Position = projectedPosition;
}
