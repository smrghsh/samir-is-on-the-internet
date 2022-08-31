import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import staggeredLinesVertexShader from './shaders/staggeredLines/vertex.glsl'
import staggeredLinesFragmentShader from './shaders/staggeredLines/fragment.glsl'
import { Font, SubtractiveBlending } from 'three'
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
scene.background = backgroundColor

const depthQuantity = 24   
const heightQuantity = 24
const widthQuantity = 4

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
var materials = []
colors.forEach((c)=>{
    materials.push(new THREE.MeshBasicMaterial({color: c, wireframe:false}))
})
console.log(materials)
var cubes = []


for(var d = 0; d < depthQuantity; d++){
    for(var h = 0; h < heightQuantity; h++){
        for(var w = 0; w < widthQuantity; w++){
            // let m = materials[(Math.floor(Math.random() * materials.length))]

            let m = new THREE.ShaderMaterial({
                vertexShader: panelVertexShader,
                fragmentShader: panelFragmentShader,
                uniforms: {
                    uTime: {value: 0.0},
                    uD: {value: d},
                    uH: {value: h},
                    uW: {value: w},
                    uDepthQuantity: {value: depthQuantity},
                    uHeightQuantity: {value: heightQuantity},
                    uWidthQuantity: {value: widthQuantity},
                    color1: {value: color1},
                    color2: {value: color2},
                    color3: {value: color3},
                    color4: {value: color4}

                },
                transparent: true
            
            })
            
            let cube = new THREE.Mesh(cubeGeometry,m);
            
            cubes.push(cube)
            scene.add(cube)
            cube.position.x = w/2;
            cube.position.y = h;
            cube.position.z = d;
        }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = Math.random() > 0.5 && sizes.width > 500 ? new THREE.Points( geometry, material ): new THREE.Line( geometry, material );
    line.rotateZ(i*.5/qtyLines)
    scene.add( line );
}
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)

var trackPosition = -8;
camera.position.set(trackPosition,heightQuantity/2,depthQuantity/2)
camera.lookAt(trackPosition+1,heightQuantity/2,depthQuantity/2)
scene.add(camera)
/*
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// Window resizing
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{   
    const elapsedTime = clock.getElapsedTime()
    material.uniforms.uTime.value = elapsedTime;
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

