<script>
import * as THREE from "three";
import { Font, SubtractiveBlending } from "three";
import { MeshLineGeometry, MeshLineMaterial, raycast } from "meshline";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from 'dat.gui'
import modMeshLineVertexShader from "../assets/shaders/modMeshLine/vertex.glsl";
import modMeshLineFragmentShader from "../assets/shaders/modMeshLine/fragment.glsl";


export default {
  // unmount() {
  // leo says destroy it here
  // }
  mounted() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    /**
   * Sizes
   */
    // Window resizing
    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    window.addEventListener("darkMode", () => {
      scene.background = new THREE.Color("black");
    });
    window.addEventListener("lightMode", () => {
      scene.background = new THREE.Color("aliceblue");
    });


    //Palette
    const backgroundColor = new THREE.Color("AliceBlue");
    // const backgroundColor = new THREE.Color("black")
    // const backgroundColor = new THREE.Color("#D9B9AD");

    /**
     * Base
     */

    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();
    scene.background = backgroundColor;
    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      120
    );
    camera.position.set(-1.526809290138386, 2.933433136629435, 2.2502940751091676);
    camera.rotation.set(
      -0.9164283978958037,
      -0.3916373693287119,
      -0.46170863682209606
    );
    const controls = new OrbitControls(camera, canvas);

    scene.add(camera);

    // for debugging purposes
    window.camera = camera;
    /** weave */

    /**
     * Parameterization
     */

    //a
    const amplitude = 1.0;

    const lineLength = 8;
    const points = [];
    const size = [];
    for (let i = -lineLength; i < lineLength; i += 0.01) {
      points.push(new THREE.Vector3(0, 0, i));
    }
    const geometry = new MeshLineGeometry();
    geometry.setPoints(points, (p) => Math.sin(p) / 5);
    const material = new MeshLineMaterial({
      side: THREE.DoubleSide,
      color: new THREE.Color(0.8, 0.1, 0.3),
    });
    //https://stackoverflow.com/questions/59548828/how-to-give-vertex-shader-to-a-geometry-without-changing-the-material-in-threejs
    material.onBeforeCompile = function (info) {
      // console.log(info.fragmentShader)
      info.vertexShader = modMeshLineVertexShader;
      info.fragmentShader = modMeshLineFragmentShader;
      info.uniforms.uTime = { value: 0.0 };
      info.uniforms.offset = { value: 0.0 };
      info.uniforms.speed = { value: 1.0 };

      info.uniforms.amplitude = { value: 1.0 };
      info.uniforms.b = { value: 0.8 };
      info.uniforms.c = { value: 0.8 };
      info.uniforms.d = { value: 0.8 };
      info.uniforms.e = { value: 0.8 };
      info.uniforms.f = { value: 0.8 }; //offset
      // console.log(info.uniforms)
      // change info.vertexShader, info.fragmentShader, and/or info.uniforms here
      // console.log(info.vertexShader)
    };

    for (let i = 0; i < 2 * Math.PI; i += (2 * Math.PI) / 40) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y += Math.PI / 2;
      mesh.rotation.z = i;
      mesh.position.y += Math.random() * 0.1;
      mesh.position.z += Math.random() * 0.1;
      mesh.position.x += Math.random() * 0.1;
      // scene.add(mesh);
    }
    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


    /**
     * Animate
     */
    const clock = new THREE.Clock();
    const tick = () => {
      const e = clock.getElapsedTime() * 0.5;

      // if (material.uniforms.uTime) {
      //   material.uniforms.uTime.value = e;
      //   material.uniforms.uTime.value = 5;

      // }
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }
}


</script>



<template>
  <canvas class="webgl" />
</template>

<style>
canvas {
  width: 100vw;
  height: 100vh;
  /* background-color: ; */
  /* background-color: aqua; */
  position: fixed;
  outline: none;
  z-index: -1;
}
</style>