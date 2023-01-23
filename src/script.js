import './skeleton.css'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import panelVertexShader from './shaders/panel/vertex.glsl'
import panelFragmentShader from './shaders/panel/fragment.glsl'
import { Font, SubtractiveBlending } from 'three'
//Palette
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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)

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
{  
    let e = clock.getElapsedTime() 
    


    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()

