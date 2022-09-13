import './skeleton.css'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import panelVertexShader from './shaders/panel/vertex.glsl'
import panelFragmentShader from './shaders/panel/fragment.glsl'
import { Font, SubtractiveBlending } from 'three'
//Palette
const backgroundColor = new THREE.Color(0x000000)
// const color1 = new THREE.Color(0xF3FEB0)
// const color2 = new THREE.Color(0xFEA443)
// const color3 = new THREE.Color(0x705E78)
// const color4 = new THREE.Color(0x812F33)
const color1 = new THREE.Color(0xD95F69)
const color2 = new THREE.Color(0x89C2D9)
const color3 = new THREE.Color(0x04D9C4)
const color4 = new THREE.Color(0x88E8F2)
const colors = [color1, color2, color3, color4]

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
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
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
/**
 * Sizes
 */
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
{   const jump = 69 
    const elapsedTime = clock.getElapsedTime() + jump
    
    // Update water
    cubes.forEach(
        (cube) =>{
            cube.material.uniforms.uTime.value = elapsedTime/10.0 + 15.0;
        }
    )
    console.log(elapsedTime)
    // Render
    // trackPosition+= 0.01

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()

