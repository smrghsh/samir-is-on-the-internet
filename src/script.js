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
const material = new THREE.ShaderMaterial({
	vertexShader: staggeredLinesVertexShader,
    fragmentShader: staggeredLinesFragmentShader,
    uniforms: {
        uTime: {value: 0.0}
    },
    side: THREE.DoubleSide
});
var qtyLines = 15
var linesLength = 110
var quantityPoints = 100
for(let i = 0; i < qtyLines; i+=0.2 ){
    const points = [];
    for(let j = -1 * linesLength/2; j < linesLength/2; j+= (linesLength/quantityPoints)){
        points.push( new THREE.Vector3( j , 0, i) );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = Math.random() > 0.5 ? new THREE.Points( geometry, material ): new THREE.Line( geometry, material );
    line.rotateZ(i*.5/qtyLines)
    scene.add( line );
}
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 11, 100)
camera.position.z = -2 * qtyLines
camera.lookAt(0,0,-18)
camera.position.x = 0
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

