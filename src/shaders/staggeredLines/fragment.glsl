varying float vPigmentX;
varying float vPigmentY;
varying float vBump;
varying vec3 vModifiedPosition;


void main(){

    
    gl_FragColor = vec4(sin(vModifiedPosition.z),sin(vModifiedPosition.y),1.0,1.0);
}