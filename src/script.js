import './skeleton.css'
import './style.css'
import * as THREE from 'three'
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import modMeshLineVertexShader from './shaders/modMeshLine/vertex.glsl'
import modMeshLineFragmentShader from './shaders/modMeshLine/fragment.glsl'
import { Font, SubtractiveBlending } from 'three'




//Palette
// const backgroundColor = new THREE.Color("black")
const backgroundColor = new THREE.Color("beige")






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

/**
 * AxesHelper
 */
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 120)
camera.position.set(0,0,4)
camera.lookAt(0,0,0)
const controls = new OrbitControls( camera, canvas );

scene.add(camera)


/** weave */
const amplitude = 1.0
const lineLength = 8
const points = [];
const size = [];
for (let i = -lineLength; i < lineLength; i+=0.01) {
    
    points.push( new THREE.Vector3( 0, 0, i) );
}
const geometry = new MeshLineGeometry()
geometry.setPoints(points,  (p) =>Math.sin(p) / 5)
const material = new MeshLineMaterial({
    side: THREE.DoubleSide,
    color: new THREE.Color(0.8,.1,0.3)
})
//https://stackoverflow.com/questions/59548828/how-to-give-vertex-shader-to-a-geometry-without-changing-the-material-in-threejs
material.onBeforeCompile = function(info) {
    console.log(info.fragmentShader)
    info.vertexShader = modMeshLineVertexShader
    info.fragmentShader = modMeshLineFragmentShader
    info.uniforms.uTime = { value: 0.0 };
    info.uniforms.offset = { value: 0.0 };
    info.uniforms.speed = { value: 1.0 };
    info.uniforms.amplitude = { value: 1.0 };
    console.log(info.uniforms)
    // change info.vertexShader, info.fragmentShader, and/or info.uniforms here
    // console.log(info.vertexShader)
  };


for (var i = 0; i < 2*Math.PI; i +=  2*Math.PI/40 ){

    let mesh = new THREE.Mesh(geometry,material)
    mesh.rotation.y += Math.PI/2
    mesh.rotation.z = i
    mesh.position.y += Math.random() * 0.1
    mesh.position.z += Math.random() * 0.1
    mesh.position.x += Math.random() * 0.1
    scene.add(mesh)
    
}
// const mesh = new THREE.Mesh(geometry,material)
// scene.add(mesh)
// mesh.rotation.y += Math.PI/2





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
{  
    let e = clock.getElapsedTime() 
    
    
    if( material.uniforms.uTime ){
        material.uniforms.uTime.value = e
    }
    

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()

